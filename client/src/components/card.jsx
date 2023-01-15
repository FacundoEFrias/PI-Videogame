import React from "react"
import { Link } from "react-router-dom";
import "./card.css"




export default function Card({ id, name, image, genre, rating }) {



    return (
        <div className="card">

            <div className="container">
                <Link className="Link" to={`${id}`}>
                    <img className="imgCard" src={image} alt="Imagen" />
                    <h2 style={{ color: "black" }}>{name}</h2>
                    <h3>{rating}</h3>
                    <h4 style={{ color: "black" }}>{genre}</h4>

                </Link>

            </div>



        </div >
    );
};
