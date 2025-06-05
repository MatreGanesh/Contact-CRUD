import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import { handelError, handelSuccess, handelWarning } from './reactToastfy/reactToastfy';
import { FaUserEdit } from "react-icons/fa";


export default function UpdateContactForm() {
    const [userDetail, setUserDetails] = useState({
        name: '',
        email: '',
        contact: ''
    });

    // const [status, setStatus] = useState(null);
    // const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const receivedContactData = location.state;

    const handelUser = (e) => {
        setUserDetails({
            ...userDetail,
            [e.target.name]: e.target.value
        });
    };

    // console.log(userDetail);

    const updateContact = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE}/contactForm/updateContact`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userDetail }) // Pass the userDetail as the request body
            });

            const responseData = await response.json();

            if (response.ok) {
                handelSuccess('User Updated Successfully!');
                setTimeout(() => { navigate("/ContactList"); }, 1000)
            } else {
                // Handle errors based on server response
                if (responseData.message) {
                    // If the server returns a message, show it
                    handelWarning(`${responseData.message}`);
                } else {
                    handelError('Error Updating User. Please try again.');
                }
            }
        } catch (error) {
            // Catch any other errors, such as network issues
            console.error("Error during contact update:", error);
            handelError('Network Error. Please try again.');
        }
    };


    useEffect(() => {
        if (!receivedContactData || !receivedContactData.getContact) {
            console.error("No contact data received");
            navigate('/ContactList');
            return;
        }
        setUserDetails(receivedContactData.getContact); // Set the received user data into state
    }, [receivedContactData, navigate]);


    return (
        <>
            <Navbar />
            <div>
                <Link to={'/ContactList'} >
                    <button className="w-full uppercase py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Contact List
                    </button>
                </Link>
                <div className="max-w-lg my-[1em] mx-auto p-6 bg-gradient-to-tr from-[#21D4FD] to-[#B721FF] rounded-lg shadow-md">
                    <h2 className="flex items-center justify-center gap-1 text-2xl font-bold mb-4 text-center uppercase text-white">
                        <FaUserEdit className='w-6 h-6' /> Update
                    </h2>
                    <form onSubmit={updateContact} className="space-y-4">
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
                                onChange={handelUser}
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
                                onChange={handelUser}
                                className="w-full px-4 py-2 mt-2 border-2 shadow-xl text-white shadow-b-800 bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Contact Number Field */}
                        <div>
                            <label htmlFor="contactNo" className="block text-sm text-white  font-semibold">
                                Contact No
                            </label>
                            <input
                                type="number"
                                id="contactNo"
                                name="contact"
                                value={userDetail.contact}
                                onChange={handelUser}
                                pattern="^\d{10}$"
                                placeholder="Enter 10-digit number"
                                className="w-full px-4 py-2 placeholder:text-white mt-2 border-2 shadow-xl text-white shadow-b-800 bg-transparent border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* {isVisible && status && (
                            <div className={`mb-4 p-2 ${status.includes('Error') ? 'bg-red-200' : 'bg-green-200'} text-center`}>
                                {status}
                            </div>
                        )} */}

                        {/* Submit Button */}
                        <div className='flex gap-[1em]'>
                            <Link to={"/ContactList"} className='w-full'>
                                <button
                                    type='submit'
                                    className=" w-full bg-gradient-to-br from-purple-500 to-cyan-600 py-2 mt-4 hover:bg-gradient-to-r hover:font-bold  text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    Back
                                </button>
                            </Link>
                            <button
                                type='submit'
                                className="w-full bg-gradient-to-br from-cyan-500 to-purple-600 py-2 mt-4 hover:bg-gradient-to-r hover:font-bold  text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}
