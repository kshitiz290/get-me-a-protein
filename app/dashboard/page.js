"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchUser, updateProfile } from '@/actions/serverActions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
    const [form, setform] = useState({});

    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        document.title="Dashboard - Get Me A Protein"
        if (!session) {
            router.push("/login")
        }
        else {
            getData()
        }
    }, [session])

    let getData = async () => {

        let u = await fetchUser(session.user.name)
        if(!u.password){
            setform(u)
        }else{
        setform({...u,password:"***********"});
        }
    }

    let handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    let handleSubmit = async (data) => {
        let a = await updateProfile(data, session.user.name)
        toast('Profile Updated !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
            <div className='text-white '>
                <h1 className='font-bold text-xl md:text-3xl text-center pt-6 md:pt-8'>Welcome to your Dashboard</h1>
                <form action={handleSubmit} className='flex flex-col container mx-auto p-12 md:p-0 justify-center w-full md:w-1/2 py-4' >
                    <div>
                        <label htmlFor="name" className='my-1' >Name</label>
                        <input type="text" id="name" name='name' value={form.name ? form.name : ""} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' />
                    </div>
                    <div>
                        <label htmlFor="email" className='my-1'>Email</label>
                        <input type="text" id='email' name='email' value={form.email ? form.email : ""} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' />
                    </div>
                    <div>
                        <label htmlFor="username" className='my-1'>Username</label>
                        <input type="text" id='username' name='username' value={form.username ? form.username : ""} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' />
                    </div>
                    <div>
                        <label htmlFor="password" className='my-1'>Password</label>
                        <input type="password"  id='password' name='password' value={form.password ? form.password : ""} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' />
                    </div>
                    <div>
                        <label htmlFor="profilepic" className='my-1'>Profile Picture</label>
                        <input type="text" id='profilepic' name='profilepic' value={form.profilepic ? form.profilepic : ""} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' />
                    </div>
                    <div>
                        <label htmlFor="coverpic" className='my-1'>Cover Picture</label>
                        <input type="text" id='coverpic' name='coverpic' value={form.coverpic ? form.coverpic : ""} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' />
                    </div>
                        <div className='my-2 text-sm md:text-base font-bold'>
                            Enter Your Razorpay Id and Secret for getting payments from fans!
                        </div>
                    <div>
                        <label htmlFor="razorpayid" className='my-1'>Razorpay ID</label>
                        <input type="text" id='razorpayid' name='razorpayid' value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' />
                    </div>
                    <div>
                        <label htmlFor="razorpaysecret" className='my-1'>Razorpay Secret</label>
                        <input type="password" id='razorpaysecret' name='razorpaysecret' value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' />
                    </div>
                    <div>
                        <button type='submit' className='bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 mt-5 w-1/2 md:w-full border-1 rounded-lg font-bold p-1'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Dashboard
