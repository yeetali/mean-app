const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user')

const app = express();

mongoose.connect('mongodb+srv://aliselimovic11:PI9L82V8TDYRoN6P@cluster0.fgysncd.mongodb.net/?w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected To Database!');
})
.catch(()=>{
    console.log('Connection Failed!');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;