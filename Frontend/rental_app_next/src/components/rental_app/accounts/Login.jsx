"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check if the user is already logged in on component mount
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
    
    const check_Login = async (event) => {
        const accessToken = localStorage.getItem("access_token");
        const storedUserData = localStorage.getItem("user_data");
        if (accessToken && !isTokenExpired(accessToken) || storedUserData) {
          router.push("/");
          setUserData(JSON.parse(storedUserData));
        }

        if (!accessToken && isTokenExpired(accessToken)) {
          // setMessageType("error");
          // setMessage("Login required");
          localStorage.removeItem("access_token");
          // router.push("accounts/login"); // Redirect to login
        }
    }
    check_Login();
    // Add additional check login logic here...

  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/accounts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        
      });
      setLoading(false);

      if (response.ok) {
        const data = await response.json();

        // Save tokens and user data to localStorage
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("user_data", JSON.stringify(data.userdata));

        // document.cookie = `access_token=${data.access_token}; path=/; secure; HttpOnly`;
        // document.cookie = `refresh_token=${data.refresh_token}; path=/; secure; HttpOnly`;
        // document.cookie = `user_data=${JSON.stringify(data.user_data)}; path=/; secure; HttpOnly`;

        setUserData(data.userdata); 
        setMessageType("success");
        setMessage(data.message);
        router.push("/");
        // Redirect or update the UI as needed
      } else {
        const errorData = await response.json();
        setMessageType("error");
        setMessage(errorData.error || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during login:", error);
      setMessageType("error");
      setMessage(error.message);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("access_token");
  //   localStorage.removeItem("refresh_token");
  //   localStorage.removeItem("user_data"); 

  //   document.cookie = 'access_token=; Max-Age=0; path=/;';
  //   document.cookie = 'user_data=; Max-Age=0; path=/;';
  //   setUserData(null); 
  // };


  return (
    <div className="login-form-container p-6 mx-auto bg-white rounded-md shadow-md">
      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-4">User Login</h3>

        <div className="flex relative justify-end top-[-4.5rem] text-black/50">
          <Link href="/" className="text-black/80">
              <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
              </svg>
          </Link>      
        </div>

        {userData ? (
          <h3 className="text-lg font-bold mt-4">Username: {userData.fname || "User"}</h3>
        ) : (
          ''
        )}

        {message && (
          <div
            className={`mt-4 p-4 rounded relative ${
              messageType === "error"
                ? "bg-red-100 border border-red-400 text-red-700"
                : "bg-green-100 border border-green-400 text-green-700"
            }`}
            role="alert"
          >
            <strong className="font-bold">
              {messageType === "error" ? "Error:" : "Success:"}
            </strong>
            <span className="block sm:inline ml-2">{message}</span>
          </div>
        )}

        <div className="field input-field mt-4">
          <input
            type="email"
            placeholder="Email"
            className="box w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            name="email"
            autoComplete="on"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field input-field mt-4">
          <input
            type="password"
            placeholder="Password"
            className="box w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <p className="normal-case mt-4">
          Forget your password?{" "}
          <Link href="reset_password" className="text-blue-500 underline">
            Click here
          </Link>
        </p>

        <div className="field button-field mt-4">
          <input
            type="submit"
            value="Login"
            className="btn w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          />
        </div>

        <p className="normal-case mt-4">
          Don't have an account?{" "}
          <Link href="register" className="text-blue-500 underline">
            Register now
          </Link>
        </p>
        <p className="normal-case mt-4">
          <Link href="/termsandconpage" className="text-blue-500 underline">
            Terms & Conditions
          </Link>{" "}
          |{" "}
          <Link href="/termsandconpage" className="text-blue-500 underline">
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
