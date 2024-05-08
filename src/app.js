const express = require('express');
const path = require('path');
const app = express();
const port = 7000;

const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname, 'public')));

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`Server listening to http://localhost:${port}`);
})