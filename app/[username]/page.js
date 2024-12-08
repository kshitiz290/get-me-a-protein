"use client"
import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'

const Username =  ({ params }) => {
  params = useParams()
  useEffect(()=>{
    document.title=`Support ${params.username} - Get Me A Protein`
  })
  return (
    <>
      <PaymentPage username={params.username}></PaymentPage>
    </>
  )
}

export default Username
