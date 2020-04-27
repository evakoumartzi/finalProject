import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FinalModal(pointCounter = pointCounter) {
    let [highScores, setHighScores] = useState([]);
    let [name, setName] = useState([]);
    let [scoresList, showScoresList] = useState(false);
    let [inputField, showInputField] = useState(true);
    let highScoresAreVisible = false;
    let inputFieldIsVisible = true;

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`/highScores`);

                setHighScores(data);
            } catch (err) {
                console.log("error in highScores", err);
            }
        })();
        console.log(pointCounter);
    }, []);
    console.log("highScores", highScores);

    let nameBuffer;
    useEffect(() => {
        nameBuffer = name;
    }, [name]);

    function submit() {
        (async () => {
            try {
                console.log("submit", pointCounter.points, name);
                // name: nameBuffer,
                const { data } = await axios.post(
                    `/newScore/${name}/${pointCounter.points}`
                );
                // submit("submit2", data);
                console.log("data", data);
                setHighScores(data);
                showScoresList(true);
                showInputField(false);
                // highScoresAreVisible = true;
                // inputFieldIsVisible = false;
            } catch (err) {
                console.log("error in new score client", err);
            }
        })();
    }

    function handleChange({ target }) {
        setName(target.value);
        console.log("name", name);
    }

    return (
        <div id="finalModal">
            <h4> You are {pointCounter.points}% math genious!</h4>
            {inputField && (
                <div id="addName">
                    <input
                        onChange={handleChange}
                        placeholder="add your name here"
                    ></input>
                    <button onClick={submit}>add</button>
                </div>
            )}

            {scoresList && (
                <div id="scoreBoard">
                    {highScores.map((score) => {
                        return (
                            // <div className="scoreBoard">
                            <h3
                                key={`${score.name}_${score.score}`}
                                className="highScores"
                            >
                                {score.name}: {score.score}
                            </h3>
                            // </div>
                        );
                    })}
                </div>
            )}

            {/* <button onClick={startGame}>restart</button> */}
            <button>
                <a href="/hallOfFame" className="link">
                    famous equations fever
                </a>
            </button>
            <button>
                <a href="/adjust" className="link">
                    equation fever
                </a>
            </button>
        </div>
    );
}
