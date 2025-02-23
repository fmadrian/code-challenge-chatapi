// app.js
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const completions = require('../services/appService');

const app = express();
// Enable CORS.
app.use(cors());
// Parsing the incoming data
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

router = express.Router();

/**
 * 
 * POST /completions 
 * 
 * Route to get a fact about a Pokémon.
 * 
 * Request's body (JSON) should have this form:
 * 
 * {
 *   "name": string
 * }
 * 
 * Response's body (JSON) will have this form:
 * 
 * {
 *  "code": number,
 *  "message": string
 * }
 * 
 */
router.post('/completions', completions);

// Route to Netlify Functions.
app.use('/.netlify/functions/app', router);
module.exports = app;
module.exports.handler = serverless(app);