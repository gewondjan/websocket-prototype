//Allows us to use the .env environment variables if the environment variables asked for are not found.
require('dotenv').config();
const path = require('path');
const dbAccess = require('./dbAccess.js');
var bodyParser = require('body-parser');
const express = require('express');
const expressWs = require('express-ws');

//Get express app
var app = express();

//apply websockets to the app
var wsApp = expressWs(app);

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(bodyParser());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'webSocketTest.html'));
});

app.get('/getPosts', async (req, res) => {
    var posts = await dbAccess.getPosts();
    res.send(posts);
});


app.post('/updateLike', async (req, res) => {
    console.log(req.body.id);
    await dbAccess.increaseLikesByOne(req.body.id);
    res.send();
});

//Need this variable to broadcast
var testWss = wsApp.getWss('/test');
app.ws('/test', (ws, req) => {
    ws.on('message', (message) => {
        testWss.clients.forEach((client) => {
            client.send("Got the message");
        })
        // ws.send("Got the message");
    });
});

app.listen(process.env.PORT);