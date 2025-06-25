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
    const completion = await client.responses.create({
      model: 'gpt-4o',
      input: [
        {
          role: 'user',
          content: `This is the query given by the user: ${userVibe}. Suggest 30 songs that match the style, energy, and mood.`,
        },
        {
          role: 'user',
          content: '',
        }
      ],
    });

    console.log('this is the completion ', completion)
    console.log('this is the completion output text', completion.output_text)

    const queryResult = completion.output_text;
    res.locals.userVibeQuery = queryResult;

    console.log('THIS IS THE UserVibeQuery', queryResult)

    return next();
  } catch(err) {
    return next({
      log: 'queryOpenAi: OpenAI error: ' + err,
      status: 500,
      message: { err: 'An error occured while querying OpenAI' },
    });
  }
};
