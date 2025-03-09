import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const Connection= async ()=>{
    try {
        const URL= `mongodb://${username}:${password}@blog-app-shard-00-00.vq2jg.mongodb.net:27017,blog-app-shard-00-01.vq2jg.mongodb.net:27017,blog-app-shard-00-02.vq2jg.mongodb.net:27017/?ssl=true&replicaSet=atlas-xv1aw6-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog-app`;
        await mongoose.connect(URL);
        console.log('Database connected successfully');
    } catch(error) {
        console.log('Error while connecting ',error);
    };
}

export default Connection;