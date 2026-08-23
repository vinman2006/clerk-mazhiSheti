# ArogyaChain — Auth + Clean Data Layer Build Prompt
### For: Next.js (TS) + Tailwind + MongoDB Atlas + Firebase Auth (already set up)

Paste this into Claude Code / Antigravity against the existing repo. It's ordered — do not skip ahead to medical records before auth + hashing is working and tested.

---

## Ground rules for this build (read first)

- **Firebase Auth is the identity provider for both login methods** — Google Sign-In and Email/Password both go through Firebase Auth (it supports both natively), not a second parallel auth system. MongoDB never stores a raw password.
- **MongoDB only ever stores clean, minimal data.** No Firebase tokens, no raw auth secrets, no duplicated auth state.
- **Two collections, hard separation, linked only by a hash — never by name/email:**
  - `persons` — identity/profile data + a `personHash`
  - `medicalRecords` — medical data + the *same* `personHash`, and nothing else identifying
- **The `personHash` is server-generated, never client-supplied.** Every API route resolves it from the verified Firebase session — a client can never pass a `personHash` in a request body and have it trusted.
- All simulated/seed data used for testing must be labeled `MOCK_DATA` in code comments and dev seed scripts — don't let mock records look real in any demo.

---

## PROMPT — paste this to your coding agent

```
We're extending an existing Next.js (TypeScript, App Router) + Tailwind +
MongoDB Atlas + Firebase Auth project called ArogyaChain. Firebase Auth is
already initialized in the project (client config exists). Build the
following in order, and don't move to the next step until the previous
one is working end-to-end.

============================================================
STEP 1 — Firebase Auth: Google + Email/Password, both working
============================================================
- In the existing Firebase client init, ensure both providers are enabled:
  GoogleAuthProvider and Email/Password.
- Build /app/(auth)/login/page.tsx and /app/(auth)/signup/page.tsx with:
  - "Continue with Google" button → signInWithPopup(auth, GoogleAuthProvider)
  - Email + password form → signup uses createUserWithEmailAndPassword,
    login uses signInWithEmailAndPassword
  - On success (both paths), get the Firebase ID token via
    currentUser.getIdToken(), and POST it to /api/auth/sync (built in
    Step 3) before redirecting to /dashboard.
- Add a client-side AuthContext (React context + onAuthStateChanged
  listener) so the rest of the app knows session state without prop
  drilling. Store nothing sensitive in localStorage — rely on Firebase's
  own persisted session.
- Add a simple middleware.ts (or client-side guard) that redirects
  unauthenticated users away from /dashboard and any /app/(protected)
  routes back to /login.

TEST BEFORE CONTINUING: both Google and email/password signup+login
work, land on /dashboard, and a Firebase user appears in the Firebase
console for both paths.

============================================================
STEP 2 — Firebase Admin SDK on the backend (server-side token verify)
============================================================
- Add firebase-admin, initialize it server-side using a service account
  (env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY — private key needs \n handling since it's
  multiline in an env var).
- Create lib/firebaseAdmin.ts exporting an initialized admin instance,
  singleton pattern (don't re-init on every hot reload in dev).
- Create lib/auth/verifyRequest.ts — a helper that:
  - reads the Firebase ID token from the Authorization: Bearer <token>
    header on incoming API requests
  - calls admin.auth().verifyIdToken(token)
  - returns the decoded token (contains uid, email) or throws a 401
  - THIS is the only place firebaseUid is ever established server-side.
    No API route should trust a uid or personHash passed in a request
    body.

TEST BEFORE CONTINUING: hit a throwaway /api/whoami route with and
without a valid bearer token, confirm 200 with correct uid / 401
without.

============================================================
STEP 3 — Mongo schema: persons collection + hash generation
============================================================
- Connect to MongoDB Atlas via a singleton lib/mongodb.ts (standard
  Next.js + Mongoose or native driver connection-caching pattern to
  survive hot reload / serverless cold starts — use whichever the repo
  already uses if a connection helper exists, otherwise Mongoose).
- Define the persons collection schema, Mongoose model in
  models/Person.ts:

  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    name: { type: String },
    role: { type: String, enum: ["patient", "provider"], default: "patient" },
    personHash: { type: String, required: true, unique: true, index: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }

  NOTE: this collection stays clean — no medical fields, no phone/address
  unless you explicitly need them for the identity/registration story.
  Anything medical goes in the separate collection in Step 4, always.

- Create lib/hash.ts:

  import crypto from "crypto";

  export function generatePersonHash(firebaseUid: string): string {
    const salt = process.env.PERSON_HASH_SALT;
    if (!salt) throw new Error("PERSON_HASH_SALT not set");
    return crypto
      .createHash("sha256")
      .update(firebaseUid + salt)
      .digest("hex");
  }

  Add PERSON_HASH_SALT to .env.local (long random string, never committed).
  This hash is deterministic per firebaseUid but not reversible to it
  without the salt — that's the point: it's a stable linking key that
  doesn't leak the Firebase identity if the medical collection is ever
  read on its own.

- Build /app/api/auth/sync/route.ts (POST):
  1. verifyRequest() to get { uid, email } from the bearer token
  2. look up persons by firebaseUid
  3. if not found: generate personHash via generatePersonHash(uid),
     create the person doc (email, name from decoded token if
     available, role defaults to "patient", personHash)
  4. if found: just touch updatedAt
  5. return the person doc MINUS firebaseUid and personHash — the
     client should never receive the raw hash either; every subsequent
     request re-derives it server-side from the verified token, per
     route, so the frontend never needs to carry it around at all.

TEST BEFORE CONTINUING: log in fresh (new Firebase user), confirm
exactly one persons document is created in Atlas with a populated
personHash, and logging in again doesn't create a duplicate.

============================================================
STEP 4 — Mongo schema: medicalRecords collection, linked only by hash
============================================================
- models/MedicalRecord.ts:

  {
    personHash: { type: String, required: true, index: true },
    condition: { type: String, required: true },
    diagnosis: { type: String },
    doctorName: { type: String },
    facility: { type: String },
    recordDate: { type: Date, required: true },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
  }

  HARD RULE: this schema must never include name, email, phone,
  firebaseUid, or anything else that identifies the person outside of
  personHash. If a future feature seems to need identity fields here,
  that's a sign it belongs in a join at query time against `persons`,
  not a denormalized field on this collection.

- lib/auth/resolvePersonHash.ts — helper used by every medical route:
  1. verifyRequest() → get uid
  2. look up persons by firebaseUid → get personHash
  3. return personHash (throw 404 if no person doc yet — means
     /api/auth/sync hasn't run for this user)
  This is the ONLY sanctioned way any route obtains a personHash to
  query medicalRecords with. Never accept personHash as a request
  param/body field from the client.

- /app/api/medical/records/route.ts:
  - GET: resolvePersonHash() → find medicalRecords by that hash,
    return list
  - POST: resolvePersonHash() → validate body (condition, recordDate
    required) → insert with that hash
- /app/api/medical/records/[id]/route.ts:
  - GET/PATCH/DELETE single record — resolvePersonHash() first, then
    ALSO verify the fetched record's personHash matches before
    returning/mutating it (don't just trust the :id — a user must not
    be able to fetch another user's record by guessing/enumerating
    Mongo ObjectIds).

TEST BEFORE CONTINUING: as User A, create two medical records; log in
as User B (second Google/email account), confirm GET /api/medical/records
returns an empty list for B and that B hitting
/api/medical/records/<A's record id> directly returns 403/404, not A's data.

============================================================
STEP 5 — Dashboard UI wiring
============================================================
- /app/dashboard/page.tsx: fetch and show the logged-in person's
  clean profile (name, email, role) via a GET /api/person/me route
  (same resolvePersonHash-style auth, returns the persons doc minus
  personHash/firebaseUid).
- /app/dashboard/medical/page.tsx: list + add medical records via the
  Step 4 routes. Simple Tailwind form + list, no need for anything
  fancy yet — functionality first.
- Add a visible (dev-only) badge/banner on any screen using seeded or
  mock data reading "MOCK DATA" so it's unambiguous in a demo recording
  which parts are real Firebase/Mongo state vs seeded test data.

TEST BEFORE CONTINUING: full loop — sign up new user (either method),
land on dashboard, see own clean profile, add a medical record, see it
listed, log out, log back in, data persists and is still scoped only
to that user.

============================================================
STEP 6 — Guardrails / review pass
============================================================
Once Steps 1–5 pass their tests, do a review pass and confirm:
- No API route anywhere accepts personHash, firebaseUid, or role as a
  trusted client input for authorization decisions — all derived
  server-side from the verified Firebase token.
- persons and medicalRecords are never queried with a JOIN-like
  populate that pulls email/name into a medical response payload.
- .env.local has PERSON_HASH_SALT and the Firebase Admin service
  account vars, and .env.local is gitignored (confirm it's not
  already committed anywhere in git history).
- Every Mongo write path validates input server-side (don't rely on
  client-side form validation alone) — use zod or a simple manual
  check on each route.

Report back what's built, what's tested, and flag anything from this
spec that had to be adapted to fit how the existing repo is already
structured, rather than silently deviating from it.
```

---

## Why the hash-linking design, quickly

This is the same identity/data-separation idea as the Midnight architecture doc, just implemented at the plain-Mongo layer instead of on-chain: `persons` and `medicalRecords` are two collections that *can't* be read together into a full profile unless you're the authenticated owner, because the only join key (`personHash`) is never sent to or trusted from the client — it's re-derived server-side from the Firebase session on every request. If `medicalRecords` ever leaked or got queried directly, there's no name, email, or phone number sitting in it to tie back to a person.

When you're ready to bring the Midnight side back in, `personHash` is also the natural value to commit into the `registerIdentity` circuit from the architecture doc — same linking key, two layers.

## Next features after this (once Steps 1–6 are solid)

1. **Role-based views** — provider dashboard vs patient dashboard, gated by the `role` field on `persons`.
2. **Consent/sharing** — a relying party requesting read access to a specific patient's records, scoped and expiring (the Mongo-side precursor to the CGT concept from the architecture doc).
3. **Audit log collection** — who accessed which `personHash`'s records and when, itself keyed by hash, not name.
4. **Midnight integration** — once the Mongo layer above is stable, wire `personHash` into the on-chain `registerIdentity`/`issueConsent` circuits so the ZK layer sits on top of, not instead of, this clean data layer.

Want me to write the Step-3-style prompt for feature 2 (consent/sharing) next, or do you want to get 1–6 working first and come back?
