const express = require('express');
const app = express();
const port = 3000;
const getData = require('./router/router');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/users', getData);

app.listen(port, console.log(`Server listening at port ${port}`));