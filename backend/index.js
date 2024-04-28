const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
    res.send("text to youtube");
})

app.listen(process.env.PORT, () => {
    console.log(`app listening on port ${process.env.PORT}`);
})
