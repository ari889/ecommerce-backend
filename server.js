import express from "express";
import http from 'http';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { commonErrorHandler, notFoundHandler } from "./middlewares/common/errorHandler.js";

/**
 * all routers
 */
import authRouter from './routes/authRouter.js'
import menuRouter from './routes/menuRouter.js'
import roleRouter from './routes/roleRouter.js'
import moduleRouter from './routes/moduleRouter.js'
import permissionRouter from './routes/permissionRouter.js'

/**
 * express app
 */
const app = express();

/**
 * env config
 */
dotenv.config();

/**
 * connect mongodb
 */
mongoose.connect(process.env.MDB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`Database connection successful!`))
    .catch(err => console.log(err.message));

/**
 * setup home route
 */
app.get('/', (req, res) => {
    res.send('Hello eCommerce!');
})

/**
 * enable url encode
 */
app.use(express.urlencoded({ extended: true }));

/**
 * express output
 */
app.use(express.json());

/**
 * auth router
 */
app.use("/", authRouter);

/**
 * menu routes
 */
app.use("/menu", menuRouter);

/**
 * menu routes
 */
app.use("/role", roleRouter);

/**
 * module routes
 */
app.use("/module", moduleRouter);

/**
 * permission router
 */
app.use('/permission', permissionRouter);

/**
 * server create
 */
const server = http.createServer(app);

/**
 * 404 not found
 */
app.use(notFoundHandler);

/**
 * common error handler
 */
app.use(commonErrorHandler);

/**
 * server start
 */
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})