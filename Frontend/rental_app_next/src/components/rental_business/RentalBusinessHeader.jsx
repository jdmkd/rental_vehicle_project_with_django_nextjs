"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import '../../assets/styles/style.css';
import '../../assets/styles/uiconstyle.css';

import profileUserIcon from '../../assets/images/profileicons/profile-user.png';
import logOutIcon from '../../assets/images/profileicons/log-out.png';
import editIcon from '../../assets/images/profileicons/edit.png';
import settingsIcon from '../../assets/images/profileicons/settings.png';
import helpIcon from '../../assets/images/profileicons/help.png';

const RentalBusinessHeader = () => {
    const [profileToggleActive, setProfileToggleActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    // UseEffect to ensure client-side logic doesn't affect initial render
    
    
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
            
            <Link href="/rental_business" className="logo"> 
                <span>Starlette</span> Business 
            </Link>

            <nav className={`navbar ${menuActive ? 'active' : ''}`}>
                <Link href="/">Starlette</Link>
                <Link href="/rental_business">Home</Link>
                <Link href="#">Vehicles</Link>
                <Link href="#">Services</Link>
                <Link href="#">Feedback</Link>
                <Link href="#">Contact</Link>
            </nav>

            <div className="action">
                <div className="profile" onClick={() => setProfileToggleActive(prev => !prev)}>
                    <Image src={profileUserIcon} alt="User profile icon" height={40} width={40} />
                </div>

                {/* Menu that opens and closes based on the state */}
                <div className={`umenu ${profileToggleActive ? 'active' : ''}`}>
                    <h3>My Profile</h3>
                    <ul>
                        <li>
                            <Image src={profileUserIcon} height={20} width={20} alt="Profile icon" />
                            <Link href="/rental_business/buss_profile">My Profile</Link>
                        </li>
                    </ul>
                    
                    <ul>
                        <li>
                            <Image src={editIcon} height={20} width={20} alt="Register icon" />
                            <Link href="/rental_business/register">Register</Link>
                        </li>
                        <li>
                            <Image src={logOutIcon} height={20} width={20} alt="Logout icon" />
                            <Link href="/rental_business/logout">Logout</Link>
                        </li>
                        <li>
                            <Image src={editIcon} height={20} width={20} alt="Add your vehicle icon" />
                            <Link href="/rental_business/add_new_vehicle">Add your vehicle</Link>
                        </li>
                        <li>
                            <Image src={settingsIcon} height={20} width={20} alt="Your vehicles icon" />
                            <Link href="/rental_business/your_vehicles">Your Vehicles</Link>
                        </li>
                        <li>
                            <Image src={helpIcon} height={20} width={20} alt="Generate vehicles report icon" />
                            <Link href="/rental_business/generate/vehicles/report">Generate Vehicles Report</Link>
                        </li>
                        <li>
                            <Image src={helpIcon} height={20} width={20} alt="Help icon" />
                            <Link href="/rental_business/helps">Help</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default RentalBusinessHeader;
