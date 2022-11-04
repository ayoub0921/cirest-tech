import connectMongo from "../../../database/conn"
import Users from "../../../models/Schema"
import { hash } from "bcrypt"

export default async function handler(req,res){

    connectMongo().catch(err=>res.json({err:'connected failed!'}))

    if(req.method === 'POST'){

        if(!req.body) return res.status(404).json({message:"you don't have a data"})

        const {username,email,password} =  req.body
        const checkEmail = await Users.findOne({email});

        if(checkEmail){
         return res.json({message:'email already exist'})
        }    

        Users.create({username,email,password: await hash(password,12)},function(err,data){

            if(err)return res.status(404).json({err})
            res.status(201).json({status:true,user:data})

        })

    }
    else{
        res.status(500).json({message:'Http method not valid only post accepted'})
    }
}