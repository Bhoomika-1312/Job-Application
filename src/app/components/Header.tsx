
import Link from "next/link"
import { signOut, getSignInUrl, withAuth } from '@workos-inc/authkit-nextjs';

export default async function Header() {
   const { user } = await withAuth();
   const signInUrl = await getSignInUrl();
    return (
        <header>
          <div className="container flex items-center justify-between mx-auto my-4">
            <Link href = {"/"} className="font-bold text-2xl mx-10"> Job board </Link>
            <nav className="flex gap-2  *:py-2 *:px-4 *:rounded-md">
              {!user && 
              <Link href = {signInUrl} className="bg-gray-200"> Login </Link>}
              {user && (
              <form action={async () => {
                'use server';
                await signOut();
              }}>
                <button type="submit" className="rounded-md bg-gray-200 py-1 px-2 sm:py-2 sm:px-4">
                  Logout
                </button>
              </form>
              )}  
              <Link href = {"/new-listing"} className="bg-blue-600 text-white"> Post a Job </Link>
            </nav>
          </div> 
        </header>
    )
}