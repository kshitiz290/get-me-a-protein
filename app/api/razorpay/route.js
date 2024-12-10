import { NextResponse } from "next/server";
import connectDB from "@/db/connectDB";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import User from "@/models/User";

export const POST = async (req) =>{
    await connectDB()
    let body  = await req.formData()
    body = Object.fromEntries(body);

    //check if the razorpayorderid is present on the server
    let p = await Payment.findOne({pid:body.razorpay_order_id});
    if(!p){
        return NextResponse.json({success:false,message:"Order id not found"});
    }

    let user = await User.findOne({username:p.to_user});

    let xx = validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,user.razorpaysecret);

    if(xx){
        let updatedPayment = await Payment.findOneAndUpdate({pid:body.razorpay_order_id},{done:true},{new:true});
        return NextResponse.redirect(`https://get-me-a-protein.vercel.app/${updatedPayment.to_user}?paymentDone=true`)
    }
    else{
        return NextResponse.json({success:false,message:"Payment Verification failed"});
    }
}