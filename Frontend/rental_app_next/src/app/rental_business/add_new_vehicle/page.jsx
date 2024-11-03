"use client";
import Header from "@/components/rental_business/RentalBusinessHeader";
import React from "react";

const page = () => {
  return (
    <>
      <section className="relative flex justify-center items-center my-[10rem]">
        <div className="bg-white shadow-lg border-2 border-gray-500 rounded-[1rem] px-[1rem] py-[2rem] mx-[.2rem] my-[3rem] min-w-[10rem]">
          <div className="flex flex-col items-center">
            <header className="text-[2.5rem] font-bold px-[1rem] pb-[2rem]">
              Add your new vehicles here.
            </header>
            <form
              action=""
              method="POST"
              encType="multipart/form-data"
              className="flex flex-col mx-[1rem] px-[1rem] gap-[2rem]"
            >
              <div className="mx-[.1rem] px-[2rem] py-[.5rem] grid grid-cols-1 sm:grid-cols-2 gap-[2rem]">
                <select
                  name="buss_vehicle_company_name"
                  id="vehicle_type"
                  className="shadow px-[1rem] py-[1.2rem] border-[.1rem] border-solid border-gray-300 hover:border-gray-400 rounded-[.3rem] text-[1.5rem] min-w-[25rem]"
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Vehicle Company
                  </option>
                  <option value="Honda">Honda</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Mahindra">Mahindra</option>
                </select>
                <input
                  type="text"
                  placeholder="Model name"
                  className="shadow px-[1rem] py-[1rem] border-[.1rem] border-solid border-gray-300 hover:border-gray-400 rounded-[.3rem] text-[1.5rem] min-w-[25rem]"
                  name="buss_vehicle_model_name"
                  required
                />
              </div>

              <div className="mx-[.1rem] px-[2rem] py-[.5rem] flex gap-[2rem]">
                <select
                  name="buss_vehicle_type"
                  id="vehicle_type"
                  className="shadow px-[1rem] py-[1.2rem] border-[.1rem] border-solid border-gray-300 hover:border-gray-400 rounded-[.3rem] text-[1.5rem] min-w-[25rem]"
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Vehicle Type
                  </option>
                  <option value="choice">choice</option>
                </select>
                <select
                  name="buss_vehicle_color"
                  id="vehicle_type"
                  className="shadow px-[1rem] py-[1.2rem] border-[.1rem] border-solid border-gray-300 hover:border-gray-400 rounded-[.3rem] text-[1.5rem] min-w-[25rem]"
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Vehicle Color
                  </option>
                  <option value="choice">choice</option>
                </select>
              </div>

              <div className="mx-[.1rem] px-[2rem] py-[.5rem] flex gap-[2rem]">
                <select
                  name="buss_vehicle_status"
                  id="vehicle_type"
                  className="shadow px-[1rem] py-[1.2rem] border-[.1rem] border-solid border-gray-300 hover:border-gray-400 rounded-[.3rem] text-[1.5rem] min-w-[25rem]"
                  required
                >
                  <option value="" disabled selected hidden>
                    Select Vehicle Status
                  </option>
                  <option value="choice">choice.1</option>
                </select>
                <input
                  type="text"
                  placeholder="Vehicle number"
                  className="shadow px-[1rem] py-[1rem] border-[.1rem] border-solid border-gray-300 hover:border-gray-400 rounded-[.3rem] text-[1.5rem] min-w-[25rem]"
                  name="buss_vehicle_number"
                  required
                />
              </div>

              <div className="mx-[.1rem] px-[2rem] py-[.5rem] flex gap-[2rem]">
                <input
                  type="text"
                  placeholder="Vehicle location"
                  className="shadow px-[1rem] py-[1rem] border-[.1rem] border-solid border-gray-300 hover:border-gray-400 rounded-[.3rem] text-[1.5rem] min-w-[25rem]"
                  name="buss_vehicle_location"
                  required
                />
                <input
                  type="text"
                  placeholder="Rent per day"
                  className="shadow px-[1rem] py-[1rem] border-[.1rem] border-solid border-gray-300 hover:border-gray-400 rounded-[.3rem] text-[1.5rem] min-w-[25rem]"
                  name="buss_rent_per_day"
                  required
                />
              </div>

              <div className="mx-[.1rem] px-[2rem] py-[.5rem] flex gap-[2rem]">
                <input
                  type="text"
                  placeholder="Vehicle description"
                  className="shadow px-[1rem] py-[1rem] border-[.1rem] border-solid border-gray-300 hover:border-gray-400 rounded-[.3rem] text-[1.5rem] min-w-[25rem]"
                  name="buss_vehicle_description"
                  required
                />
                <input
                  type="file"
                  className="shadow px-[1rem] py-[1rem] border-[.1rem] border-solid border-gray-300 hover:border-gray-400 rounded-[.3rem] text-[1.5rem] w-[25rem]"
                  name="buss_vehicle_photo"
                  required
                />
              </div>

              <div className="mx-[.1rem] px-[2rem] py-[.5rem] flex gap-[2rem]">
                <button className="bg-blue-500 text-white px-[2rem] py-[1rem] rounded-[.5rem]">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
    </section>
    
    </>
  )
}

export default page