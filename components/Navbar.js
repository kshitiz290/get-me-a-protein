"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
const Navbar = () => {
  let [showDropdown, setshowDropdown] = useState(false);
  const { data: session } = useSession()

  return (

    <nav className='flex justify-between items-center px-8 md:h-16 flex-col md:flex-row bg-gray-900  text-white'>
      <Link href={"/"} className='font-bold text-lg flex justify-center items-center gap-2'>GetMeaProtein
      </Link>
      {/* <ul classNameName='flex justify-between gap-4'>
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>SignUp</li>
        <li>Login</li>
      </ul> */}
      <div className='position'>
        {session && <>

          <button id="dropdownDefaultButton" datadropdowntoggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex mx-4 my-2 items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => setshowDropdown(!showDropdown)}
          onBlur={()=> setTimeout(() => {
            setshowDropdown(false)
          }, 100)}
            >Welcome {session.user.name}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
          </button>
          <div id="dropdown" className={`z-10 ${showDropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44  dark:bg-gray-700 absolute right-[45px]`}>

            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              <li>
                <Link href={"/dashboard"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
              </li>

              <li>
                <Link href="#" onClick={()=>signOut()} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
              </li>
            </ul>
          </div>

        </>}

        {!session && <Link href="/signup">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs md:text-sm px-3 md:px-5 py-2.5  my-2 text-center me-2 mb-2" >SignUp</button>
        </Link>}
        {!session && <Link href="/login">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg  text-xs md:text-sm px-3 md:px-5 py-2.5  my-2 text-center me-2 mb-2" >Login</button>
        </Link>}

      </div>
    </nav>
  )
}

export default Navbar
