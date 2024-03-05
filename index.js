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
var participants = [];

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // handle OPTIONS method
    if (req.method == 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        next();
    }
});

app.post('/listener', (req, res) => {
    console.log('Received Webhook');
    var parsed = req.body;
    if (parsed.mode == "participant") {
        if (participants.indexOf("boris") > -1 && participants.indexOf("antonina") > -1 && participants.indexOf("felix") > -1 && participants.indexOf("juan") > -1 && participants.indexOf("kelly") > -1) {
            return res.send("game_start")
        } else {
            participants.push(parsed.content)
            if (participants.indexOf("boris") > -1 && participants.indexOf("antonina") > -1 && participants.indexOf("felix") > -1 && participants.indexOf("juan") > -1 && participants.indexOf("kelly") > -1) {
                return res.send("game_start")
            }
        }
    }
    if (parsed.mode == "correct_answers") {
        correct_answers = parsed.content.split(",");
        console.log("Received correct answers!")
    }
    if (parsed.mode == "guess") {
        if (parsed.content == correct_answers[turn]) {
            return res.send("correct")
        } else {
            return res.send("incorrect")
        }
    }
    if (parsed.mode == "turn") {
        turn++
    }

    if (parsed.mode == "reset") {
        correct_answers = [];
        turn = 0;
        participants = [];
        return res.send("Reset successful!")
    }
    return res.send('OK');
});

app.listen(PORT, () => {
    console.log(`Webhook receiver listening on port ${PORT}`);
});


