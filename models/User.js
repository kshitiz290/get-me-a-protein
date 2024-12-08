import mongoose from "mongoose";
const {Schema,model} = mongoose

const userSchema = new Schema({
    email:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String},
    profilepic:{type:String},
    coverpic:{type:String},
    name:{type:String},
    razorpayid:{type:String},
    razorpaysecret:{type:String},
})
export default mongoose.models.User || model("User",userSchema);