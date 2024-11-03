"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from '../RentalBusinessHeader';

const VehicleReportTable = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/rental_sp/api/get/vehicle-report/?start_date=${startDate}&end_date=${endDate}`);
            console.log("Fetched vehicles:", response.data);
            setVehicles(response.data); // Assuming response.data is an array of vehicles
            setMessage(""); // Clear previous messages
        } catch (error) {
            console.error("Error fetching vehicles:", error);
            setMessage("Error fetching vehicle data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    
    // Fetch data when dates change
    useEffect(() => {
        // const validateDates = () => {
        //     return new Date(startDate) <= new Date(endDate);
        // };
    
        // if (validateDates()) {
        //     fetchVehicles();
        // } else {
        //     setMessage("End date must be after start date.");
        // }
        fetchVehicles();
    }, [startDate, endDate]);

    const downloadReport = async (format) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/rental_sp/api/export/vehicle-report/in/${format}/?start_date=${startDate}&end_date=${endDate}`, {
                responseType: 'blob'
            });

            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `vehicle_report.${format}`); // Filename for the download
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                setMessage(`Error fetching ${format.toUpperCase()} file.`);
            }
        } catch (error) {
            console.error(`Error downloading the ${format} file:`, error);
            setMessage(`An error occurred while fetching the ${format.toUpperCase()}.`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header />
            <section className="relative border top-[7rem] bg-white dark:bg-gray-800 py-8 px-1 xl:px-6 mx-2 rounded-sm shadow-sm">
                <div className='px-1 xl-px-[3rem] overflow-hidden'>
                    <div className='px-4 xl:px-[5rem] py-10 xl-py-[5rem] border border-gray-600'>
                        <div className='text-center font-semibold text-3xl sm:text-5xl mx-4 my-5 py-5 text-gray-800 dark:text-gray-300'>
                            <h3>Vehicle Rental</h3>
                            <p className='pt-6 font-normal text-4xl dark:text-gray-300'>
                                Vehicle Data Report 
                            </p>
                        </div>

                        <div className="overflow-x-auto lg:overflow-hidden relative">
                            {message && <p>{message}</p>}
                            <table className="relative min-w-full mx-2 sm:mx-1 lg:mx-0 bg-white dark:bg-gray-800 !border !border-gray-300 dark:border-gray-700 rounded-lg">
                                <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Vehicle ID</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Vehicle Owner</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Vehicle Company</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Model</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Type</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Color</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Location</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Rent Per Day</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">After discount Rent</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Discounts</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Status</th>
                                        <th className="px-6 py-5 text-left text-xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Registered At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vehicles.map((vehicle) => (
                                        <tr key={vehicle.buss_vehicle_id} className="text-xl normal-case border-b border-gray-200 dark:border-gray-600">
                                             {/* owener id : {vehicle.buss_vehicle_owner}     */}
                                            <td className="px-6 py-4 font-extrabold text-gray-900 dark:text-gray-100 border border-gray-400/80 dark:border-gray-600">{vehicle.buss_vehicle_id}</td>
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{vehicle.buss_vehicle_owner_email}</td>
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{vehicle.buss_vehicle_company_name}</td>
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{vehicle.buss_vehicle_model}</td>
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{vehicle.buss_vehicle_type}</td>
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{vehicle.buss_vehicle_color}</td>
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{vehicle.buss_vehicle_location}</td>
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600"><span className="font-sans">₹</span> {vehicle.buss_rent_per_day}</td>
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600"><span className="font-sans">₹</span> {vehicle.discounted_rent}</td>
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{vehicle.buss_rent_per_day_discount}%</td> 
                                            {/* buss_rent_per_day_discount */}
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{vehicle.buss_vehicle_status}</td>
                                            <td className="px-6 py-4 text-gray-800/80 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{
                                            (() => {
                                                const date = new Date(vehicle.buss_vehicle_registered_at);
                                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                                const day = String(date.getDate()).padStart(2, '0');
                                                const year = date.getFullYear();
                                            
                                                let hours = date.getHours();
                                                const minutes = String(date.getMinutes()).padStart(2, '0');
                                                const seconds = String(date.getSeconds()).padStart(2, '0');
                                                const ampm = hours >= 12 ? 'PM' : 'AM';
                                                hours = hours % 12 || 12;
                                                const formattedHours = String(hours).padStart(2, '0');
                                            
                                                return `${month}/${day}/${year}, ${formattedHours}:${minutes}:${seconds} ${ampm}`;
                                                })()
                                            }</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            
                        </div>
                    </div>
                </div>

                <div className="relative flex justify-end items-center bg-gray-400/10 mt-10 py-10 px-5">
                    <div className="flex flex-col sm:flex-row justify-evenly gap-5 mx-5 border">
                        <div className=' text-2xl flex justify-between items-center border'>
                            <label htmlFor='date' className='px-4 dark:text-gray-300'>From -</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border p-2 rounded "
                                />
                        </div>
                        <div className='text-2xl flex justify-between items-center border'>
                            <label htmlFor='data' className='px-4 dark:text-gray-300'>To -</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border p-2 rounded"
                                />
                        </div>
                        

                        {/* <button onClick={fetchVehicles} className="bg-blue-500 text-white rounded p-2">
                            Filter
                        </button> */}
                        <div className="flex flex-col sm:flex-row justify-evenly gap-5 mx-5 border">
                            <button onClick={() => downloadReport("pdf")} className=" bg-blue-500 text-white text-2xl px-6 py-3 rounded hover:bg-blue-700">
                                Download PDF
                            </button>
                            
                            <button onClick={() => downloadReport("xlsx")} className=" bg-green-500 text-white text-2xl px-6 py-3 rounded hover:bg-green-700">
                                Download XLSX
                            </button>
                            <button onClick={() => downloadReport("csv")} className=" bg-green-500 text-white text-2xl px-6 py-3 rounded hover:bg-green-700">
                                Download CSV
                            </button>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};

export default VehicleReportTable;
