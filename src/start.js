import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    // console.log("rendering app");
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("#root"));
