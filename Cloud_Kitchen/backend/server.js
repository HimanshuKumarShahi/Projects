import express from 'express'
import cors from 'cors'
import ConnectDB from './config/db.js';

const app = express()


app.use(cors());
app.use(express.json());

ConnectDB();

app.get('/',(req,res)=>{
    res.send("API is Running .")
})


const PORT=process.env.PORT || 5000
app.listen(PORT  , ()=>{
    console.log("Running .....");
    
})