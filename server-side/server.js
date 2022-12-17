import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();


const DB = process.env.DATABASE.replace(
  'PASSWORD',
  process.env.PASSWORD
);
// const DB = 'mongodb+srv://Marko:marko1234@cluster0.cfldf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message, err.log);
  server.close(() => {
    process.exit(1);
  });
});
