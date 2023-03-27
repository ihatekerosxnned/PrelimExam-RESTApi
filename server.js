const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1/buenaflorlab'
const app = express()



mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Database Connected!')
})

app.use(express.json())

const userRouter = require('./routes/users');
app.use('/users',userRouter);

const riderRouter = require('./routes/riders');
app.use('/riders',riderRouter);

const restaurantRouter = require('./routes/restaurants');
app.use('/restaurants',restaurantRouter);

const menuRouter = require('./routes/menus');
app.use('/menus',menuRouter);

const transactionRouter = require('./routes/transactions');
app.use('/transactions',transactionRouter);

app.listen(8080, () => {
    console.log('Server Connected!')
});