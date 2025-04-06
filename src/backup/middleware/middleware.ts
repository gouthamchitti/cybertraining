import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Middleware to protect routes and handle security
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // Skip files with extensions (images, etc.)
  ) {
    return res;
  }

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove: (name, options) => {
          res.cookies.set({
            name,
            value: '',
            ...options,
            maxAge: 0,
          });
        },
      },
    }
  );

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/login',
    '/about',
    '/contact',
    '/demo',
    '/privacy',
    '/terms',
    '/cookie-policy',
  ];

  // If it's a public route, allow access
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return res;
  }

  // For protected routes, check authentication
  try {
    const { data: { session } } = await supabase.auth.getSession();

    // If no session, redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // For admin routes, check if user has admin role
    if (pathname.startsWith('/admin')) {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        // If not admin/trainer, redirect to student dashboard learning paths
        if (!profile || (profile.role !== 'admin' && profile.role !== 'trainer')) {
          return NextResponse.redirect(new URL('/dashboard/learning-paths', req.url));
        }
      } catch (error) {
        // If error checking role, redirect to dashboard learning paths to be safe
        return NextResponse.redirect(new URL('/dashboard/learning-paths', req.url));
      }
    }

    // For student dashboard, check if user is admin/trainer
    if (pathname === '/dashboard') {
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        // If admin/trainer, redirect to admin dashboard
        if (profile && (profile.role === 'admin' || profile.role === 'trainer')) {
          return NextResponse.redirect(new URL('/admin/dashboard', req.url));
        } else {
          // If student, redirect to learning paths
          return NextResponse.redirect(new URL('/dashboard/learning-paths', req.url));
        }
      } catch (error) {
        // If error checking role, redirect to learning paths
        return NextResponse.redirect(new URL('/dashboard/learning-paths', req.url));
      }
    }

    // User is authenticated, allow access
    return res;
  } catch (error) {
    // If there's an error with auth, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

// Configure which routes use this middleware
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/|images/).*)'],
};
