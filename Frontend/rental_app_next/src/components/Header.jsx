'use client';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import '../assets/styles/style.css'
import '../assets/styles/uiconstyle.css'

import profileUserIcon from '../assets/images/profileicons/profile-user.png'
import AccountIcon from "../assets/images/profileicons/account.png"
import logOutIcon from '../assets/images/profileicons/log-out.png'
import editIcon from '../assets/images/profileicons/edit.png'
import settingsIcon from '../assets/images/profileicons/settings.png'
import helpIcon from '../assets/images/profileicons/help.png'
import axios from 'axios';



export const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [profileToggleActive, setProfileToggleActive] = useState(false);

  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const isTokenExpired = (token) => {
      if(token){
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.exp * 1000 < Date.now();
      }
      else{
        return true

      }
    };
    
    // Retrieve the access token from cookies
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };


    const is_authenticated = async (event) => {
        const accessToken = getCookie("access_token"); // Retrieves the "access_token" cookie
        const user_data = getCookie("user_data"); // Retrieves the "user_data" cookie
        console.log("accessToken ::",accessToken);
        console.log("user_data ::",user_data);

        if (accessToken && !isTokenExpired(accessToken) || user_data) {
          // router.push("/");
          console.log("User is authentivated, already logged in.");
          setUserData(JSON.parse(user_data));
        }

        if (!accessToken && isTokenExpired(accessToken)) {
          // setMessageType("error");
          // setMessage("Login required");
          console.log("not authenticated.");
          localStorage.removeItem("access_token");
          // router.push("accounts/login"); // Redirect to login
        }
    }

    

    is_authenticated();
    // Add additional check login logic here...

  }, []);
  

  

  const handleLogout = async () => {
    console.log("handleLogout Called!!");
    try {
        const response = await fetch('http://127.0.0.1:8000/accounts/u/logout', {
            method: 'POST',
            credentials: 'include', // Ensures cookies are sent with the request
        });
        if (response.ok) {
            console.log("Logged out successfully");
            // Redirect or update state as needed
            document.cookie = 'access_token=; Max-Age=0; path=/;';
            document.cookie = 'refresh_token=; Max-Age=0; path=/;';
            document.cookie = 'user_data=; Max-Age=0; path=/;';
            
            setUserData(null); 
            console.log("now redirected on the login page!!");
            router.push('/accounts/login');
        } else {
            console.error("Logout failed");
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
    
  };

  
  
  useEffect(() => {
    const handleMenuToggle = () => {
      console.log("handleProfileToggle Clicked!!");
      setMenuActive(prev => !prev);
    };

    const menuActive = document.querySelector('menu-btn');

    if (menuActive) {
      menuActive.addEventListener('click', handleMenuToggle);
    }

    return () => {
        if (menuActive) {
          menuActive.removeEventListener('click', handleMenuToggle);
        }
    };
}, []);


  useEffect(() => {
      const handleProfileToggle = () => { 
          setProfileToggleActive(prev => !prev);
      };

      const profileToggleActive = document.querySelector('.umenu');
      if (profileToggleActive) {
          profileToggleActive.addEventListener('click', handleProfileToggle);
      }

      return () => {
          if (profileToggleActive) {
              profileToggleActive.removeEventListener('click', handleProfileToggle);
          }
      };
  }, []);
  
  return (
    <header className="header">
      <div id="menu-btn" className={`fas fa-${menuActive ? 'times':'bars'}`} onClick={() => setMenuActive(prev => !prev)}></div>
      <Link href="/" className="logo">
        <span>Rental </span>cars
      </Link>
      
      <nav className={`navbar ${menuActive ? 'active' : ''}`}>
        <Link href="/rental_business">Business Acc</Link>
        <Link href="/">Home</Link>
        <Link href="/vehicles">Vehicles</Link>
        <Link href="/services">Services</Link>
        <Link href="/feedback">Feedback</Link>
        <Link href="/contactus">Contact</Link>
      </nav>

      <div className="action">
        <div className="profile" onClick={() => setProfileToggleActive(prev => !prev)}>
          <Image src={profileUserIcon} alt="User profile icon" height={40} width={40} />
        </div>

        <div className={`umenu ${profileToggleActive ? 'active' : ''}`}>
              

              {userData ? (
                <h3 className="text-lg text-center font-bold py-[.4rem]">Welcome: {userData.fname || userData.emailid}</h3>
              ) : (
                
                <ul>
                  <h3>
                    My <span>Profile</span>
                  </h3>
                  <li>
                    <Image src={editIcon} height={20} width={20} alt="Login icon" />
                    <Link href="/accounts/login">Login or Reg</Link>
                  </li>
                </ul>
              )}
              
              {/* <h3 className="font-semibold text-red-800">
                Welcome, <span className="font-bold text-gray-800">user</span>
              </h3> */}
              
                {userData ? (
                  <ul>
                    <li>
                      <Image src={profileUserIcon} height={20} width={20} alt="Profile icon" />
                      <Link href="/accounts/myprofile">My Profile</Link>
                    </li>
                    <li>
                      <Image src={logOutIcon} height={20} width={20} alt="Logout icon" />
                      <p className=' cursor-pointer ' onClick={handleLogout}>Logout</p>
                      {/* <Link href="">Logout</Link> */}
                    </li>
                    <li>
                      <Image src={settingsIcon} height={20} width={20} alt="Booking history icon" />
                      <Link href="/vehicle/booking/history">Booking History</Link>
                    </li>
                  </ul>
                ) : (
                    ''

                )}
              <ul>
                <li>
                  <Image src={helpIcon} height={20} width={20} alt="Help icon" />
                  <Link href="/generate/reports">Generate Reports</Link>
                </li>
                
                <li>
                  <Image src={helpIcon} height={20} width={20} alt="Help icon" />
                  <Link href="/">Inbox</Link>
                </li>
                <li>
                  <Image src={helpIcon} height={20} width={20} alt="Help icon" />
                  <Link href="/">Help</Link>
                </li>
              </ul>
              

        </div>
      </div>
    </header>
  );
};
