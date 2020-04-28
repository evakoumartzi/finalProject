import React, { useState, useEffect } from "react";
import equations from "./equationPool.json";
import Formulas from "./formulas.js";
import FinalModal from "./finalModal.js";

let levelIndex;
let graphPicked, formulaPicked;
let pointCounter, mistakesCounter, bonusPoint;
const levelAmount = 9;
let formArray = [];
let formulasDivs = document.querySelectorAll(".formulasDivs");
console.log("formulasDivs", formulasDivs);
export default function Board() {
    const [formulas, setFormulas] = useState([]);
    // const [formulaPicked, setFormulaPicked] = useState([]);
    let [points, setPoints] = useState([]);

    // const [showNext, setShowNext] = useState(false);
    const [showFinal, setShowFinal] = useState(false);
    let board;
    let plots = [];
    let graphColorArray = ["darkgreen", "limegreen", "greenyellow"];
    let functionColorArray = ["purple", "green", "pink", "blue"];
    let functionColorKey = ["#5326d9", "#00ff99", "#cc33cc", "#0099ff"];
    let solvedArray = [];

    useEffect(() => {
        startGame();
        var formulasDivs = document.querySelectorAll(".formulasDivs");
        console.log("formulasDivs", formulasDivs);
    }, []);

    useEffect(() => {
        formArray = formulas;
    }, [formulas]);

    // useEffect(() => {
    //     console.log("hook running");

    //     // setPoints(pointCounter);
    // }, [pointCounter]);

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    function startGame() {
        pointCounter = 0;
        mistakesCounter = 0;
        bonusPoint = true;
        levelIndex = 0;
        // graphColorArray = shuffle(["#0000FF", "#0099FF", "#00FF99"]);
        solvedArray = [false, false, false];

        boardInit();
        loadFunctions(levelIndex);
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
            boundingbox: [-8, 8, 8, -8],
            showFullscreen: true,
        });
    }

    function loadFunctions(index) {
        boardInit();
        let functionArray = equations[index];
        let formulaArray = [];

        // console.log("fArray", functionArray, "fIndex", levelIndex);
        for (let x in functionArray) {
            // console.log("graph", functionArray[x].graph);
            if (functionArray[x].graph != "") {
                if (plots[x]) plots[x].remove();
                plots[x] = board.create(
                    "functiongraph",
                    [functionArray[x].graph],
                    {
                        withLabel: false,
                        strokeColor: graphColorArray[x],
                        strokeWidth: 5,

                        name: `${functionArray[x]}`,
                    }
                );
                //choose function
                plots[x].off();

                plots[x].on("mousedown", function () {
                    if (formulaPicked) {
                        graphPicked = graphColorArray[x];
                        checkMatch(graphPicked, formulaPicked);
                        // console.log("clicked", graphPicked);
                    }
                });
            }
            formulaArray.push(functionArray[x].formula);
        }
        setFormulas(shuffle(formulaArray));
    }

    function nextLevel() {
        if (levelIndex < levelAmount) {
            mistakesCounter = 0;
            bonusPoint = true;
            levelIndex++;
            graphColorArray = shuffle(["darkgreen", "limegreen", "lawngreen"]);
            solvedArray = [false, false, false];
            loadFunctions(levelIndex);
        } else {
            setShowFinal(true);
        }
    }

    const checkMatch = (graph, funct) => {
        const graphIndex = graphColorArray.findIndex(
            (element) => element == graph
        );
        const formulaIndex = formArray.findIndex((element) => element == funct);
        console.log(
            "indeeex",
            graphIndex,
            solvedArray[graphIndex],
            "form index&color",
            formulaIndex,
            "funct",
            funct,
            functionColorArray[formulaIndex]
        );
        if (solvedArray[graphIndex] == false) {
            //MATCH
            if (equations[levelIndex][graphIndex].formula == funct) {
                solvedArray[graphIndex] = true;
                console.log("match!", solvedArray);

                let solvedAmount = 0;
                for (let elem in solvedArray) {
                    if (solvedArray[elem] == true) {
                        solvedAmount++;
                    }
                }

                //POINT SYSTEM
                const pointsArray = [4, 3, 2];
                if (solvedAmount - 1 + mistakesCounter < 3) {
                    pointCounter +=
                        pointsArray[solvedAmount - 1 + mistakesCounter];
                    console.log(
                        `made ${mistakesCounter} mistakes, adding ${
                            pointsArray[solvedAmount - 1 + mistakesCounter]
                        } points`
                    );
                    // console.log("pointCounter", pointCounter);
                    setPoints(pointCounter);
                }
                plots[graphIndex].setAttribute({
                    strokeColor: functionColorKey[formulaIndex],
                });

                mistakesCounter = 0;

                console.log("solvedAmount:", solvedAmount);
                // END GAME
                if (solvedAmount == 3) {
                    if (bonusPoint) {
                        console.log("awarding bonus point", pointCounter, "+1");
                        pointCounter++;
                    }
                    if (levelIndex < levelAmount) {
                        nextLevel();
                    } else {
                        setShowFinal(true);
                    }
                }
            } else {
                mistakesCounter++;
                graphPicked = null;
                formulaPicked = null;
                console.log("mistakes", mistakesCounter);
            }
        }
    };

    const handleClick = () => {
        nextLevel();
    };

    const handleEquationSelect = (eq) => {
        console.log(eq);
        formulaPicked = eq;
    };

    return (
        <div id="main">
            {showFinal && <FinalModal points={pointCounter} />}
            {/* <div id="progressBar">
                <div id="progress"></div>
            </div> */}

            <div id="board" className="jxgbox"></div>

            <div id="rightSide">
                <div id="levelPoints">
                    <h1 id="levelHeader">LEVEL &nbsp;{levelIndex + 1} </h1>
                    {points == 0 && (
                        <div id="pointBoard">
                            <h2 id="points">points:&nbsp;&nbsp;</h2>
                            <div id="pointcounter"> 0</div>
                        </div>
                    )}
                    {points != 0 && (
                        <div id="pointBoard">
                            <h2 id="points">points:&nbsp;&nbsp;</h2>
                            <div id="pointcounter">{points}</div>
                        </div>
                    )}
                </div>
                <div id="formulasContainer">
                    {formulas.map((i, index) => {
                        return (
                            <div
                                key={i}
                                className={`formulasDivs disable-selection ${
                                    functionColorArray[index]
                                } ${formulaPicked == i ? "active" : ""}`}
                                onMouseDown={() => handleEquationSelect(i)}
                            >
                                <Formulas formula={i} />
                            </div>
                        );
                    })}
                    <button onClick={handleClick} className="invisible">
                        admin load next
                    </button>
                </div>
            </div>
        </div>
    );
}
