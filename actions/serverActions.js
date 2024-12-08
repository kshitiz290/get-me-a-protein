"use server"

import Razorpay from "razorpay"
import User from "@/models/User"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDB"
import { hash } from "bcryptjs"



export const initiate = async(amount,to_user,paymentform)=>{
    await connectDB()
    let user  = await User.findOne({username:to_user})

    var instance = new Razorpay({key_id:user.razorpayid,key_secret:user.razorpaysecret})

    let options = {
        amount : Number.parseInt(amount),
        currency:"INR"
    }
    let x = await instance.orders.create(options);

    //saving payment information to database..
    await Payment.create({pid:x.id,amount:amount/100,to_user:to_user,name:paymentform.name,message:paymentform.message,})

    return x
}
export const fetchUser = async (username)=>{
    await connectDB()
    let u = await User.findOne({username:username});
    if(u){
    let user = u.toObject({flattenObjectIds:true})
    return user;
    }
    
}
export const fetchPayments = async ( username )=>{
    await connectDB()
    let p = await Payment.find({to_user:username,done:true}).sort({amount:-1}).limit(10).lean()
    return p
}
export const updateProfile = async(data,oldusername)=>{
    await connectDB()
    let ndata = Object.fromEntries(data)
    const hashedPassword = await hash(ndata.password,12)

    if(oldusername!==ndata.username){
        let u = await User.findOne({username:ndata.username})
        if(u){
            return {error:"Username already exists"}
        }
        await User.updateOne({email:ndata.email},{...ndata,password:hashedPassword});

        await Payment.updateMany({to_user:oldusername},{to_user:ndata.username});
    }
    else{
        await User.updateOne({email:ndata.email},{...ndata,password:hashedPassword});
    }
}
export const createUser = async (email,username,password) =>{
    await connectDB()
    let user1 = await User.findOne({username});
    let user2 = await User.findOne({email});
    const hashedPassword = await hash(password,12)
    
    if(!user1 && !user2){
        let newUser = await User.create({
            email,
            username,
            password:hashedPassword,
        })
        let objuser = newUser.toObject({flattenObjectIds:true});
        return objuser; 
    }
    return {
        user1:user1?"usererror":"",
        user2:user2?"emailerror":""
    };
}
