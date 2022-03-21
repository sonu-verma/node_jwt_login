const express  = require('express');
const path = require('path');
const db = require('./config/db');

const app = express();

const publicDirectory = path.join(__dirname,'./public');

app.use(express.static(publicDirectory));  //to load public folders static files
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

app.set('view engine','hbs');
db.connect((error)=>{
    if(error){
        console.log('connection error',error);
    }else{
        console.log('mysql connected.');
    }
});

// Load Router
app.use('/', require('./config/routes'));
app.use('/auth', require('./config/authRoutes'));

app.listen(5000,() => {
    console.log("server running on 5000 port");
});