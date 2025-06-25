import express from 'express';

const PORT = 3000;
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server up and running')
})

app.listen(PORT, () => {
    console.log(`express server listening on port ${PORT}`)
})