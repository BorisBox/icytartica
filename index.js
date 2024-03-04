const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Webhook is listening!`);
});