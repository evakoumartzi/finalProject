import React, { useState, useEffect, Component } from "react";
import equations from "./equationPool.json";
// import { useDrag } from "react-dnd";
// import { ItemTypes } from "./Constants";
// import { Draggable, Droppable } from "react-drag-and-drop";
// import Draggable, { DraggableCore } from "react-draggable";
import Formulas from "./formulas.js";

let functionIndex;
let graphPicked, functionPicked;
let pointCounter, mistakesCounter, bonusPoint;
const levelAmount = 12;
let showFinalModal = false;
// const gameMode = ["START", "PLAYING", "FINAL"];

export default function Board() {
    // console.log(equations.firstSet.graph);
    const [formulas, setFormulas] = useState([]);
    let board;
    let plots = [];
    let colorArray = [];
    let solvedArray = [];

    useEffect(() => {
        startGame();

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
                console.log("g:", graphPicked, "f:", functionPicked != null);
                // if (!functionPicked) console.log("no function picked");
                // if (!graphPicked) console.log("no color picked");
            }
            graphPicked = null;
            functionPicked = null;
        });
    }, []);

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function startGame() {
        boardInit();
        pointCounter = 0;
        mistakesCounter = 0;
        bonusPoint = true;
        functionIndex = 0;
        // TODO randomise colors here
        colorArray = shuffle(["blue", "green", "red"]);
        solvedArray = [false, false, false];

        loadFunctions(functionIndex);
    }

    function nextLevel() {
        if (functionIndex < levelAmount) {
            console.log("sane");
            mistakesCounter = 0;
            bonusPoint = true;
            functionIndex++;
            // TODO maybe switch colors again
            colorArray = shuffle(["blue", "green", "red"]);

            solvedArray = [false, false, false];
            loadFunctions(functionIndex);
        } else {
            showFinalModal = true;
        }
    }

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

        // console.log("fArray", functionArray, "fIndex", functionIndex);
        for (let x in functionArray) {
            if (functionArray[x].graph != "") {
                if (solvedArray[x] == false) {
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
                    plots[x].off();
                    plots[x].on("mouseover", function () {
                        // console.log("mouseover", colorArray[x]);
                        if (!graphPicked) {
                            graphPicked = colorArray[x];
                            console.log(graphPicked);
                        } else if (graphPicked != colorArray[x]) {
                            console.log("killing graphPicked");
                            graphPicked = null;
                        }
                    });
                } else {
                    plots[x] = board.create(
                        "functiongraph",
                        [functionArray[x].graph],
                        {
                            withLabel: false,
                            strokeColor: "gray",
                            strokeWidth: 5,

                            name: `${functionArray[x]}`,
                        }
                    );
                }

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
        nextLevel();
    };

    const handleEquationSelect = (eq) => {
        console.log(eq);
        functionPicked = eq;
    };

    const checkMatch = (graph, funct) => {
        // console.log("checking match", graph, funct);
        const index = colorArray.findIndex((element) => element == graph);
        console.log("indeeex", index, solvedArray[index]);
        if (solvedArray[index] == false) {
            if (equations[functionIndex][index].formula == funct) {
                solvedArray[index] = true;
                console.log("&&&&&&&&&&&&&& maaaaatch", solvedArray);

                let solvedAmount = 0;
                for (let elem in solvedArray) {
                    if (solvedArray[elem] == true) {
                        solvedAmount++;
                    }
                }
                const pointsArray = [4, 3, 2];
                if (solvedAmount - 1 + mistakesCounter < 3) {
                    pointCounter +=
                        pointsArray[solvedAmount - 1 + mistakesCounter];
                    console.log(
                        `made ${mistakesCounter} mistakes, adding ${
                            pointsArray[solvedAmount - 1 + mistakesCounter]
                        } points`
                    );
                }

                mistakesCounter = 0;

                if (solvedAmount == 3) {
                    alert("solved level uwu");
                    if (bonusPoint) pointCounter++;
                    nextLevel();
                }
            } else {
                mistakesCounter++;
                console.log("mistakes", mistakesCounter);
            }
        }
    };

    // old dragging stuffs
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
            <div id="pointBoard">Points: {pointCounter}</div>

            <div
                id="board"
                className="jxgbox"
                onDragOver={dragOver}
                onDrop={drop}
            ></div>
            <div>
                {formulas.map((i) => {
                    return (
                        <div
                            key={i}
                            className="equationDiv"
                            onMouseDown={() => handleEquationSelect(i)}
                        >
                            <Formulas formula={i} />
                        </div>
                    );
                })}
            </div>
            <button onClick={handleClick} className="invisible">
                load next
            </button>
            <button>adjust the functions</button>
            <button onClick={startGame} className="invisible">
                restart
            </button>
        </div>
    );
}
