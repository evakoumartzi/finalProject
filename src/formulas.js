import React from "react";
import { Node, Context } from "react-mathjax2";

export default function Formula(props) {
    // console.log("props", props);
    return (
        <Context input="tex">
            <h4 className="formulas">
                <Node inline>{props.formula}</Node>
            </h4>
        </Context>
    );
}
