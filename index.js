const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51IYmDdSEOVZ4Xi7ry5JWyNb54vRvrNSumlkAZ5xs6HEno6PWOqWnw8EgRad2kwQtpVzK8dSvJXLeF4aLKHJipDEL00edNM17k6');

//Api


//App config
const app  =  express();

//Middleware
app.use(cors({origin : true}));
app.use(express.json());

//api routes
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('payment request received boom !!! for this amount >>>', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, 
        currency: "inr"
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
});

//Listen command
exports.api = functions.https.onRequest(app)

//example end point
//http://localhost:5001/clone-f81bf/us-central1/api
