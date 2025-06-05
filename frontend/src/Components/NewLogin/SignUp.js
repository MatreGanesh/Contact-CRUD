import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handelSuccess, handelWarning } from "../reactToastfy/reactToastfy";

export default function SignUp() {

    const [login, setLogin] = useState({
        name: '',
        email: '',
        password: ''
    });


    const navigate = useNavigate();

    // Updated function name to handleChange for clarity
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prevLogin) => ({
            ...prevLogin,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(login); // Check if the data is being sent properly
        if (!login.name || !login.email || !login.password) {
            handelWarning('Name, Email and Password are required!');
        } else {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE}/login/signup`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(login),  // Make sure login object is sent correctly
                })

                const data = await response.json();
                const { message, error } = data;
                console.log(data);

                if (response.ok) {
                    handelSuccess(message);
                    setTimeout(() => {
                        navigate('/');
                    }, 1000)
                    setLogin({
                        name: '',
                        email: '',
                        password: ''
                    })
                } else if (error) {
                    const details = error?.details[0].message;
                    handelWarning(details)
                }
                else {
                    // Handle backend validation errors here
                    handelWarning(message); // Display error from the server
                }

            } catch (error) {
                console.log(error);
            }
        }
    };


    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <div className="bg-gradient-to-tr from-purple-400 to-cyan-400 p-6 rounded-lg shadow-md w-full sm:w-96">
                    <h2 className="text-2xl font-bold mb-4 text-center text-white">Sign Up</h2>

                    {/* Sign-Up Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name Input */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-white">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name" // Ensure 'name' matches the state property
                                className="w-full px-4 py-2 mt-2 border-2 shadow-xl text-white bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
                                placeholder="Your full name"
                                value={login.name}
                                onChange={handleChange}

                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-white">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email" // Ensure 'email' matches the state property
                                className="w-full px-4 py-2 mt-2 border-2 shadow-xl text-white bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
                                placeholder="youremail@example.com"
                                value={login.email}
                                onChange={handleChange}

                            // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            />

                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password" // Ensure 'password' matches the state property
                                className="w-full px-4 py-2 mt-2 border-2 shadow-xl text-white bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
                                placeholder="******"
                                value={login.password}
                                onChange={handleChange}

                            // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                            />
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 bg-gradient-to-br from-cyan-500 to-purple-600 hover:bg-gradient-to-r text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-4 text-center text-sm text-white">
                        <p>Already have an account? <Link to={"/"} className="text-blue-600 hover:underline">Sign In</Link></p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
