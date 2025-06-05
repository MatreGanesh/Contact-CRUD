import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FcBusinessContact } from "react-icons/fc";
import Navbar from './Navbar';
import { handelSuccess, handelWarning } from './reactToastfy/reactToastfy';

export default function ContactForm() {
    // State to manage form inputs
    const [userDetail, setUser] = useState({
        name: '',
        email: '',
        contact: ''
    });
    // const [status, setStatus] = useState(null); // To manage success or error status
    // const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    const handelUser = (e) => {
        const { name, value } = e.target;
        setUser((prevStore) => ({
            ...prevStore,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userDetail.name || !userDetail.email || !userDetail.contact) {
            handelWarning('Please fill all contact details');
        } else {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE}/contactForm/createContact`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userDetail),
                });

                const responseData = await response.json();

                if (response.ok) {
                    handelSuccess('User Added successfully!');
                    setTimeout(() => {
                        navigate('/ContactList');
                        setUser({
                            name: '',
                            email: '',
                            contact: ''
                        });
                    }, 1000);
                } else {
                    if (responseData.errors && responseData.errors.length > 0) {
                        responseData.errors.forEach((errorMessage) => {
                            handelWarning(errorMessage);
                        });
                    } else {
                        handelWarning(responseData.message || 'Error creating contact details. Please try again.');
                    }
                }

            } catch (error) {
                alert('Network error. Please try again.');
            }
        }
    };



    useEffect(() => {

    }, [userDetail]);

    return (
        <>
            <Navbar />
            <div>
                <Link to={'/ContactList'} className='flex justify-center'>
                    <button className="w-full flex items-center justify-center gap-1 lg:max-w-lg p-2 mt-4 font-bold text-white rounded-lg bg-gradient-to-br from-purple-600 to-cyan-400 bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <FcBusinessContact className='w-6 h-6' /> Contact List
                    </button>
                </Link>
                <div className="max-w-lg my-[1em] mx-auto p-6 bg-gradient-to-tr from-purple-400 to-cyan-400 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Contact</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm text-white font-semibold">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userDetail.name}
                                onChange={(e) => handelUser(e)}
                                className="w-full px-4 py-2 mt-2 border-2 shadow-xl text-white shadow-b-800 bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm text-white  font-semibold">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={userDetail.email}
                                onChange={(e) => handelUser(e)}
                                className="w-full px-4 py-2 mt-2 border-2 shadow-xl text-white shadow-b-800 bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Contact Number Field */}
                        <div>
                            <label htmlFor="contact" className="block text-sm text-white  font-semibold">
                                Contact No
                            </label>
                            <input
                                type="number"
                                id="contact"
                                name="contact"
                                value={userDetail.contact}
                                onChange={(e) => handelUser(e)}
                                pattern="^\d{10}$"
                                placeholder="Enter 10-digit number"
                                className="w-full px-4 appearance-none placeholder:text-white py-2 mt-2 border-2 shadow-xl text-white shadow-b-800 bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        {/* 

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-br from-cyan-500 to-purple-600 py-2 mt-4 hover:bg-gradient-to-r hover:font-bold  text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
