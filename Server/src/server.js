//  Install dependecies
const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//  Configure environment variables
env.config()


//  Import internal dependencies
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin/auth');


// MongoDb Connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pwkc0.mongodb.net/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(()=>{
    console.log(`
    Database is connected
*************************************`);
});

//  Use dependencies
const app=express();

//  Middlewares
app.use(bodyParser());


app.use("/api",authRoute);
app.use("/api",adminRoute);


//  API ==>GET requests


//  API <== POST requests



//  satrt server
app.listen(process.env.PORT,()=>{
    console.log(`*************************************
    Server is running on port ${process.env.PORT}`);
})