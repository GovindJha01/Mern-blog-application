import express from 'express';

import cors from 'cors';
import bodyParser from 'body-parser'

import Router from './routes/route.js';
import Connection from './Database/db.js';


const app=express();

app.use(cors());
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended : true}));


app.use('/', Router);

const PORT=8000;
const username= process.env.DB_USERNAME;
const password= process.env.DB_PASSWORD;

Connection();

app.listen(PORT,()=>{console.log(`Server is running succesfully at port ${PORT}`);});
