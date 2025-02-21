// app.js
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');


const app = express();

// Parsing the incoming data
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

router = express.Router();


router.post('/completions', (req, res, next) => {
    try {
        res.status(200).send({ message: 'ping' });

    } catch (error) {
        res.status(500).send({ message: 'Internal Chat API error.' });
    }
})

// Route to Netlify functions.
app.use('/.netlify/functions/app', router);
module.exports = app;
module.exports.handler = serverless(app);