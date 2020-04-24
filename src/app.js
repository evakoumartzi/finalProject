import React from "react";
import Board from "./board"; //i dont have to write.js!
import Formulas from "./formulas.js";
// import Formulas2 from "./formulas2";

import { BrowserRouter, Route } from "react-router-dom";
export default function App() {
    //     useEffect(() => {

    //     }, []);

    // handleChange{

    // }
    let form1 = `f(x) = \\int_{-\\infty}^\\infty
     \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`;
    return (
        <BrowserRouter>
            <Route
                exact
                path="/"
                render={() => (
                    <div id="app">
                        <Board />
                        {/* <Formulas formula={form1} /> */}
                    </div>
                )}
            />
        </BrowserRouter>
    );
}
