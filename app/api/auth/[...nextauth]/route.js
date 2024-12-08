import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import connectDB from "@/db/connectDB"
import { compare } from "bcryptjs"

const authOptions = NextAuth({
  session:{
    jwt:true
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,  // Client ID from Google
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }), 
    CredentialsProvider({
      name:"credentials",
      credentials:{},
      async authorize(credentials,req){
        const {username,password} =  credentials;
        await connectDB()
        const user = await User.findOne({username});
        if(!user){
          throw new Error("No user found with the username");
        }
        const checkPassword = await compare(password,user.password)
        if(!checkPassword){
          throw new Error("Password doesnt match");
        }

        return {id:user._id,name:user.username,email:user.email}
      }
    })
  ],
  callbacks:{
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider=="github"){
        await connectDB()
        console.log(email)
        const currUser = await User.findOne({email:user.email});
        if(!currUser){
          const newUser = await User.create({
            email:user.email,
            password:"",
            username:user.email.split("@")[0],
          })
        }
      }
      if (account.provider == "google") {
        await connectDB()
        const currUser = await User.findOne({email:user.email});
        if(!currUser){
          const newUser = await User.create({
            email:user.email,
            password:"",
            username:user.email.split("@")[0],
          })
        }
      }
      if (account.provider == "facebook") {
        await connectDB()
        const currUser = await User.findOne({email:user.email});
        if(!currUser){
          const newUser = await User.create({
            email:user.email,
            password:"",
            username:user.email.split("@")[0],
          })
        }
      }
      return true
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email:session.user.email});
       session.user.name = dbUser.username;
      return session
    },
  }
})

export {authOptions as GET , authOptions as POST}

