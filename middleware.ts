export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/log-food/:path*',
    '/recommendations/:path*',
    '/settings/:path*',
    '/api/analyze-intake/:path*',
    '/api/suggest-improvements/:path*',
    '/api/log-food/:path*',
  ],
};
