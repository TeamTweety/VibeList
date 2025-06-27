import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const queryOpenAI = async (req, res, next) => {
  try {
    const { userVibe } = res.locals;
    const { currentPlaylist = [] } = res.locals; // Are these what we are calling them?
    const { rejectedSongs = [] } = res.locals; //?
    const { numOfSongs = 30 } = res.locals; //?


    const example = `[{ "track": "track name", "artist": "artist name" }, { "track": "track name", "artist": "artist name" }]`

    const systemPrompt = `You are a music recommendation engine. Your task is to return a JSON array of ${numOfSongs} songs.
                          Each object must contain two properties: "track" and "artist".
                          
                          Rules:
                          -Only return valid JSON.
                          -Do NOT include any text before or after the JSON.
                          -Do NOT recommend songs that already exist in the "Current Playlist" or "Rejected Songs".
                          -Each item must be unique and not appear in either list.
                          
                          Current Playlist: ${JSON.stringify(currentPlaylist)}
                          Rejected Songs: ${JSON.stringify(rejectedSongs)}
                          
                          This is the example format: ${example}`

    
    const userPrompt = `The current vibe is "${userVibe}". Recommend songs that match this mood, tone, and energy.`;

    if (!userVibe) {
      const error = {
        log: 'OpenAI query middleware did not receive a query',
        status: 500,
        message: { err: 'An error occurred before querying OpenAI' },
      };
      return next(error);
    }
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        }
      ],
      temperature: 0.2,
    });

    const queryResult = completion.choices[0].message.content;
    res.locals.userVibeQuery = JSON.parse(queryResult);

    console.log('THIS IS THE UserVibeQuery', JSON.parse(queryResult));

    return next();
  } catch(err) {
    return next({
      log: 'queryOpenAi: OpenAI error: ' + err,
      status: 500,
      message: { err: 'An error occured while querying OpenAI' },
    });
  }
};
