import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const queryOpenAI = async (req, res, next) => {
  try {
    const { userVibe } = res.locals;

    if (!userVibe) {
      const error = {
        log: 'OpenAI query middleware did not receive a query',
        status: 500,
        message: { err: 'An error occurred before querying OpenAI' },
      };
      return next(error);
    }
    const completion = await client.chat.completion.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: `This is the query given by the user: ${userVibe}. Suggest 30 songs that match the style, energy, and mood.`,
        },
      ],
    });

    const queryResult = completion.choices[0].message.content;
    res.locals.userVibeQuery = queryResult;

    return next();
  } catch(err) {
    return next({
      log: 'queryOpenAi: OpenAI error: ' + err,
      status: 500,
      message: { err: 'An error occured while querying OpenAI' },
    });
  }
};
