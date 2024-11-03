import { NextResponse } from 'next/server';

export function middleware(req) {
//   const accessToken = req.cookies.get("access_token"); // or use from cookies/localStorage
//   const accessToken = localStorage.getItem("access_token");

  const accessToken = req.cookies.get("access_token");
  const user_data = req.cookies.get("user_data");

  if (accessToken && user_data) {
        // If token exists, block access to login or register and redirect to home page
        
        return NextResponse.redirect(new URL('/', req.url));
  }

  // If token doesn't exist, allow access to the page
  return NextResponse.next();
}

// Apply middleware only to login and register pages
export const config = {
  matcher: ['/accounts/login', '/accounts/register'],
};
