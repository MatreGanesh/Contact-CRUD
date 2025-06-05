import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handelError, handelSuccess, handelWarning } from "../reactToastfy/reactToastfy";

export default function SignIn() {
    const [login, setlogin] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handelInput = (e) => {
        const { name, value } = e.target;
        setlogin((preValue) => ({
            ...preValue,
            [name]: value
        }));
    };

    // Send login request to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare login data
        const loginData = {
            email: login.email,
            password: login.password,
        };

        if (!login.email || !login.password) {
            handelWarning('Email and Password is Required!')
        } else {
            try {
                // Make POST request to the backend
                const response = await fetch(`${process.env.REACT_APP_API_BASE}/login/signIn`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loginData),
                });

                const data = await response.json();
                const { message, name, error, jwtToken, } = data;
                console.log(data);
                if (response.ok) {
                    // If login is successful, show success message
                    handelSuccess(message);
                    localStorage.setItem('token', jwtToken);
                    localStorage.setItem('loggedInUser', name);
                    setTimeout(() => {
                        navigate('/ContactList')
                    }, 1000);
                } else if (error) {
                    const details = error?.details[0].message;
                    handelWarning(details)
                }
                else {
                    // Handle backend validation errors here
                    handelWarning(message || "Login Failed!"); // Display error from the server
                }
            } catch (error) {
                console.error("Error:", error);
                handelError("Error Logging in, please try again later");
            }
        }
    };

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
                <div className="bg-gradient-to-tr from-purple-400 to-cyan-400 p-6 rounded-lg shadow-md w-full sm:w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center text-white">Sign In</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-white">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 mt-2 border-2 placeholder:text-white shadow-xl text-white bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="youremail@example.com"
                                autoFocus
                                value={login.email}
                                onChange={handelInput}

                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-white">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 mt-2 border-2 shadow-xl placeholder:text-white text-white bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="******"
                                autoFocus
                                value={login.password}
                                onChange={handelInput}

                            />
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-br from-cyan-500 to-purple-600 py-2 mt-4 hover:bg-gradient-to-r hover:font-bold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-4 text-center text-sm text-white">
                        <p className="text-blue-600 hover:underline">Forgot password?</p>
                    </div>
                    <div className="mt-2 text-center text-sm text-white">
                        <p>Don't have an account? <Link to={"/SignUp"} className="text-blue-600 hover:underline">Sign up</Link></p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>

    );
}
