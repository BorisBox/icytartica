const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('All good :)');
});

var correct_answers = [];
var turn = 0;

app.post('/listener', (req, res) => {
    console.log('Received Webhook');
    var parsed = req.body;
    if (parsed.mode == "correct_answers") {
        correct_answers = parsed.content.split("");
    }
    if (parsed.mode == "guess") {
        if (parsed.content == correct_answers[turn]) {
            res.type('text').send("correct")
        } else {
            res.type('text').send("incorrect")
        }
    }
    if (parsed.mode == "turn") {
        turn++
    }
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Webhook receiver listening on port ${PORT}`);
});


