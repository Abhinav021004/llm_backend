import { OpenRouter } from '@openrouter/sdk';

if(!process.env.OPENROUTER_API_KEY){
    throw new error("api key is missing")
}

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
 
});
export default openrouter;
