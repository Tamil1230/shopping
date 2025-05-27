const express = require('express')
const mongoose = require('mongoose')
const userController = require('./controllers/userController');
const cartController = require('./controllers/cartController');
const app = express();
app.use(express.json());
const cors = require('cors')
app.use(cors());
const productRoutes = require('./routes/routes');
app.use('/api/products', productRoutes);
mongoose.connect('mongodb+srv://mailattamiln:tamil@cluster0.empjogo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    dbName:"create"})
.then(()=>{
    debugger;
    console.log("DB CONNENCT")
}).catch((err)=>{
    debugger;
    console.log('error:', err)
});
app.use('/uploads', express.static('uploads'));
app.use('/', userController)
app.use('/cart', cartController);
app.listen(8000,() =>{
    console.log("SERVER STARTED")
})
