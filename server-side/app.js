import express from 'express';
import cors from 'cors';
import morgan  from 'morgan';
import rateLimit  from 'express-rate-limit';
import helmet  from 'helmet';
import mongoSanitize  from 'express-mongo-sanitize';
import xss  from 'xss-clean';
import hpp from 'hpp';
import path  from 'path'

import AppError from './utils/appError.js';
import companyRouter from './routs/company.js'
import userRouter from './routs/user.js'


const app = express();
app.use(cors());

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// app.use(bodyParser({
//   json: { limit: '50mb', extended: true },
//   urlencoded: { limit: '50mb', extended: true }
// }));
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '250kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: []
  })
);

// Serving static files
// app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});
// app.use(express.static(path.resolve('../client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve('../client/build', 'index.html'));
// });
// // 3) ROUTES
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/users', userRouter);
app.get('/', (req, res) => {
  res.send('Heloo ti Invest4You doslo je dop app.js');
} )
// app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(globalErrorHandler);

export default app;
