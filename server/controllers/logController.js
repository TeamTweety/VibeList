import fs from 'fs';


export function logController(req, res, next) {
  const date = new Date()
  const content = `\n\n---\n\n${date}\n\nUser Vibe: ${res.locals.userVibe}\n\nOpenAI Response:\n${JSON.stringify(res.locals.userVibeQuery)}\n\n Response to Client:\n${JSON.stringify(res.locals.searchResults)}`
  fs.appendFile('log.md', content, (err) => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
    }
  });

  next();
}
