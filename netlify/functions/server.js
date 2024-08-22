const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const { message } = JSON.parse(event.body);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "you are assistant for a billing software named swipe billing. if asked about anything use generalized data to give the responses. you are available at the dashboard of the billing software so you have the complete data of their business so whenever they ask about their business or past billings give them response according to their data. as this is just the testing environment we dont have any real data so use some random but appropriate data to respond to the query"
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',  // Allow requests from any origin
          'Access-Control-Allow-Methods': 'OPTIONS, POST',  // Allow these methods
          'Access-Control-Allow-Headers': 'Content-Type'  // Allow these headers
        },
        body: JSON.stringify({ text: response.choices[0].message.content }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Oops, something went wrong. Please try again later.' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
};
