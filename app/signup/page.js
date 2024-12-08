"use client"
import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify'
import { createUser } from '@/actions/serverActions'

const SignUp = () => {
    let [form, setForm] = useState({})
    let [error, seterror] = useState({ email: "", username: "", password: "" , checked:""})
    const router = useRouter()
    useEffect(() => {
        document.title = "SignUp - Get Me A Protein"
    })
    let handlechange = async (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    let handleSubmit = async (e) => {
        e.preventDefault();
        const { email, username, password } = form;
        if (!email) {
            seterror({ ...error, email: "Email is required" , username:username?" ":"Username is required" , password:password?" ":"Password is required",checked:document.getElementById("terms").checked?" ":"Agree the Terms and Conditions !"
             })
            return
        }
        if (!username) {
            seterror({ ...error, username: "Username is required" ,email:email?" ":"Email is required",password:password?" ":"Password is required",checked:document.getElementById("terms").checked?" ":"Agree the Terms and Conditions !"})
            return
        }
        if (!password ) {
            seterror({ ...error, password: "Password is required" ,username:username?" ":"Username is required", email:email?" ":"Email is required",checked:document.getElementById("terms").checked?" ":"Agree the Terms and Conditions !"})
            return
        }
        if(!document.getElementById("terms").checked){
            seterror({...error,checked:"Agree the Terms and Conditions !",username:username?" ":"Username is required",email:email?" ":"Email is required",username:username?" ":"Username is required"})
            return
        }
        if(password.length < 8){
            seterror({...error,password:"Minimum 8 characters"})
            return
        }
        let userObj = await createUser(email,username,password)
        if(userObj.user1 == "usererror"){
            seterror({...error,username:"Username Already exists",email:email?" ":"Email is required",password:password?" ":"Password is required",checked:document.getElementById("terms").checked?" ":"Agree the Terms and Conditions !"})
        }
        else if(userObj.user2 == "emailerror"){
            seterror({...error,email:"Email Already exists",username:username?" ":"Username is required" , password:password?" ":"Password is required",checked:document.getElementById("terms").checked?" ":"Agree the Terms and Conditions !"})
        }
        else{
            toast(`Welcome ${userObj.username}.Login with your Credentials Now !`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
                seterror({})
            setTimeout(() => {
            router.push("/login");
            }, 4000);
        }
    }
        return (
            <>
                <section className="bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)]">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create an account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" name="email" id="email" value={form.email ? form.email : ""} onChange={handlechange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                        {error.email && <p className='text-sm mt-1 text-red-500'>{error.email}</p>}
                                    </div>
                                    <div>
                                        {/* <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5  my-1 text-center mb-1">Verify Email</button> */}
                                    </div>
                                    <div>
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                        <input type="username" id="username" name="username" value={form.username ? form.username : ""} onChange={handlechange} placeholder="@xyz" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                        {error.username && <p className='text-sm mt-1 text-red-500'>{error.username}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input type="password" name="password" value={form.password ? form.password : ""} onChange={handlechange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                        {error.password && <p className='text-sm mt-1 text-red-500'>{error.password}</p>}
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="terms" aria-describedby="terms" type="checkbox" name='checkbox' className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700  dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 " required="" onChange={handlechange} />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-purple-600 hover:underline dark:text-purple-500" href="#">Terms and Conditions</Link></label>
                                        </div>
                                        {error.checked && <p className='text-sm mt-1 text-red-500'>{error.checked}</p>}
                                    </div>
                                    <button type="submit" className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ">Create an account</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <Link href="/login" className="font-medium text-purple-600 hover:underline dark:text-purple-500 ">Login here</Link>
                                    </p>
                                </form>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    export default SignUp
