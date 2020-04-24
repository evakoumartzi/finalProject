import React, { useState, useEffect, Component } from "react";
import equations from "./equationPool.json";
// import { useDrag } from "react-dnd";
// import { ItemTypes } from "./Constants";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time

// import { Draggable, Droppable } from "react-drag-and-drop";

let functionIndex = 0;
let graphPicked, functionPicked;

export default function Board() {
    // console.log(equations.firstSet.graph);
    const [formulas, setFormulas] = useState([]);
    var board;
    var plots = [];
    let colorArray = ["blue", "green", "red"];

    useEffect(() => {
        boardInit();

        loadFunctions(functionIndex);

        window.addEventListener("mouseup", () => {
            if (graphPicked && functionPicked) {
                console.log(
                    "graph:   ",
                    graphPicked,
                    "\nfunction:",
                    functionPicked
                );
                // compare if function matches graph
                checkMatch(graphPicked, functionPicked);
            } else {
                console.log(
                    "g:",
                    graphPicked != null,
                    "f:",
                    functionPicked != null
                );
                // if (!functionPicked) console.log("no function picked");
                // if (!graphPicked) console.log("no color picked");
            }
            graphPicked = null;
            functionPicked = null;
        });
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

                //choose function
                plots[x].on("mouseover", function () {
                    // console.log("mouseover", colorArray[x]);
                    if (!graphPicked) {
                        graphPicked = colorArray[x];
                    } else {
                        graphPicked = null;
                    }
                });

                //drop
                plots[x].on("mouseout", function () {
                    // console.log("mouseout", colorArray[x]);
                    graphPicked = null;
                });
            }
            formulaArray.push(functionArray[x].formula);
        }
        setFormulas(formulaArray);
    }

    const handleClick = () => {
        loadFunctions(++functionIndex);
        console.log("set:", functionIndex);
    };

    const handleEquationSelect = (eq) => {
        console.log(eq);
        functionPicked = eq;
    };

    const checkMatch = (graph, funct) => {
        console.log("checking match", graph, funct);
        // colorArray = ["blue", "green", "red"];
        const indeeex = colorArray.findIndex((element) => element == graph);
        console.log("indeeex", indeeex);
        if (equations[functionIndex][indeeex].formula == funct) {
            alert("maaaaatch");
        } else {
            alert("booooooo!");
        }
    };

    // old stuffs
    {
        // const dragStart = () => {
        //     event.dataTransfer.setData("drag-item", props.dataItem);
        // };
        // const handleMouseDown = (e) => {
        //     console.log("mouse down", e);
        // };
        // const handleStart = (e) => {
        //     console.log("mouse start", e);
        // };
        // const handleDrag = (e) => {
        //     e.preventDefault();
        // };
        // const handleDrop = (e) => {
        //     e.preventDefault();
        //     console.log("drop", e);
        // };
    }

    const dragOver = (e) => {
        e.preventDefault();
        console.log("over the board");
    };

    const drop = (e) => {
        e.preventDefault();
        console.log("drop on board", e);
    };

    // const itemDropped = () => {};

    return (
        <div>
            {/* <DropTarget onItemDropped={itemDropped}> */}
            {/* <Droppable> */}
            <div
                id="board"
                className="jxgbox"
                onDragOver={dragOver}
                onDrop={drop}
            ></div>
            {/* </Droppable> */}
            {/* </DropTarget> */}
            <div>
                {formulas.map((i) => {
                    return (
                        <div
                            key={i}
                            className="equationDiv"
                            onMouseDown={() => handleEquationSelect(i)}
                        >
                            {/* <Draggable
                                onMouseDown={handleMouseDown}
                                onStart={handleStart}
                                onDrag={handleDrag}
                                onDrop={handleDrop}
                            > */}
                            <h4 className="equations">{i}</h4>
                            {/* </Draggable> */}
                        </div>
                    );
                })}
            </div>
            <button onClick={handleClick}>load next</button>
        </div>
    );
}
