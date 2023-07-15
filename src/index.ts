import express from "express";
import fs from "fs";
const app = express();

app.get("/randomImage", (req, res) => {
    const randomImage = Math.floor(Math.random() * 103);
    const pic = fs.readFileSync(`./src/Assets/pics/new/${randomImage}.jpg`, { encoding: "binary" });
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(pic, "binary");
});

app.get("/randomImage/:id", (req, res) => {
    const randomImage = req.params.id;
    const pic = fs.readFileSync(`./src/Assets/pics/new/${randomImage}.jpg`, { encoding: "binary" });
    res.writeHead(200, { "Content-Type": "image/jpg" });
    res.end(pic, "binary");
});


app.listen(3005);