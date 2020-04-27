import React from "react";
let board;

export default function Adjust() {
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

    function parabola() {
        boardInit();
        var a = board.create("slider", [-7, 7], { name: "a" });
        var b = board.create("slider", [-7, 7], { name: "b" });

        var c = board.create(
            "curve",
            [
                function (phi) {
                    return a.Value() * JXG.Math.pow(x, 2) + b.Value();
                },
                [0, 0],
                0,
                8 * Math.PI,
            ],
            { curveType: "conic", strokewidth: 4 }
        );
        var g = board.create("glider", [c]);
        var t = board.create("tangent", [g], {
            dash: 2,
            strokeColor: "#a612a9",
        });
    }

    return (
        <div>
            <button onClick={parabola}>parabola</button>
            {/* <button onClick={straightLine}>straight line</button>  */}
            <div id="board" className="jxgbox"></div>
        </div>
    );
}
