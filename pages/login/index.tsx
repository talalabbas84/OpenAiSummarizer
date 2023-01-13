'use client';

import { Magic } from 'magic-sdk';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const Router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { validate, isAuthenticating, isAuthenticated } = useAuth();

  useEffect(() => {
    validate();
  }, []);

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const magic = new Magic(
        process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || ''
      );
      const didToken = await magic.auth.loginWithMagicLink({ email });
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${didToken}`
        },
        body: JSON.stringify({ token: didToken })
      });
      setIsLoading(false);
      if (res.status === 200) {
        Router.push('/');
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  if (isAuthenticated) {
    return Router.push('/');
  }

  if (isAuthenticating || isAuthenticated === undefined) return null;
  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center py-20'>
      <div className='bg-gray-100 h-full w-screen flex justify-center items-center'>
        <div
          className='bg-white   rounded-2xl shadow-xl flex flex-col justify-center items-center  
        // take 30% of the screen width
        w-11/12 sm:w-10/12 md:w-9/12 lg:w-4/12 xl:w-4/12 2xl:w-4/12  p-10
        '
        >
          <h1 className='text-2xl font-bold'>Login</h1>
          <div className='w-full flex flex-col justify-center items-center p-10  border-gray-200'>
            <div className='col-span-2 w-full'>
              <input
                type='text'
                className='w-full h-12 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border border-gray-200 rounded-md'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className='w-full flex flex-col justify-center items-center   border-gray-200'>
            <div className='col-span-2 w-full flex justify-center'>
              <button
                className='w-3/12 h-12 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 border border-gray-200 rounded-md bg-black text-white
                hover:bg-transparent hover:text-black hover:border-black
                disabled:cursor-not-allowed
                '
                disabled={!email || isLoading}
                onClick={handleSignIn}
              >
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
