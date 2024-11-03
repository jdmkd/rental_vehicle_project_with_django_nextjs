"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
    // router.push('/accounts/login');
    const router = useRouter();

  useEffect(() => {
    const { pathname } = window.location;

    // List of allowed routes
    // const allowedRoutes = ['/accounts/login', '/accounts/register'];

    // Redirect to /account/register if the accessed route is not allowed
    if (pathname) {
      router.push('/accounts/register');
    }
  }, [router]);
  return (
    <>
    </>
  )
}

export default page