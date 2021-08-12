import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import Routes from './server/route.js';

const app = express(); // we need to do this with every express application to initilise it with app and then we run 


app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Step 2 ------------------->
app.use('/users', Routes);

const URL = 'mongodb+srv://notedb:sidmongo@cluster0.jrtkr.mongodb.net/notedb?retryWrites=true&w=majority'
// const dotenv = require('dotenv'); //3 - but we need to tell express where to pick this port 
// It allows you to seperate your crediantials when we work in a collaborative environment
const PORT = process.env.PORT || '8000'; //2 - get the port from env file, if not available pick 8080


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => { 
    // we need .then becausew
    //it returns a promise 
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
}).catch((error) => {
    console.log('Error:', error.message)
})

