"use client";
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useState, useEffect, useRef } from 'react';
import MoonIcon from '../../assets/Icons/MoonIcon';
import SunIcon from '../../assets/Icons/SunIcon';
import { Header } from '../Header';

const Tablex = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [startDate, setStartDate] = useState("2024-10-11");
    const [endDate, setEndDate] = useState("2024-10-14");
    const tableRef = useRef();



    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get/user-report/?start_date=${startDate}&end_date=${endDate}`);
            if (response.status === 200) {
                setData(response.data);
            } else {
                setMessage("Error fetching data.");
            }
        } catch (error) {
            setMessage("An error occurred while fetching data.");
        } finally {
            setLoading(false);
        }
    };

    const downloadUserReportPDF = async () => {
        setLoading(true);
        try {
            // Fetch the PDF file as a blob
            const response = await axios.get(
                `http://127.0.0.1:8000/api/export/user-report/in/pdf/?start_date=${startDate}&end_date=${endDate}`,
                {
                    responseType: 'blob' // Important to get the response as a blob (binary data)
                }
            );
    
            if (response.status === 200) {
                // Create a URL from the blob
                const url = window.URL.createObjectURL(new Blob([response.data]));
    
                // Create a temporary link to download the PDF
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'user_report.pdf'); // Filename for the download
                document.body.appendChild(link);
                link.click();
    
                // Clean up by removing the temporary link and revoking the URL
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                setMessage("Error fetching PDF file.");
            }
        } catch (error) {
            setMessage("An error occurred while fetching the PDF.");
        } finally {
            setLoading(false);
        }
    };
    
    const downloadUserReportCSV = async () => {
        setLoading(true);
        try {
            // Fetch the PDF file as a blob
            const response = await axios.get(
                `http://127.0.0.1:8000/api/export/user-report/in/csv/?start_date=${startDate}&end_date=${endDate}`,
                {
                    responseType: 'blob' // Important to get the response as a blob (binary data)
                }
            );
    
            if (response.status === 200) {
                // Create a URL from the blob
                const url = window.URL.createObjectURL(new Blob([response.data]));
    
                // Create a temporary link to download the CSV
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'user_report.csv'); // Filename for the download
                document.body.appendChild(link);
                link.click();
    
                // Clean up by removing the temporary link and revoking the URL
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } else {
                setMessage("Error fetching CSV file.");
            }
        } catch (error) {
            setMessage("An error occurred while fetching the CSV.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate]); // Fetch data when dates change

    // const downloadPDF = () => {
    //     const table = tableRef.current;
    //     html2canvas(table, { scale: 2 }).then((canvas) => {
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF('p', 'mm', 'a4');
    //         const imgWidth = 210;
    //         const pageHeight = 295;
    //         const imgHeight = (canvas.height * imgWidth) / canvas.width;

    //         pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
    //         pdf.save('user-report.pdf');
    //     });
    // };

    return (
        <>
        <Header />
        
        

            <section  className="relative border top-[7rem]  bg-white dark:bg-gray-800 py-8 px-1 xl:px-6  mx-2  rounded-sm shadow-sm">
                {/* <div className='flex flex-row justify-end items-center'>
                    <button onClick={toggleDarkMode} className="flex realtive justify-center sm:mr-8 text-gray-500  dark:text-gray-400 focus:outline-none">
                        {darkMode ? (
                            <MoonIcon />
                        ) : (
                            <SunIcon />
                        )}
                    </button>
                </div> */}
                <div ref={tableRef} className='px-1 xl-px-[3rem] overflow-hidden'>
                    <div className='px-4 xl:px-[5rem] py-10 xl-py-[5rem] border border-gray-600'>
                        <div className='text-center font-semibold text-3xl sm:text-5xl mx-4 my-5 py-5 text-gray-800 dark:text-gray-300'>
                            <h3>Vehicle Rental</h3>
                            <p className=' pt-6 font-normal text-4xl dark:text-gray-300'>
                                User Data Report 
                            </p>

                            <p></p>
                        </div>

                        

                        <div className="overflow-x-auto lg:overflow-hidden relative">
                            {loading ? (
                                <p>Loading...</p>
                            ) : message ? (
                                <p>{message}</p>
                            ) : (
                                <table className="relative min-w-full mx-2 sm:mx-1 lg:mx-0 bg-white dark:bg-gray-800 !border !border-gray-300 dark:border-gray-700 rounded-lg">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr className=''>
                                            <th className="px-6 py-5 text-left text-2xl lg:text-3xl font-semibold text-gray-800/95 dark:text-gray-300 !border !border-gray-500/60 dark:border-gray-600">User ID</th>
                                            <th className="px-6 py-5 text-left text-2xl lg:text-3xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">First Name</th>
                                            <th className="px-6 py-5 text-left text-2xl lg:text-3xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Last Name</th>
                                            <th className="px-6 py-5 text-left text-2xl lg:text-3xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Email</th>
                                            <th className="px-6 py-5 text-left text-2xl lg:text-3xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Phone Number</th>
                                            <th className="px-6 py-5 text-left text-2xl lg:text-3xl font-semibold text-gray-800/95 dark:text-gray-300 border border-gray-500/60 dark:border-gray-600">Registered At</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((user, index) => (
                                            <tr key={index} className="text-2xl border-b border-gray-200 dark:border-gray-600">
                                                <td className="px-6 py-4 font-extrabold text-gray-900 dark:text-gray-100 border border-gray-400/80 dark:border-gray-600">{index}</td>
                                                <td className="px-6 py-4 text-gray-800 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{user.fname}</td>
                                                <td className="px-6 py-4 text-gray-800 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{user.lname}</td>
                                                <td className="px-6 py-4 text-gray-800 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{user.emailid}</td>
                                                <td className="px-6 py-4 text-gray-800 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{user.phonenum}</td>
                                                <td className="px-6 py-4 text-gray-800 font-medium dark:text-gray-400 border border-gray-400/80 dark:border-gray-600">{
                                                // Date(user.created_at).toString()
                                                
                                                    (() => {
                                                    const date = new Date(user.created_at);
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
                                                
                                                
                                                
                                                // (() => {
                                                //     const date = new Date(user.created_at);
                                                //     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                                                //     const month = months[date.getMonth()];
                                                //     const day = date.getDate();
                                                //     const year = date.getFullYear();
                                            
                                                //     let hours = date.getHours();
                                                //     const minutes = String(date.getMinutes()).padStart(2, '0');
                                                //     const seconds = String(date.getSeconds()).padStart(2, '0');
                                                //     const ampm = hours >= 12 ? 'PM' : 'AM';
                                                //     hours = hours % 12 || 12;
                                            
                                                //     const timeZone = date.toTimeString().match(/GMT[+-]\d{4}/)[0];
                                                //     const timeZoneFormatted = timeZone.slice(0, 4) + ':' + timeZone.slice(4);
                                            
                                                //     return `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds} ${ampm} ${timeZoneFormatted}`;
                                                //   })()
                                                }</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                            
                        </div>
                    </div>
                </div>
                
                
            <div className=" relative flex justify-end items-center bg-gray-400/10 mt-10 py-10 px-5">
                {/* Date Filters */}
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
                    {/* <button onClick={fetchData} className="ml-2 bg-blue-500 text-white text-2xl px-5 py-2 rounded hover:bg-blue-700">
                        Filter
                    </button> */}           
                </div>
                <div className="flex flex-col sm:flex-row justify-evenly gap-5 mx-5 border">
                    <button onClick={downloadUserReportPDF} className=" bg-blue-500 text-white text-2xl px-6 py-3 rounded hover:bg-blue-700">
                    getUserReportPDF
                    </button>
                    
                    <button onClick={downloadUserReportCSV} className=" bg-green-500 text-white text-2xl px-6 py-3 rounded hover:bg-green-700">
                            Download CSV
                    </button>

                    {/* <button onClick={downloadPDF} className=" bg-blue-500 text-white text-2xl px-6 py-3 rounded hover:bg-blue-700">
                            Download PDF
                    </button> */}
                </div>
                
            </div>
            </section>
        </>
    );
};

export default Tablex;
