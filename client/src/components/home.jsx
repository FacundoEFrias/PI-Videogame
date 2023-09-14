import React from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideogame } from "../action/actions";
import { Link } from "react-router-dom";
import Card from "./card";
import SearchBar from "./searchBar";
import Order from "./order";
import Filtrado from "./filtradoCreate";

import "./home.css"
import { useState } from "react";
import { Paginacion } from "./paginacion";
import images from "../images/808439.png"


export default function Home() {
    let dispatch = useDispatch()
    let allvideogame = useSelector((state) => state.videogames)
    const [pagina, setPagina] = useState(1)
    const [porPagina, setPorPagina] = useState(15)
    const indexOfUltimareceta = pagina * porPagina
    const indexOfPrimerareceta = indexOfUltimareceta - porPagina
    const currentgames = allvideogame.slice(indexOfPrimerareceta, indexOfUltimareceta)
    const maximo = allvideogame.length / porPagina

    const paginado = (numeroDePagina) => {
        setPagina(numeroDePagina)
    }

    useEffect(() => {
        dispatch(getVideogame());

    }, [dispatch])


    return (
        <div className="back">

            <br />

            <div className="refresh1">


                <div className="buttonRefresh">
                    <button onClick={() => window.location.reload()}>Refresh</button>
                </div>
                <div className="Search-Bar">
                    <SearchBar />
                </div>
                <Link style={{ textDecoration: "none" }} to="/videogames">
                    <img className="imgCreate" src={images}></img>
                    <h2 className="textColor">Create your game</h2>
                </Link>
            </div>
            <div className="padre">
                <Order setPagina={setPagina} />
                <Filtrado setPagina={setPagina} />
                

            </div>
    
                <div className="wrapper">
                {
                Array.isArray(currentgames) && currentgames.length > 0 ? (
                currentgames.map(e => (
                <Card
                    key={e.id}
                    id={e.id}
                    name={e.name}
                    image={e.image}
                    genre={e.genres}
                />
                ))
                )  : (<img className="imgError" src="https://media.tenor.com/HDBSE8gEHnIAAAAd/nintendo-gamecube-gamecube.gif" alt="Error" />
                )}
            <br />
            <div className="click">
                {
                    <Paginacion

                        porPagina={porPagina}
                        allvideogame={allvideogame.length}
                        pagina={pagina}
                        paginado={paginado}
                        setPagina={setPagina}
                        maximo={maximo}
                    />

                }
            </div>

        </div>
    )
}
