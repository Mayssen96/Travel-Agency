const express = require ('express');

const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors');
require('dotenv').config();
const connectDb =require ('./config/ConnectDB');
const init = require ('./config/Setup')
const routes = require ('./routes/route')
const routeHotels = require ('./routes/Hotels')
const routeRoom = require ('./routes/Room')
const VolRoutes = require ('./routes/Vols')
const AdminRoute = require ('./routes/routeAdmin')
const CommentRouter = require('./routes/comment')
app.use(express.json());
app.use(cors());
app.use(cookieParser())

const PORT = process.env.PORT ||4000;
connectDb();
init();
app.use('/api',routes);
app.use('/api/hotel/',routeHotels);
app.use('/api/Room/',routeRoom);
app.use('/api/Vol',VolRoutes);
app.use('/api/',CommentRouter);
app.use('/Admin',AdminRoute);
app.listen(PORT,(err) => {
    err ? console.error(err) 
    : 
    console.log(`listen to port... ${PORT}`);
});
