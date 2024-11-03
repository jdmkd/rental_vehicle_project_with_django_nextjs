"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Hero = () => {
    const [datax, setDatax] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const fetchVehicles = async () => {
  //         try {
  //             const response = await axios.get("http://127.0.0.1:8000/accounts/check-login",{
  //                 method: 'GET',
  //                 credentials: 'include',  // This ensures that cookies are sent with the request
  //               });
  //             console.log("response ::", response);
  //             setDatax(response.data);
  //         } catch (error) {
  //             setError(error.message);
  //         } finally {
  //             setLoading(false);
  //         }
  //     };
  
  //     fetchVehicles();
  // }, []);
  

  return (
    <>
        <section className="home px-[1rem]" id="home">
            {/* {loading ? (
                <p>Loading...</p>
            ) : error ? (
              <div>
                <p>Error: {error}</p>
                <p>data: {datax}</p>
              </div>
                
            ) : (
                <p>name: {datax.message || datax.log_user || JSON.stringify(datax)}</p>
            )} */}

            <div className="h-[50rem] sm:h-[64rem] flex flex-row px-[.5rem] md:px-[3rem] py-[3rem] justify-between font-medium">
                <div className="mx-[0rem] px-[1rem] py-[1rem] relative text-[1.5rem] md:text-[2rem] font-mono flex flex-col items-start justify-between">
                    <h4 className="normal-case tracking-wide">Convenient, Affordable, Reliable: Your next adventure awaits</h4>
                    <p className="normal-case tracking-wide">Drive Your Dreams: explore our wide range of rental vehicles</p>
                </div>

                <div className="mx-[0rem] px-[1rem] py-[1rem] relative text-[1.5rem] md:text-[2rem] font-mono flex flex-col items-end justify-between">
                    <p className="normal-case tracking-wide">Rent the perfect vehicle for any Occasion</p>
                    <h3 data-speed="3" className="home-parallax font-bold !text-gray-900 !content-end tracking-wide">find your car</h3>
                </div>
            </div>
        </section>
    
    </>
  )
}
