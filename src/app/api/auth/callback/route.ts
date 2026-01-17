import { handleAuth } from '@workos-inc/authkit-nextjs';

// Redirect the user to `/` after successful sign in
// The redirect can be customized: `handleAuth({ returnPathname: '/foo' })`
// The redirect can be customized: `handleAuth({ returnPathname: '/foo' })
console.log('REDIRECT:', process.env.WORKOS_REDIRECT_URI);
export const GET = handleAuth();
