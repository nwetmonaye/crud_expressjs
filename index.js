require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

app.use(cors());

 //to get key from request
 app.use(express.json());

 app.use("/api/stocks", require("./routes/stock-route"));

 app.use((err,req,res,next) => {
    console.log(err);
    res.status(500).json({
        code: 500,
        message: err.message,
    });
 });

 mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log("Connected to MongoDB");
 }).catch(console.log);

 app.listen(3000, () => {
    console.log('server is listening on port 3000');
 })