import React from "react";
let board;

export default function FamousEquations() {
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

    function logarithmicSpiral() {
        boardInit();
        var a = board.create(
            "slider",
            [
                [1, -1],
                [5, -1],
                [0, 0.3, 1],
            ],
            { name: "a" }
        );
        var b = board.create(
            "slider",
            [
                [1, -2],
                [5, -2],
                [-1, 0.15, 1],
            ],
            { name: "b" }
        );
        var c = board.create(
            "curve",
            [
                function (phi) {
                    return a.Value() * JXG.Math.pow(Math.E, b.Value() * phi);
                },
                [0, 0],
                0,
                8 * Math.PI,
            ],
            { curveType: "polar", strokewidth: 4 }
        );
        var g = board.create("glider", [c]);
        var t = board.create("tangent", [g], {
            dash: 2,
            strokeColor: "#a612a9",
        });
    }

    function devilsCurve() {
        boardInit();
        var a = board.create(
            "slider",
            [
                [1, -1],
                [5, -1],
                [0, 0.3, 1],
            ],
            { name: "a" }
        );
        var b = board.create(
            "slider",
            [
                [1, -2],
                [5, -2],
                [-1, 0.15, 1],
            ],
            { name: "b" }
        );
        var c = board.create(
            "curve",
            [
                function (phi) {
                    return a.Value() * JXG.Math.pow(Math.E, b.Value() * phi);
                },
                [0, 0],
                0,
                8 * Math.PI,
            ],
            { curveType: "polar", strokewidth: 4 }
        );
        var g = board.create("glider", [c]);
        var t = board.create("tangent", [g], {
            dash: 2,
            strokeColor: "#a612a9",
        });
    }

    return (
        <div>
            <button onClick={logarithmicSpiral}>Logarithmic spiral</button>
            <button onClick={devilsCurve}>Logarithmic spiral</button>
            <div id="board" className="jxgbox"></div>
        </div>
    );
}
