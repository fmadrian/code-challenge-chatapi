
const openai = require('openai');

const completions = async (req, res, next) => {
    try {
        // Get Pokémon's name from request.
        const { name } = req.body;
        const apiKey = process.env.OPENAI_APIKEY;

        // Check the name was provided to avoid sending a prompt with no Pokémon.
        if (!name.trim()) {
            return res.status(400).send({ code: 400, message: 'Please provide a Pokémon name.' });
        }

        // Create OpenAI client and send prompt.
        let prompt = `Tell me an interesting or a funny fact about the Pokémon ${name}. If ${name} is not a Pokémon, just tell me it isn't a Pokémon and therefore you can't give me additional data about it.`;
        let completion = null;
        let fact = null;
        try {
            openAIClient = new openai.OpenAI({ apiKey });
            completion = openAIClient.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { "role": "user", "content": prompt },
                ],
            });

            // Return result.
            fact = completion.then((result) => {
                return result.choices[0].message.content ?? 'Empty response.'
            });
            res.status(200).send({ code: 200, message: await fact });
        } catch (error) {
            res.status(500).send({ code: 500, message: `Internal OpenAI's API error.` });
        }
    } catch (error) {
        res.status(500).send({ code: 500, message: `Internal server error.` });
    }
};

module.exports = completions;