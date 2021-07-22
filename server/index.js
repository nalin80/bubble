const express = require('express');
const cors = require('cors');
const db = require('./config/mongoose');

require('dotenv').config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use('/api',require('./router'));

app.listen(PORT,()=>{  
  console.log('Success');
});