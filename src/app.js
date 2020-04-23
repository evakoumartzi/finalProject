import React, { useState, useEffect } from "react";
import Board from "./board"; //i dont have to write.js!
import Formulas from "./formulas.js";
import { BrowserRouter, Route } from "react-router-dom";

export default function App() {
    //     useEffect(() => {

    //     }, []);

    // handleChange{

    // }
    return (
        <BrowserRouter>
            <Route
                exact
                path="/"
                render={() => (
                    <div>
                        <Board />
                        {/* <Formulas /> */}
                        {/* {Formulas} */}
                        {/* <button onClick={handleChange}>next</button> */}
                    </div>
                )}
            />
        </BrowserRouter>
    );
}
