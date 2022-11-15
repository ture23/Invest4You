// const functions = require("firebase-functions");
import functions from 'firebase-functions';
import { initializeApp } from "firebase-admin/app"
import app from '../app.js';

import companyRouter from '../routs/company.js'
initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
// 
export const invest = functions.https.onRequest(app._router);

