const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('All good :)');
});

var correct_answers = [];
var image_order = [];
var turn = 0;
var participants = [];
var game_init = false;
var infosent = false;

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
    else if (parsed.mode == "correct_answers") {
        correct_answers = parsed.content.split(",");
        console.log("Received correct answers!")
    }
    else if (parsed.mode == "guess") {
        if (parsed.content == correct_answers[turn]) {
            return res.send("correct")
        } else {
            return res.send("incorrect")
        }
    }
    else if (parsed.mode == "turn") {
        turn++
    }
    else if (parsed.mode == "image_order") {
        image_order = parsed.content.split(",");
        console.log("Received correct order!")
    }
    else if (parsed.mode == "ping") {
        if (participants.indexOf("boris") > -1 && participants.indexOf("antonina") > -1 && participants.indexOf("felix") > -1 && participants.indexOf("juan") > -1 && participants.indexOf("kelly") > -1) {
            return res.send("game_start")
        }
        if (!game_init) {
            game_init = true;
            return res.send("game_init")
        } else if (!infosent) {
            infosent = true;
            return res.send({"image_order": image_order, "correct_answers": correct_answers})
        }
    }
    else if (parsed.mode == "reset") {
        correct_answers = [];
        image_order = [];
        turn = 0;
        participants = [];
        return res.send("Reset successful!")
    } else {
        return res.send('OK');
    }
});

app.listen(PORT, () => {
    console.log(`Webhook receiver listening on port ${PORT}`);
});


