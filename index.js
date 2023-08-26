import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import bodyParser from 'body-parser';
import morgan from "morgan";
import mongoose from 'mongoose';
import DBconnect from './config/DbConnection.js';
import UserRoute from './routes/UserRoutes.js'
import {logger} from './utilities/logger.js'

const app = express();

logger.info('Application starting...');

const PORT = process.env.PORT || 5000;

app.use(morgan("tiny"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors())

app.use("/", UserRoute);


DBconnect();
mongoose.connection.on("disconnected", () =>{
    console.log("mongo disconnected!")
})



app.use((error, req, res, next) => {
    logger.error(error)
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({ message });
});




app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
})
