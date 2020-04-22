import React from "react";
import ReactDOM from "react-dom";
import Canvas from "./canvas.js";
window.d3 = require("d3");

let elem = <Canvas />;
ReactDOM.render(elem, document.querySelector("#root"));
