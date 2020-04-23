import React, { useState, useEffect } from "react";
import equations from "./equationPool.json";
// import ProfilePic from "./profilePic";
// import BioEditor from "./bioEditor";
// import { ReactReduxContext } from "react-redux";
// import axios from "./axios";
console.log("hello");
let functionIndex = 0;

export default function Board() {
    // console.log(equations.firstSet.graph);
    const [formulas, setFormulas] = useState([]);
    var board;
    var plots = [];
    let colorArray = ["blue", "green", "red"];
    let colorPicked;

    useEffect(() => {
        boardInit();

        loadFunctions(functionIndex);

        //     var plot1 = board.create("functiongraph", ["nthroot(x, 3)"], {
        //         withLabel: false,
        //         name: "nthroot(x,3)",
        //     });
        //     var plot2 = board.create("functiongraph", ["1/x"], {
        //         withLabel: false,
        //         name: "cbrt(x)+1",
        //         strokeColor: "black",
        //     });
        //     var plot3 = board.create(
        //         "functiongraph",
        //         [(x) => Math.pow(x, 1 / 3) - 1],
        //         {
        //             withLabel: false,
        //             name: "Math.pow(x, 1/3) - 1",
        //             strokeColor: "red",
        //             strokeWidth: 3,
        //             label: { position: "rt", offset: [-100, -20] },
        //         }
        //     );
        //     var plot4 = board.create("functiongraph", ["2*pow(x,2)-pow(x,4)"], {
        //         withLabel: false,
        //         name: "nthroot(x,3)",
        //     });
        // }
    }, []);

    function boardInit() {
        board = JXG.JSXGraph.initBoard("board", {
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
    }

    function loadFunctions(index) {
        boardInit();
        let functionArray = equations[index];
        let formulaArray = [];

        console.log("fArray", functionArray, "fIndex", functionIndex);
        for (let x in functionArray) {
            if (functionArray[x].graph != "") {
                plots[x] = board.create(
                    "functiongraph",
                    [functionArray[x].graph],
                    {
                        withLabel: false,
                        strokeColor: colorArray[x],
                        strokeWidth: 5,

                        name: `${functionArray[x]}`,
                    }
                );
                plots[x].on("mouseover", function () {
                    // console.log("mouseover", colorArray[x]);
                    colorPicked = colorArray[x];
                });
                plots[x].on("mouseout", function () {
                    // console.log("mouseout", colorArray[x]);
                    colorPicked = null;
                });
            }
            formulaArray.push(functionArray[x].formula);
        }
        console.log(formulaArray);
        setFormulas(formulaArray);
    }

    const handleClick = () => {
        loadFunctions(++functionIndex);
    };

    const onMouseEnterHandler = (index) => {
        console.log("red!", index);
    };

    window.addEventListener("mouseup", () => {
        if (colorPicked) {
            console.log("picked color", colorPicked);
        }
    });

    return (
        <div>
            <div id="board" className="jxgbox"></div>
            {/* <h4>{formulas[0]}</h4> */}
            <div>
                {formulas.map((i) => {
                    return (
                        <div key={i}>
                            <h4>{i}</h4>
                            <div
                                className="color red"
                                id={`n${i} red`}
                                onMouseEnter={() => onMouseEnterHandler(i)}
                            ></div>
                            <div
                                className="color green"
                                id={`n${i} green`}
                            ></div>
                            <div className="color blue" id={`n${i} blue`}></div>
                        </div>
                    );
                })}
            </div>
            <button onClick={handleClick}>load next</button>
        </div>
    );
}
