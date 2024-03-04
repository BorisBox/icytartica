const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('All good :)');
});

app.listen(process.env.PORT,()=>{
    console.log("webhook is listening");
});