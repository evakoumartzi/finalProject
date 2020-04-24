import React from "react";
// import { Link } from "react-router-dom";

export default function Welcome() {
    return (
        <div>
            <h1>Welcome!</h1>
            {/* <Link to={"/"} key={user.id}>
                <h2>Let's go</h2>
            </Link> */}
            <a href="/">
                <h2>Show me the functions!</h2>
            </a>
        </div>
    );
}
