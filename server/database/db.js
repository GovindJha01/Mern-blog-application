import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Connection= async ()=>{
    try {
        const URL= process.env.MongoDB_URI;
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch(error) {
        console.log('Error while connecting ',error);
    };
}

export default Connection;