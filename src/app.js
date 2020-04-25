import React from "react";
import Board from "./board"; //i dont have to write.js!
import Formulas from "./formulas.js";
// import Formulas2 from "./formulas2";

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
        </BrowserRouter>
    );
}
