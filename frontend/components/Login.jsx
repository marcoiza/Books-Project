'use client';

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>
          Welcome, {session.user.email}
        </p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>You are note signed in</p>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    )
  }
  
}

export default Login