import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import http from 'http'
import https from 'https';

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();


// var http = require('http') , https = require('https') , express = require('express') , app = express();



const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
  );
  // const DB = 'mongodb+srv://Marko:marko1234@cluster0.cfldf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));
  
  var server = http.createServer(app).listen(8080);
  // server = https.createServer(app).listen(5050);
  const port = process.env.PORT || 5000;
  server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message, err.log);
  server.close(() => {
    process.exit(1);
  });
});
