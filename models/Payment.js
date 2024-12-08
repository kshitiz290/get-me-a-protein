import mongoose from "mongoose";
const {Schema,model} = mongoose;

const paymentSchema = new Schema({
    name:{type:String,required:true},
    to_user:{type:String,required:true},
    amount:{type:Number,required:true},
    createdAt:{type:Date},
    pid:{type:String,required:true},
    message:{type:String,required:true},
    done:{type:Boolean,default:false},
}) 

export default mongoose.models.Payment || model("Payment",paymentSchema);