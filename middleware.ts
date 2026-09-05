import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const defaultPublishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_cmVzdGVkLXN0dXJnZW9uLTg3MjQuY2xlcmsuYWNjb3VudHMuZGV2JA";

const defaultSecretKey =
  process.env.CLERK_SECRET_KEY ||
  "sk_test_dNAkObRFsyX7Q2PRRjeSpChBnabhUUktCTy9HCzkKI";

let clerkHandler: any = null;

try {
  clerkHandler = clerkMiddleware(
    () => {
      return NextResponse.next();
    },
    {
      publishableKey: defaultPublishableKey,
      secretKey: defaultSecretKey,
    }
  );
} catch (initErr) {
  console.error("[Middleware] Failed to initialize Clerk middleware:", initErr);
}

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  try {
    if (clerkHandler) {
      const res = await clerkHandler(req, event);
      if (res) return res;
    }
  } catch (err) {
    console.error("[Middleware] Clerk middleware runtime exception, bypassing safely:", err);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
