const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/readscores', (req, res) => {
    return res.send("All good");
});

var correct_answers = ["1","3","1","3","5","2","4","2","1","3","5","5","4","5","2","4","2","3","5","4","1","2","3","4","1"];
var image_order = [17,14,15,12,4,15,4,16,13,10,2,2,3,1,8,3,7,3,0,0,3,3,1,0,0];
var turn = 0;
var participants = [];
var game_init = false;
var how_many_guessed = 0;


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

var scores = [{"score": 0},{"score": 0},{"score": 0},{"score": 0},{"score": 0}];

app.post('/listener', (req, res) => {
    console.log('Received Webhook: ' + req.body.mode);
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
    else if (parsed.mode == "score") {
        return res.send(JSON.stringify(scores));
    }
    else if (parsed.mode == "guess") {
        how_many_guessed++
        if (parsed.content) {
            scores[parseInt(parsed.guesser)].score = scores[parseInt(parsed.guesser)].score + 1;
            return res.send(how_many_guessed)
        }
    }
    else if (parsed.mode == "turn") {
        turn++
        how_many_guessed = 0;
    }
    else if (parsed.mode == "ping") {
        if (participants.indexOf("boris") > -1 && participants.indexOf("antonina") > -1 && participants.indexOf("felix") > -1 && participants.indexOf("juan") > -1 && participants.indexOf("kelly") > -1) {
            return res.send("game_start")
        }
        if (!game_init) {
            game_init = true;
            return res.send("game_init")
        }
    }
    else if (parsed.mode == "reset") {
        game_init = false;
        turn = 0;
        correct_answers = [];
        image_order = [];
        participants = [];
        scores = [{"score": 0},{"score": 0},{"score": 0},{"score": 0},{"score": 0}];
        return res.send("Reset successful!")
    }

    return res.send('OK');
    
});

app.listen(PORT, () => {
    console.log(`Webhook receiver listening on port ${PORT}`);
});


