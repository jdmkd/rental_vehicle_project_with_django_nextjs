"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import fordEndeavourImage from '../assets/images/cars/ford-endeavour.jpg'
import Image from 'next/image'

export const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/rental_sp/api/get/all/vehicle/data/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setVehicles(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    // if (loading) {
    //     return <div>Loading vehicles...</div>;
    // }

    if (error) {
        return <div>Error: {error}</div>;
    }


  return (
    <>
        <section className="bg-gray-50" id="">
            <h1 className="text-[3rem] md:text-[4rem] flex font-bold text-gray-800 justify-center">
                popular vehicles
                {/* {% comment %} <span>popular vehicles</span> {% endcomment %} */}
            </h1>
            <div className="swiper vehicles-slider !h-fit">
                <div className="swiper-wrapper lg:justify-center scroll-smooth focus:scroll-auto snap-x overflow-x-scroll xl:overflow-hidden  ltr">
                    {(loading)?(
                      [...Array(5)].map((_, indexx) => (
                      <div
                        key={indexx}
                        className="swiper-slide box relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md snap-start"
                      >
                        <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href={`/vehicle/checkout/${'id'}`}>
                          
                          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                            {'00'}% OFF
                          </span>
                        </Link>
                        <div className="mt-4 px-5 pb-5">
                          <Link href={`/vehicle/checkout/${'3'}`}>
                            <h5 className="font-semibold text-2xl tracking-tight text-slate-900">
                              {'None'}
                            </h5>
                          </Link>
                          <div className="mt-2 mb-5 items-center justify-between">
                            <p className="text-3xl font-bold text-slate-900">
                              <span className="font-sans">₹</span>0000/-
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-lg text-slate-900 line-through">
                                <span className="font-sans">₹</span>000
                              </p>
                              <div className="flex items-center">
                                {/* Star Rating */}
                                {[...Array(5)].map((_, index) => (
                                  <svg
                                    key={index}
                                    aria-hidden="true"
                                    className="h-5 w-5 text-yellow-300"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                ))}
                                <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">0.0</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-row justify-evenly gap-[1rem]">
                            <Link href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-[.7rem] py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              Add to cart
                            </Link>
                            <Link href={`/vehicle/checkout/${'vehicle.buss_vehicle_id'}`} className="flex items-center justify-center rounded-md bg-slate-900 px-[.7rem] py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              Booking
                            </Link>
                          </div>
                        </div>
                      </div>
                      
                      )))
                    
                    :(
                      vehicles.map(vehicle => (
                    
                      <div key={vehicle.buss_vehicle_id} className="swiper-slide box relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md scroll-ms-6 snap-start ">
                          
                          <Link className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="/vehicle/checkout/{{ vdata.id}}">
                            <Image className="object-contain rounded-xl" src={`http://127.0.0.1:8000${vehicle.buss_vehicle_photo}`} alt={`${vehicle.buss_vehicle_company_name} ${vehicle.buss_vehicle_model}`} width={300} height={200} />
                            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">{vehicle.buss_rent_per_day_discount}% OFF</span>
                          </Link> 
                          <div className="mt-4 px-5 pb-5">
                            <Link href="/vehicle/checkout/{{ vdata.id}}">
                              <h5 className="font-semibold text-2xl tracking-tight text-slate-900">{vehicle.buss_vehicle_company_name} {vehicle.buss_vehicle_model}</h5>
                            </Link> 
                            <div className="mt-2 mb-5 items-center justify-between">
                              <p className="text-3xl font-bold text-slate-900"><span className="font-sans">₹</span>{vehicle.buss_rent_per_day}/-</p>
                              
                              <div className='flex items-center justify-between'>
                                <p className="text-lg text-slate-900 line-through"><span className="font-sans">₹</span>{vehicle.discounted_rent}</p>
  
                                <div className="flex items-center">
                                  <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                  <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                  <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                  <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                  <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                  <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row justify-evenly gap-[1rem]">
                              <Link href="#" className="flex items-center justify-center rounded-md bg-slate-900 px-[.7rem] py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  Add to cart</Link>
                                <Link href="/vehicle/checkout/{{ vdata.id}}" className="flex items-center justify-center rounded-md bg-slate-900 px-[.7rem] py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                  Booking</Link>
                            </div>
                          </div>
                      </div>   
                      )))
                    }                
                </div>
                
                <div className="swiper-pagination"></div>

            </div>
        </section>
    
    </>
  )
}
