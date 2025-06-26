import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const queryOpenAI = async (req, res, next) => {
  try {
    const { userVibe } = res.locals;
    const { currentPlaylist } = res.locals; // Are these what we are calling them?
    const { rejectedSongs } = res.locals; //?
    const { numOfSongs } = res.locals; //?


    const userPrompt = `Your job is to recommend songs that match the mood, tone, and energy of the vibe. The current vibe is ${userVibe}.`
    const example = `[{ "track": "track name", "artist": "artist name" }, { "track": "track name", "artist": "artist name" }]` // do we need more properties?
    const systemPrompt = ` This is the "Current Playlist": ${currentPlaylist}. 
                    This is the "Rejected Songs": ${rejectedSongs}.
                    If you are not provided a Current Playlist OR Rejected Songs, you must recommend exactly 30 song.
                    If you ARE provided "Current Playlist" and "Rejected Songs", you must recommend exaclty ${numOfSongs} that are not found in "Current Playlist" or "Rejected Songs".
                    The format of the response should be exactly like this example: ${example}. Do not respond with anything else.`

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
          content: userPrompt,
        },
        {
          role: 'system',
          content: systemPrompt,
        }
      ],
    });

    const queryResult = completion.output_text;
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
