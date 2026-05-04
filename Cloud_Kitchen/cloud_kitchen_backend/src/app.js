import express from 'express'
import cors from 'cors'

const app=express();

app.use(cors());

app.use(express.json());

/**
 * Health checking
 */

app.get('/api/health',(req , res)=>{
    res.status(200).json({
        success:true,
        message:"Cloud Kitchen Api is running smoothly."
    });
});


export default app;