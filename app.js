const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const authRouter = require('./routes/auth/index');
const productsRouter = require('./routes/products/index');
const orderRouter = require('./routes/order/index');
const userRouter = require('./routes/user/index');
const { errorHandlingMiddleware } = require("./middlewares/error-handling.middleware");


const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/order", orderRouter);
app.use("/products", productsRouter);
app.use('/users', userRouter)


app.use(errorHandlingMiddleware);

module.exports = app;
