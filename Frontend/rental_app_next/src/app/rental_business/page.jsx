import RentalBusinessHeader from '@/components/rental_business/RentalBusinessHeader'
import Head from 'next/head'
import React from 'react'

const page = () => {
  return (
    <>
      <RentalBusinessHeader />


        <section className="home  px-[1rem] md:px-[2rem] border-b-2" id="home">
            <div className="h-[55rem] sm:h-[64rem] flex flex-row px-[.5rem] md:px-[3rem] py-[3rem] justify-between font-semibold gap-[1rem]">
                <div className="mx-[0rem] px-[1rem] py-[1rem] relative text-[1.5rem] md:text-[2rem] font-mono flex flex-col items-start justify-between">
                    <h4 className="normal-case tracking-wide">Maximize Your Earnings: List your vehicle on our platform</h4>
                    <p className="normal-case tracking-wide">Turn Your Vehicle Into Income: Join our Rental Network</p>
                </div>
    
                <div className="mx-[0rem] px-[1rem] py-[1rem] relative text-[1.5rem] md:text-[2rem] font-mono flex flex-col items-end justify-between">
                  <p className="normal-case tracking-wide">Your vehicle, Your terms: Register and start earning</p>
                  <h3 data-speed="3" className="home-parallax !text-[3.5rem] sm:!text-[5rem] md:!text-[6rem] font-bold !text-gray-900 !content-end tracking-wide">Partner with us and rent out your vehicle</h3>
                </div>
            </div>
        </section>
    </>
  )
}

export default page