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

      // 1. If user is ALREADY authenticated and visits an auth gateway, redirect immediately to role dashboard
      if (userId && pathname.startsWith('/auth/')) {
        const parts = pathname.split('/').filter(Boolean);
        const role = parts[1];
        const validRoles: Record<string, string> = {
          farmer: '/farmer/dashboard',
          bank: '/bank/dashboard',
          provider: '/provider/dashboard',
          expert: '/expert/dashboard',
          admin: '/admin/dashboard',
        };

        if (role && validRoles[role] && !req.nextUrl.searchParams.has('switch')) {
          const rawRedirect = req.nextUrl.searchParams.get('redirect_url');
          if (
            rawRedirect &&
            !rawRedirect.includes('/auth') &&
            !rawRedirect.includes('/sign-in') &&
            !rawRedirect.includes('/sign-up')
          ) {
            try {
              const parsed = new URL(rawRedirect, req.url);
              return NextResponse.redirect(parsed);
            } catch {
              // fallback
            }
          }
          return NextResponse.redirect(new URL(validRoles[role], req.url));
        }
      }

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
