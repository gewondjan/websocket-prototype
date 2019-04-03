//Allows us to use the .env environment variables if the environment variables asked for are not found.
require('dotenv').config();
const path = require('path');
const express = require('express');
var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'webSocketTest.html'));
});

app.listen(process.env.PORT);