import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../database/conn";
import Users from "../../../models/Schema";
import { compare } from "bcrypt";


export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                connectMongo().catch(err => console.log(('connected failed!', err)))
                const user = await Users.findOne({ email: credentials.email })

                if (!user) {

                    throw new Error('No user find with this email pleas sign up ')
                }

                const checkPassword = await compare(credentials.password, user.password)

                if (!checkPassword || user.email !== credentials.email) {

                    throw new Error('password or email is Not Mush ! ')
                }

                return user
            }
        })
    ],

    secret: process.env.JWT_SECRET
}



export default NextAuth(authOptions)