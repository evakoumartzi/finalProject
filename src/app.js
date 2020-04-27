import React from "react";
import Board from "./board"; //i dont have to write.js!
import FamousEquations from "./famousEquations.js";
import Adjust from "./adjust.js";

import { BrowserRouter, Route } from "react-router-dom";
export default function App() {
    return (
        <BrowserRouter>
            <Route
                exact
                path="/"
                render={() => (
                    <div id="app">
                        <Board />
                    </div>
                )}
            />
            <Route
                path="/adjust"
                render={() => (
                    <div id="adjust">
                        <Adjust />
                    </div>
                )}
            />
            <Route
                path="/hallOfFame"
                render={() => (
                    <div id="famousEquations">
                        <FamousEquations />
                    </div>
                )}
            />
        </BrowserRouter>
    );
}
