# code-challenge-chatapi


[Adrián Fallas Marín coding challenge solution's](https://github.com/fmadrian/code-challenge/) API.

This API is in charge of forwarding requests from the web application to OpenAI's Completions API. By doing this, we avoid exposing the API key inside the web client.
## How to run?

### Requirements

1. A valid OpenAI Completions API key.
2. A Free Netlify account.
3. Rename the file ***.env.example*** to ***.env*** and fill in the missing environment variable.
### Deployment

Follow this [guide to deploy the function using Netlify Functions](https://docs.netlify.com/functions/deploy/?fn-language=js).

### Locally run

To locally run the application:

1. Install all packages using this command.

```
npm i
```
2. Start the development server by using this command.

```
npm run dev
```