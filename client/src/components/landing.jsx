import React from "react";
import { Link } from "react-router-dom";
import "./landing.css"

export default function Landing() {
    return (

        <div className="back3">

            <h1 className="text">Find the best</h1>
            <h2 className="text">Games</h2>
            <Link to="/home">
                <button className="button">Open</button>
            </Link>

        </div >

    )
}