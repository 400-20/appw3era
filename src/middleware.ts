import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const protectedPaths = ['/tool'];
    const authPaths = ['/signin/', '/signup/'];
    const token = request.cookies.get('login_access_token_appw3');

    // Redirect root path `/` to `/tool`
    if (path === '/') {
        return NextResponse.redirect(new URL('/tool', request.nextUrl));
    }

    // Redirect unauthenticated users from protected paths
    if (protectedPaths.includes(path) && !token) {
        return NextResponse.redirect(new URL('/signin/', request.nextUrl));
    }

    // Redirect authenticated users away from auth paths
    if (authPaths.includes(path) && token) {
        return NextResponse.redirect(new URL('/tool/', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/', 
        '/signin/',
        '/signup/',
        '/tool', 
    ],
};
