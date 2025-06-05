import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import { handelError, handelSuccess } from './reactToastfy/reactToastfy';

export default function ContactList() {
    const [userList, setUserList] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const getAllContacts = async () => {
        try {
            const url = await fetch(`${process.env.REACT_APP_API_BASE}/contactForm/getContactList`);
            // const headers = {
            //     'Authorization': localStorage.getItem('token')
            // }
            // const response = await fetch(url, headers);
            const result = await url.json();
            console.log(result);
            setUserList(result.allContactList);
        } catch (error) {
            console.error('Error : ', error);
        }
    };

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE}/contactForm/deleteContact/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                handelSuccess('User Removed Successfully!', {
                    autoClose: 1000, // Toast will auto-close after 3 seconds
                });
                getAllContacts(); // Refresh the contact list after deletion
            } else {
                handelError(response.error || 'Error deleting product. Please try again.');
            }
        } catch (error) {
            console.log(error);
            handelError('Error deleting User. Please try again.');
        }
    };

    const editContact = async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE}/contactForm/editContactById/${id}`);
            const data = await response.json();
            // console.log("ContactList ", data);

            // If the response is not OK or not then throw an error with status
            if (response.ok) {
                navigate('/UpdateContact', { state: data })
            } else {
                handelError('User Not Found!')
                throw new Error(`HTTP error! Status: ${response.status}`);

            }
        } catch (error) {
            console.log(error);
            handelError('Error Updated User. Please try again.');
        }
    }

    useEffect(() => {
        getAllContacts(); // Call to get contacts on initial render
    }, []); // Empty dependency array, so it runs only once after the first render


    const handleSearch = (e) => {
        setSearch(e.target.value);
    };


    const searchContactDetails = userList.filter((user) => {
        const Users = user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.contact.toString().toLowerCase().includes(search.toLowerCase())

        return Users;
    })

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-[1em] p-6 bg-gradient-to-tr from-purple-400 to-cyan-400 bg-opacity-5 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-white">Contact List</h2>
                {/* Contact Table */}
                <div className='flex items-center justify-between'>
                    <input type='text' size='50'
                        value={search}
                        onChange={handleSearch}
                        className='h-[7vh] bg-transparent border-2 text-white placeholder:text-white focus:outline-none focus:border-blue-500 px-[1em] rounded-lg' placeholder='Search name here...' />
                    <Link to={'/ContactForm'} className="px-4 py-2 mb-[em] bg-green-500 font-bold text-white rounded-lg hover:bg-green-600 ml-2">
                        <sup>+</sup>Add Contact
                    </Link>
                </div>
                <table className="w-full table-auto mt-6 text-white">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Sr. No.</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Name</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Email</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Contact No</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchContactDetails.length === 0 ?
                            (
                                <tr>
                                    <td colSpan="5" className="text-center text-2xl py-[1em] font-semibold">User Not Found</td>
                                </tr>
                            ) : (

                                searchContactDetails.map((val, index) => (
                                    <tr className="border-t border-gray-500" key={val._id}>
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{val.name}</td>
                                        <td className="px-4 py-2">{val.email}</td>
                                        <td className="px-4 py-2">{val.contact}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => editContact(val._id)}
                                                className="px-4 py-2 text-white rounded-lg uppercase bg-green-600 hover:bg-green-500 mr-2"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => deleteContact(val._id)}
                                                className="px-4 py-2 bg-transparent text-white rounded-lg uppercase bg-red-600 hover:bg-red-500"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>)
                                ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </>
    );
}
