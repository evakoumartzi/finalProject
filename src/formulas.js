import React from "react";
import { Node, Context } from "react-mathjax";
import equations from "./equationPool.json";

// const MathJax = "react-mathjax";
// const tex = `f(x) = \\int_{-\\infty}^\\infty
//     \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
//     \\,d\\xi`;

function Formula(props) {
    console.log("props", props);
    return (
        <Context input="tex">
            <Node inline>{props.tex}</Node>
        </Context>
    );
}

export default function Formulas() {
    const question = <Formula tex={`a = i = \\pi`} />;

    return (
        <div>
            {/* <h4>{question}</h4> */}
            <h4>{question}</h4>
        </div>
    );
}
