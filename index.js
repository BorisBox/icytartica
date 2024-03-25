import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 10000 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
//const express = require('express');
//const bodyParser = require('body-parser');
//
//const app = express();
//const PORT = process.env.PORT || 3000;
//
//app.use(bodyParser.json());
//
//app.get('/readscores', (req, res) => {
//    return res.send("All good");
//});
//
//var turn = 0;
//var participants = [];
//var game_init = false;
//var how_many_guessed = 0;
//
//
//app.use(function(req, res, next) {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//    res.setHeader('Access-Control-Allow-Credentials', true);
//    // handle OPTIONS method
//    if (req.method == 'OPTIONS') {
//        return res.sendStatus(200);
//    } else {
//        next();
//    }
//});
//
//var scores = [{"score": 0},{"score": 0},{"score": 0},{"score": 0},{"score": 0},{"hmg": how_many_guessed}];
//
//app.post('/listener', (req, res) => {
//    console.log('Received Webhook');
//    var parsed = req.body;
//    if (parsed.mode == "participant") {
//        if (participants.indexOf("boris") > -1 && participants.indexOf("antonina") > -1 && participants.indexOf("felix") > -1 && participants.indexOf("juan") > -1 && participants.indexOf("kelly") > -1) {
//            return res.send("game_start")
//        } else {
//            participants.push(parsed.content)
//            if (participants.indexOf("boris") > -1 && participants.indexOf("antonina") > -1 && participants.indexOf("felix") > -1 && participants.indexOf("juan") > -1 && participants.indexOf("kelly") > -1) {
//                return res.send("game_start")
//            }
//        }
//    }
//    else if (parsed.mode == "score") {
//        return res.send(JSON.stringify(scores));
//    }
//    else if (parsed.mode == "guess") {
//        if (parsed.content == "correct") {
//            scores[parsed.guesser].score = scores[parsed.guesser].score + 1;
//        } else {}
//        how_many_guessed = parseInt(how_many_guessed) + 1;
//        scores[5].hmg = how_many_guessed;
//        return res.send("Guess accepted")
//    }
//    else if (parsed.mode == "turn") {
//        turn++
//    }
//    else if (parsed.mode == "ping") {
//        if (participants.indexOf("boris") > -1 && participants.indexOf("antonina") > -1 && participants.indexOf("felix") > -1 && participants.indexOf("juan") > -1 && participants.indexOf("kelly") > -1) {
//            return res.send("game_start")
//        }
//        if (!game_init) {
//            game_init = true;
//            return res.send("game_init")
//        }
//    }
//    else if (parsed.mode == "reset") {
//        game_init = false;
//        turn = 0;
//        participants = [];
//        how_many_guessed = 0;
//        scores = [{"score": 0},{"score": 0},{"score": 0},{"score": 0},{"score": 0},{"hmg": 0}];
//        return res.send("Reset successful!")
//    }
//
//    return res.send('OK');
//    
//});
//
//app.listen(PORT, () => {
//    console.log(`Webhook receiver listening on port ${PORT}`);
//});