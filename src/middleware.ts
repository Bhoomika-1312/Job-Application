import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

// In middleware auth mode, each page is protected by default.
// Exceptions are configured via the `unauthenticatedPaths` option.
export default authkitMiddleware({
  redirectUri: process.env.WORKOS_REDIRECT_URI,
  middlewareAuth: {
    enabled: true,
    unauthenticatedPaths: ['/'],
  },
});

export const config = { matcher: ['/', '/new-listing' , '/new-company','/new-listing/:orgId*','/jobs/:orgId*','/jobs/edit/:jobId*','/show/:jobId*'] };