const express = require('express');

const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoute = require('./src/routes/user.route');
const connectDB = require('./src/config/db');
const reportRouter = require('./src/routes/report.route');


dotenv.config();
connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/report', reportRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server runing on port ${port}`);
});
