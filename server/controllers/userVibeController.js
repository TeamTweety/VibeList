

export const parseUserVibe = async (req, res, next) => {
    console.log('\n\n\n I AM HERE \n\n\n')
    if (!req.body.userVibe) {
        const error = {
            log: 'User vibe not provided',
            status: 400,
            message: { err: 'An error occurred while parsing the user\'s vibe'}
        }
        return next(error);
    }

    const { userVibe, numOfSongs, currentPlaylist, rejectedSongs } = req.body;

    if (typeof userVibe !== 'string') {
        const error = {
            log: 'User vibe is not a string',
            status: 400,
            message: { err: 'An error occurred while parsing the user vibe' },
        }
        return next(error);
    }

    res.locals.userVibe = userVibe;
    res.locals.numOfSongs = numOfSongs;
    res.locals.currentPlaylist = currentPlaylist;
    res.locals.rejectedSongs = rejectedSongs;
    next();
}