import React from "react"
import { Link } from "react-router-dom";
import "./card.css"
import descriptionImage from "../images/description.jpg"



export default function Card({ id, name, image, genre, rating }) {



    return (
        <div className="card">


            <Link className="Link" to={`${id}`}>
                <img className="imgCard" src={image ? image : descriptionImage} alt="Imagen" />
                <h2 style={{ color: "black" }}>{name}</h2>
                <h3>{rating}</h3>
                <h4 style={{ color: "red" }}>{genre}</h4>
            </Link>





        </div >
    );
};
