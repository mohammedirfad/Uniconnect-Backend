import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import bodyParser from 'body-parser';
import morgan from "morgan";
import winston from 'winston'; 
import mongoose from 'mongoose';
import DBconnect from './config/DbConnection.js';
import UniversityRoute from './routes/UniversityRoutes.js'
import StudentRoute from './routes/StudentRoutes.js'
import { notFound , errorHandler } from './middlewares/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

app.use(morgan("tiny"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(notFound)
app.use(errorHandler)

app.use(cors())

app.use("/", UniversityRoute);
app.use("/student/", StudentRoute);


DBconnect();
mongoose.connection.on("disconnected", () =>{
    console.log("mongo disconnected!")
})



app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({ message });
});

// error handler
app.use(function (err, req, res, next) {
    logger.error(err); // Log the error using winston logger
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err);

    res.status(err.status || 500);
    res.json({
        message: 'Ooops, sorry! We couldn\'t process your request',
        status: err.status || 500
    });
});


app.listen(PORT,() =>{
    console.log(`Server running on port ${PORT}`);
})
