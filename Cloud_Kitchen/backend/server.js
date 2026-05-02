import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser' 
import dotenv from 'dotenv'
import ConnectDB from './config/db.js'

import userRouter from './routes/user.routes.js'

dotenv.config();

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser()); // Cookies read karne ke liye

// Database Connection
ConnectDB();

// Routes Declaration
app.use("/api/v1/users", userRouter); 
// Ab tumhara URL banega: http://localhost:5000/api/v1/users/register

app.get('/', (req, res) => {
    res.send("API is Running.")
})

const PORT=process.env.PORT || 5000
app.listen(PORT  , ()=>{
    console.log("Running .....");
    
})