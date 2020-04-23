const express = require("express");
const app = express();
const compression = require("compression");

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

app.get("*", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

// app.get("/welcome", function (req, res) {
//     console.log("welcome route");
//     if (!req.session.user) {
//         console.log("user not logged in", req.session.user);
//         res.sendFile(__dirname + "/index.html");
//     } else {
//         console.log("redirecting to /");
//         res.redirect("/");
//     }
// });

// app.get("*", function (req, res) {
//     console.log("**** star route ****", req.session.user != undefined);
//     if (req.session.user) {
//         console.log("user logged in");
//         res.sendFile(__dirname + "/index.html");
//     } else {
//         console.log("redirecting to welcome", req.session.user);
//         res.redirect("/welcome");
//     }
// });

app.listen(8080, function () {
    console.log("I'm listening.");
});

/////////////////////////////////////////////////////

// window.d3 = require("d3");
// import d3 from "d3";
// window.d3 = d3;
