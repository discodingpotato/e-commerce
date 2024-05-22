const flash = require('express-flash');
const express = require('express');
const nocache = require('nocache');
const path = require('path');
const app = express();
const port = 7000;

const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter');
const updatesRouter = require('./routes/updatesRouter');
const testRouter = require('./routes/testRouter');
const { default: mongoose, connection } = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(nocache());
app.use(flash());

mongoose.connect(`mongodb://127.0.0.1:27017/panic`)
connection.on(`connected`, () => {
    console.log(`Conneted to Mongo DB`)
});

app.set('view engine', 'ejs');

app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use('/', userRouter);
app.use('/admin', adminRouter);
app.use("/updates", updatesRouter);
app.use("/test", testRouter);

app.listen(port, () => {
    console.log(`Server listening to http://localhost:${port}`);
})