const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send("asdasdasd!");
});

app.listen(4000, () => console.log(`Listening on port 4000...`));