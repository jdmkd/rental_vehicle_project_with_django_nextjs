"use client"; // Ensure this is a client component
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' instead of 'next/router'

const Register = () => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phonenum, setPhonenum] = useState("");
    const [confirmPassword, setConfPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [message, setMessage] = useState("");

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    // Ensure useRouter is within a client component


    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        const storedUserData = localStorage.getItem("user_data");


        if (accessToken && storedUserData) {
            router.push("/"); // Redirect to home if already logged in
            setUserData(JSON.parse(storedUserData));
        } 
        const isTokenExpired = (token) => {
          if (token) {
            const decoded = JSON.parse(atob(token.split('.')[1]));
            console.log("decoded.exp * 1000 < Date.now() ::",decoded.exp * 1000 < Date.now())
            return decoded.exp * 1000 < Date.now();
          }
          return true;
        };
        
        const checkLogin = () => {
        //   const accessToken = localStorage.getItem("access_token");
        //   const storedUserData = localStorage.getItem("user_data");
      
          if (accessToken && !isTokenExpired(accessToken)) {
            router.push("/"); // Redirect to home if already logged in
            setUserData(JSON.parse(storedUserData));
          } else {
            // localStorage.removeItem("access_token"); // Remove expired token
            setMessageType("error");
            setMessage("Login required");
          }
        };
      
        checkLogin();
    }, [router]);
      



    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(""); // Clear any previous error messages

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }

        const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
        const isValidPhone = (phonenum) => /^\d{10}$/.test(phonenum);

        if (!isValidEmail(email)) {
            setErrorMessage("Invalid email format.");
            return;
        }

        if (!isValidPhone(phonenum)) {
            setErrorMessage("Phone number must be 10 digits.");
            return;
        }

        setLoading(true); // Set loading state to true

        try {
            const response = await fetch("http://127.0.0.1:8000/accounts/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    fname:fname,
                    lname:lname,
                    emailid:email,
                    password:password,
                    phonenum:phonenum
                }),
            });

            if (response.ok) {
                alert("You are registered successfully! Please check your email for verification.");
                router.push('/accounts/login'); // Redirect to login page after successful registration
            } else {
                const data = await response.json();
                setErrorMessage(data.error || "Registration failed.");
            }
        } catch (error) {
            setErrorMessage("An error occurred. Please try again later.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <>
            <div className="signup-form-container" id="signup-form-container">
                <form onSubmit={handleSubmit} className="signup">
                    <h3>Enter your details</h3>
                    <div className="flex relative justify-end top-[-4.5rem] text-black/50">
                        <Link href="/" className="text-black/80">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
                            </svg>
                        </Link>      
                    </div>

                    {/* {userData? (
                        <div>Username: {userData.fname || "User"}</div>
                    ):(
                        <div>please login...</div>
                    )} */}
                    <div className="message">{errorMessage && <span className="error">{errorMessage}</span>}</div>
                    <input type="text" placeholder="First name" className="box" required autoComplete="off" 
                        value={fname} onChange={(e) => setFname(e.target.value)} disabled={loading}/>
                    <input type="text" placeholder="Last name" className="box" required autoComplete="off" 
                        value={lname} onChange={(e) => setLname(e.target.value)} disabled={loading}/>
                    <input type="text" placeholder="Contact number" className="box" required autoComplete="off" 
                        value={phonenum} onChange={(e) => setPhonenum(e.target.value)} disabled={loading}/>
                    <input type="email" placeholder="Email address" className="box" required autoComplete="off" 
                        value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading}/>
                    <input type="password" placeholder="Password" className="box" required autoComplete="off" 
                        value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading}/> 
                    <input type="password" placeholder="Confirm Password" className="box" required autoComplete="off" 
                        value={confirmPassword} onChange={(e) => setConfPassword(e.target.value)} disabled={loading}/>
                    <input type="submit" value={loading ? "Submitting..." : "Submit"} className="btn" disabled={loading} />
                    <p className="normal-case"> Already have an account? <Link href="/accounts/login" className="login-btnx normal-case">Login now</Link> </p>
                    <p className="normal-case text-black"> <Link href="/termsandconpage">Terms & Cons. </Link> | <Link href="/termsandconpage">Privacy policy</Link> </p>
                </form>
            </div>
        </>
    );
};


export async function getServerSideProps(context) {
    const { req, res } = context;
    console.log("first !!!!!!!!!!!!!");
    // Fetch the token from cookies
    const accessToken = req.cookies['access_token'];
    console.log("accessToken ::XX1",accessToken);
    console.log("localStorage.getItem('access_token') XX 1::",localStorage.getItem('access_token'));
    if (accessToken) {
        // If token exists, redirect to home page
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    console.log("No props needed if the user is not logged in!!!!!!");
    return {
        // 127.0.0.1:3000/accounts/register
        
        props: {}, // No props needed if the user is not logged in
    };
}




export default Register;
