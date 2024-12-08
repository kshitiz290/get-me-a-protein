import React, { useState, useEffect } from 'react'
import { initiate, fetchUser, fetchPayments } from '@/actions/serverActions'
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const PaymentPage = ({ username }) => {
    let [paymentForm, setpaymentForm] = useState({ name: "", message: "", amount: "" })
    let [user, setuser] = useState({});
    let [payments, setpayments] = useState([]);
    let searchParams = useSearchParams()
    let router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        if (!session) {
            router.push("/login")
        } else {
            getData()
        }
    }, [session])
    useEffect(() => {
        if (searchParams.get("paymentDone") == "true") {
            toast('Payment Done !', {
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
            router.push(`/${username}`);
        }
    }, [])

    let handleChange = (e) => {
        setpaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
    }
    let getData = async () => {
        let u = await fetchUser(username)
        setuser(u);
        let payment = await fetchPayments(username)
        setpayments(payment)
    }

    let pay = async (amount) => {
        let a = await initiate(amount, username, paymentForm)
        let orderid = a.id
        var options = {
            "key": process.env.RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me a Protein",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "http://localhost:3000/api/razorpay",
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        let rzp1 = new window.Razorpay(options)
        rzp1.open();
    }
    if (!user) {
        return <div className='text-white text-center mt-4 '>NO USER FOUND 🙄</div>
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

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover relative w-full flex flex-col justify-center items-center'>
                <img className="object-cover h-[40vh] md:h-[50vh] w-full" src={user.coverpic ? user.coverpic : null} alt="" />

                <img className="rounded-full mt-4" width={80} height={20} src={user.profilepic ? user.profilepic : null} alt="" />

            </div>
            <div className='info flex flex-col justify-center items-center gap-1 my-6'>
                <div className='text-lg fontbold text-white'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Lets help {username} to get a Protein !
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments.₹{payments.reduce((a, b) => a + b.amount, 0)} Raised
                </div>
            </div>
            <div className="payment w-[80%] text-white flex flex-col md:flex-row gap-3 container mx-auto mb-6">

                <div className="makepayment w-full md:w-1/2  rounded-lg bg-slate-900 p-8">
                    <h2 className='text-md md:text-lg font-bold mb-2'>Make a payment</h2>
                    <div className='payment-ui flex flex-col gap-2'>
                        <div className='text-white'>
                            <input type="text" name="name" value={paymentForm.name} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' placeholder='Enter Name' />
                        </div>
                        <div className='text-white'>
                            <input type="text" name='message' value={paymentForm.message} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' placeholder='Enter Message' />
                        </div>
                        <div className='text-white'>
                            <input type="text" name="amount" value={paymentForm.amount} onChange={handleChange} className='rounded-lg w-full bg-slate-700 p-1 px-2 border-1 mb-1' placeholder='Enter Amount' />
                        </div>
                        <button onClick={() => pay(Number.parseInt(paymentForm.amount) * 100)} className='bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 p-1 w-1/2 md:w-full border-1 rounded-lg font-bold disabled:bg-slate-500 disabled:from-purple-100 ' disabled={paymentForm.name?.length < 3 || paymentForm.message?.length < 4 || paymentForm.amount?.length < 1}>Pay</button>
                    </div>
                    <div className="buttons flex gap-4 md:gap-2 mt-4">
                        <button className='md:p-2 p-1 rounded-md bg-slate-700 font-bold ' onClick={() => pay(1000)}>Pay ₹10</button>
                        <button className='md:p-2 p-1 rounded-md bg-slate-700 font-bold' onClick={() => pay(2000)}>Pay ₹20</button>
                        <button className='md:p-2 p-1 rounded-md bg-slate-700 font-bold' onClick={() => pay(3000)}>Pay ₹30</button>
                    </div>
                </div>
                <div className="supporter w-full md:w-1/2 rounded-lg bg-slate-900 p-8">
                    <h2 className='md:text-lg text-md font-bold mb-4'>Top 10 Supporters</h2>
                    {payments.length == 0 && <p className='text-sm md:text-base'>No payments yet !</p>}
                    {
                        payments.map((p, i) => {
                            return <li key={i} className='flex items-center ml-2  gap-2 mb-3 '>
                                <img src="avatar.webp" alt="" width={25} height={25} className='rounded-full' />
                                <span>{p.name} donated <span className='font-bold'>₹{p.amount}</span> with a message - {p.message}</span>
                            </li>

                        })
                    }

                </div>
            </div>
        </>
    )
}

export default PaymentPage
