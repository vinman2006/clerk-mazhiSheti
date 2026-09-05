import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const hasClerkKeys = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
);

// Protected route prefixes requiring authentication
const PROTECTED_PORTAL_ROUTES: Record<string, string> = {
  '/farmer': '/auth/farmer',
  '/bank': '/auth/bank',
  '/provider': '/auth/provider',
  '/expert': '/auth/expert',
  '/admin': '/auth/admin',
};

// Public API routes exempt from authentication
const PUBLIC_API_PREFIXES = [
  '/api/health',
  '/api/webhooks',
  '/api/demo',
];

export default hasClerkKeys
  ? clerkMiddleware(async (auth, req) => {
      const { userId } = await auth();
      const pathname = req.nextUrl.pathname;

      // Check if accessing a protected role portal
      for (const [prefix, redirectAuthPath] of Object.entries(PROTECTED_PORTAL_ROUTES)) {
        if (pathname.startsWith(prefix)) {
          if (!userId) {
            const redirectUrl = new URL(redirectAuthPath, req.url);
            redirectUrl.searchParams.set('redirect_url', req.url);
            return NextResponse.redirect(redirectUrl);
          }
        }
      }

      // Check if accessing a protected API route
      if (pathname.startsWith('/api')) {
        const isPublicApi = PUBLIC_API_PREFIXES.some((prefix) => pathname.startsWith(prefix));
        if (!isPublicApi && !userId) {
          return NextResponse.json(
            { error: 'UNAUTHORIZED: Authentication required to access this endpoint.' },
            { status: 401 }
          );
        }
      }

      return NextResponse.next();
    })
  : () => NextResponse.next();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
