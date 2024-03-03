const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const path = require('path');
require("dotenv").config();

app.use(bodyParser.json());
app.use('/codemirror', express.static(path.join(__dirname, 'codemirror')));

const database = require('./config/database')
const codeRunsRouter = require('./routes/codeRuns');


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api', codeRunsRouter);


app.listen(port, () => {
    console.log(`IDE server running on port ${port}`)
});
