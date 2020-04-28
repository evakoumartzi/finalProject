const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./db");
app.use(compression());

app.use(express.static("public"));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/",
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/highScores", async function (req, res) {
    try {
        let response = await db.getHighScores();
        res.json(response.rows);
        console.log(response.rows);
    } catch (err) {
        console.log("error in get High scores", err);
        res.sendStatus(500);
    }
});

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/newScore/:name/:score", async (req, res) => {
    try {
        console.log("body", req.params);
        let response = await db.newScore(req.params.name, req.params.score);
        console.log("newScore", response.rows);
        let resp = await db.getHighScores();
        console.log("getHighScores", resp.rows);

        res.json(resp.rows);
    } catch (err) {
        console.log("error in new score", err);
        res.sendStatus(500);
    }
});

app.listen(8080, function () {
    console.log("I'm listening.");
});
