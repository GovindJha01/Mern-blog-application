import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username= process.env.DB_USERNAME;
const password= process.env.DB_PASSWORD;

const storage = new GridFsStorage ({
    url: `mongodb://${username}:${password}@blog-app-shard-00-00.vq2jg.mongodb.net:27017,blog-app-shard-00-01.vq2jg.mongodb.net:27017,blog-app-shard-00-02.vq2jg.mongodb.net:27017/?ssl=true&replicaSet=atlas-xv1aw6-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Blog-app`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 