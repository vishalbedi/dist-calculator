#!/usr/bin/env node


/**
 * Entry point of express application
 */

// imports
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');


dotenv.load({ path: '.env' });
const applicationRoutes = require('./routes/');
var app = express();
// middleware to convert request into json objects
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// forward the static index.html page if the request is on root /
app.use(express.static(path.join(__dirname, 'public')));

// test route
app.use('/ping', function (req, res) {
    let reply = {"data": "pong"};
    res.json(reply);
});
// route to fetch airports
app.use('/v2', applicationRoutes);

module.exports = app;