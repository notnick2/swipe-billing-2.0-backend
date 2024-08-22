// netlify/functions/chat.js
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
        body: JSON.stringify({ text: response.choices[0].message.content }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Oops, something went wrong. Please try again later.' }),
      };
    }
  } else {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }
};



/*const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Route to handle chat requests
app.post('/chat', async (req, res) => {
  const { message } = req.body;

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

    res.json({ text: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Oops, something went wrong. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
*/