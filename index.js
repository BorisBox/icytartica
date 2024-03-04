const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('All good :)');
});

app.post('/webhook', (req, res) => {
    console.log('Received Webhook:', req.body);
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`Webhook receiver listening on port ${PORT}`);
});