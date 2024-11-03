"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Page = ({ params }) => {
  const router = useRouter();

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/accounts/verify/${params.authToken}`);
        console.log("x1 ::", response.data.message);

        if (response.status === 200) {
          // Redirect to the registration page if verification is successful
          router.push('/accounts/login');
        } else {
          // If the status is not 200, redirect to the homepage
          router.push('/');
        }
      } catch (error) {
        // Handle error and also redirect to the homepage if there's an issue
        console.error("Error while verifying:", error.response?.data?.error || error.message);
        router.push('/');
      }
    };

    verifyAccount();
  }, [params.authToken]);

  return (
    <div>Verifying account... {params.authToken}</div>
  );
};

export default Page;
