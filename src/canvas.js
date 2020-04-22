import React, { useState, useEffect } from "react";
// import ProfilePic from "./profilePic";
// import BioEditor from "./bioEditor";
// import { ReactReduxContext } from "react-redux";
// import axios from "./axios";

export default function Canvas() {
    useEffect(() => {
        var board = JXG.JSXGraph.initBoard("box", {
            axis: true,
            defaultAxes: {
                x: {
                    name: "x",
                    ticks: {
                        label: {
                            visible: "false",
                            anchorX: "middle",
                            anchorY: "top",
                            fontSize: 0,
                            offset: [0, -3],
                        },
                        drawZero: false,
                        visible: "inherit",
                    },
                },
                y: {
                    name: "y",
                    ticks: {
                        label: {
                            visible: "false",
                            anchorX: "right",
                            anchorY: "middle",
                            fontSize: 0,
                            offset: [-6, 0],
                        },
                        tickEndings: [1, 0],
                        drawZero: false,
                        visible: "inherit",
                    },
                },
            },
            ticks: { visible: false },
            boundingbox: [-5, 5, 5, -5],
            showFullscreen: true,
        });

        var plot1 = board.create("functiongraph", ["nthroot(x, 3)"], {
            withLabel: false,
            name: "nthroot(x,3)",
        });
        // var plot2 = board.create("functiongraph", ["1/x"], {
        //     withLabel: false,
        //     name: "cbrt(x)+1",
        //     strokeColor: "black",
        // });
        // var plot3 = board.create(
        //     "functiongraph",
        //     [(x) => Math.pow(x, 1 / 3) - 1],
        //     {
        //         withLabel: false,
        //         name: "Math.pow(x, 1/3) - 1",
        //         strokeColor: "red",
        //         strokeWidth: 3,
        //         label: { position: "rt", offset: [-100, -20] },
        //     }
        // );
        var plot4 = board.create("functiongraph", ["2*pow(x,2)-pow(x,4)"], {
            withLabel: false,
            name: "nthroot(x,3)",
        });
    }, []);
    const formula = `When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
\[x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\]`;

    return (
        <div>
            <div
                id="box"
                className="jxgbox"
                style={{ width: "900px", height: "900px" }}
            ></div>
            <p>{formula}</p>
        </div>
    );
}
