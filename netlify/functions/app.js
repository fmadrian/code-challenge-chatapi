// app.js
const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const openai = require('openai');
const cors = require('cors');

const app = express();
// Enable CORS.
app.use(cors())
// Parsing the incoming data
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

router = express.Router();


router.post('/completions', async (req, res, next) => {
    try {
        // Get Pokémon's name from request.
        const { name } = req.body;
        const apiKey = process.env.OPENAI_APIKEY;

        // Create client and send prompt.
        openAIClient = new openai.OpenAI({ apiKey });
        const prompt = `Tell me an interesting or a funny fact about the Pokémon ${name}. If ${name} is not a Pokémon, just tell me it isn't a Pokémon and therefore you can't give me additional data about it.`;
        const completion = openAIClient.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { "role": "user", "content": prompt },
            ],
        });

        // 3. Return result.
        const fact = completion.then((result) => {
            return result.choices[0].message.content ?? 'No response'
        });

        res.status(200).send({ code: 200, message: await fact });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `Internal OpenAI's API error.` });
    }
})

// Route to Netlify functions.
app.use('/.netlify/functions/app', router);
module.exports = app;
module.exports.handler = serverless(app);