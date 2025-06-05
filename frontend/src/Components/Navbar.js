import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handelSuccess } from './reactToastfy/reactToastfy';

export default function Navbar() {

    const [loggedInUser, setLoggedInUser] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.getItem('token');
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, [])


    const handelLoggedOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handelSuccess('Logged Out!')
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }

    return (
        <>
            <nav className="bg-blue-600 py-1 px-4 flex justify-between items-center">
                {/* Left side - Username */}
                <div className="text-white font-semibold text-lg">
                    Welcome , {loggedInUser}
                </div>

                {/* Right side - Logout */}
                <button
                    // onClick={onLogout}
                    className="bg-red-600 hover:bg-red-500 text-white px-[1em] py-[.3em] font-bold rounded-lg"
                    onClick={handelLoggedOut} >
                    LogOut
                </button>
            </nav>
            <ToastContainer />
        </>
    )
}
