require("dotenv").config()
require("express-async-errors");

const mongoose = require("mongoose");
const connect_to_database = require("./configuration/DbConnection");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;


// connect DB
connect_to_database();

app.use(express.json());



app.get("/", function(request, response){
    response.send("Muhammed on da Code!..");
})



mongoose.connection.once("open",() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
mongoose.connection.on("error",(err) => console.log(`Error from mongoose: ${err}`));