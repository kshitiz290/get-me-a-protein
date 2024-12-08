import React from 'react'

const Footer = () => {
  const currYear = new Date().getFullYear();
  return (
    <footer className='flex justify-center text-sm md:text-base pt-2 md:pt-0 items-center  md:px-4 h-16 bg-gray-900 text-white'>
       <p>Copyright &copy; {currYear} Get me A Protein - All rights reserved !</p>
    </footer>
  )
}

export default Footer
