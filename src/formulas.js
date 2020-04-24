import React from "react";
import { Node, Context } from "react-mathjax2";
// import equations from "./equationPool.json";

// const tex = `f(x) = \\int_{-\\infty}^\\infty
//     \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
//     \\,d\\xi`;

export default function Formula(props) {
    return (
        <Context input="tex">
            <h4 className="equations handle mathjax">
                <Node inline>{props.formula}</Node>
            </h4>
        </Context>
    );
}
