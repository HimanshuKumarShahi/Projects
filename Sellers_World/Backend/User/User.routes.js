import express from 'express';
import UserModel from './User.model';

const router=express.Router();

router.post('/', async(req,res)=>{
    try {
        const {name , email , password} = req.body;
        if(!name || !email){
            return res.status(400).json({message:"Name & Email is Missing."})
        }
    } catch (error) {
        res.status(500).json({message:'Error Happen:',error})
    }
})