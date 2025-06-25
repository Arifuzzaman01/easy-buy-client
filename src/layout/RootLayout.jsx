import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Home/shared/Navbar';
import Footer from '../Home/shared/Footer';
import { ToastContainer } from 'react-toastify';
export const notify = (msg) => toast(msg);
const RootLayout = () => {
    
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='w-11/12 mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default RootLayout;