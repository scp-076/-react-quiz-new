const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

let data = require('./quiz.json');

app.use(cors({origin: '*'}));

app.get('/quiz-list/', (req, res) => {
    parsedData = {...data, results: data.results.slice(0, +req.query.amount)};
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(parsedData));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

