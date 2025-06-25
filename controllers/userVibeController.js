//import express from 'express';



export const parseUserVibe = async (req, res, next) => {
    if (!req.body.userVibe) {
        const error = {
            log: 'User vibe not provided',
            status: 400,
            message: { err: 'An error occurred while parsing the user\'s vibe'}
        }
        return next(error);
    }

    const { userVibe } = req.body;

    if (typeof userVibe !== 'string') {
        const error = {
            log: 'User vibe is not a string',
            status: 400,
            message: { err: 'An error occurred while parsing the user vibe' },
        }
        return next(error);
    }

    res.locals.userVibe = userVibe;
}