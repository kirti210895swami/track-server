// this file is created for creating mongo instance using mongoose i.e. lib of mongodb for js
require('./model/users');
require('./model/Track');
const express = require ('express');
const mongoose = require ('mongoose');
const bodyParser=require ('body-parser');// automatically handle json format
const trackRoutes = require ('./route/trackRoutes');
const authRoute= require('./route/authRoute');
const requireAuth = require('./middlewares/requireAuth');

const app= express();
app.use(bodyParser.json());
app.use(authRoute);
app.use(trackRoutes);

const mongoUri =
'mongodb+srv://dbkirti:abslihdfc@cluster0.gzerx.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(
    mongoUri,{
        useNewUrlParser: true ,
        useCreateIndex: true
    }
);
mongoose.connection.on('connected', ()=>{
    console.log("Connected to mongo instance");
});
mongoose.connection.on('error',(err)=>{
  console.error('Error connecting to mongo',err);
});

app.get('/',requireAuth,(req,res) =>{
    res.send(`Your email: ${req.user.email}`);

});

app.listen(3000,()=>{
   console.log('Listening on port 3001');
});