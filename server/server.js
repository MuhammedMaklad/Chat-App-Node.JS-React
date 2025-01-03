require("dotenv").config()
require("express-async-errors");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const mongoose = require("mongoose");
const connect_to_database = require("./configuration/DbConnection");
const express = require("express");
const {app, server} = require("./socket/index")
const port = process.env.PORT ||3000

// connect DB
connect_to_database();
app.use(cors(
    {
        origin: '*',
        credentials: true,
    }
))
app.use(express.json());
app.use(cookieParser())

// middlewares
const NotFoundMiddleware = require("middleware/NotFound.middleware");
const ErrorMiddleware = require("middleware/errorHandler.middleware");

// routers
const chatRouter = require("./routes/main.route");

app.get("/", function(request, response){
    response.send("Muhammed on da Code!..");
})
app.use("/api/v1/chat/",chatRouter);

app.use(NotFoundMiddleware);
app.use(ErrorMiddleware);

mongoose.connection.once("open",() => {
    console.log("Connected to MongoDB");
    server.listen(port, () => console.log(`Server running on port ${port}`));
})
mongoose.connection.on("error",(err) => console.log(`Error from mongoose: ${err}`));