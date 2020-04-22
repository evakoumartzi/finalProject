import React from "react";
import ReactDOM from "react-dom";
window.d3 = require("d3");
const functionPlot = require("function-plot");

ReactDOM.render(<HelloWorld />, document.querySelector("#root"));

function HelloWorld() {
    return <div>Hello, World!</div>;
}

const root = document.querySelector("#root");

functionPlot({
    target: root,
    width: 780,
    height: 600,
    yAxis: { domain: [-1, 9] },
    // xScale: 3,
    disableZoom: true,
    tip: {
        renderer: function () {},
    },
    grid: true,
    data: [{ fn: "sqrt(4 - x * x)" }, { fn: "-x" }, { fn: "x^2" }],
});
