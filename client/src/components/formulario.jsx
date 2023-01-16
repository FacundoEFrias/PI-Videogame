import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useState } from "react"
import { getVideogame, FilterAllPlatforms, FilterGenre, postVideogame } from "../action/actions"
import { Link, useNavigate } from "react-router-dom"
import "./formulario.css"



export default function Formulario() {
    const dispatch = useDispatch()
    const genres = useSelector((state) => state.genre)
    const platforms1 = useSelector((state) => state.platform)
    let navigate = useNavigate()

    function controlForm(input) {
        const reg = new RegExp('/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/');
        const titleReg = new RegExp('/^[A-Z]+$', 'i');
        const released = new RegExp('/^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/](19|20)\d\d$/ ');
        let errors = {}
        if (!input.name || titleReg.test(input.name)) errors.name = 'please put the title of the game'
        if (!input.description) errors.description = 'please put the summary of the game'
        if (!input.released || released.test(input.released)) errors.released = "please put the released of the game"
        if (input.rating < 0 || input.rating > 5 || reg.test(input.rating)) errors.rating = 'put a rating between 0-5'
        return errors
    }
    const [error, setError] = useState({})
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        image: "",
        genres: [],
        platform: "",

    })

    useEffect(() => {
        dispatch(FilterGenre())
        dispatch(FilterAllPlatforms())
    }, [dispatch])

    function handleOn(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(controlForm({
            ...input,
            [e.target.name]: e.target.value
        }))

    }
    function handleSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }
    function handleSelectPlat(e) {
        setInput({
            ...input,
            platform: [...input.platform, e.target.value]
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        if (!input.name) { return alert("please put the name of the videogame") }
        if (!input.description) { return alert("please put the description of the videogame") }
        if (!input.released) { return alert("please put the released of the videogame") }
        if (!input.rating) { return alert("please put the rating of the videogame") }
        dispatch(postVideogame(input))
        dispatch(getVideogame())
        alert(`Game Created `)

        setInput({
            name: "",
            description: "",
            released: "",
            rating: 0,
            genres: [],
            platform: "",
        })
        navigate("/home")
    }
    return (
        <div className="back1">
            <Link to="/home">
                <button>Home</button>
            </Link>
            <div className="form-div">
                <div className="form-div1 ">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label className="label1">
                            Name:
                            <input className="Input1"
                                onChange={(e) => handleOn(e)}
                                type="text"
                                placeholder="...Name"
                                name="name"
                                value={input.name} />
                            {error.name && (
                                <p className="error">{error.name}</p>
                            )}
                        </label>

                        <label className="label1">
                            Description:
                        </label>

                        <input className="Input1"
                            onChange={(e) => handleOn(e)}
                            type="text"
                            name="description"
                            placeholder="...Description"
                            value={input.description} />
                        {error.description && (
                            <p className="error">{error.description}</p>
                        )}
                        <label className="label1">Imagen-Url</label>
                        <input className="Input1"
                            onChange={(e) => handleOn(e)}
                            type="text"
                            name="image"
                            placeholder="...Image"
                            value={input.image} />
                        <div className="centerdiv">
                            <label className="label1">
                                Released:
                            </label>

                            <input className="date"
                                onChange={(e) => handleOn(e)}
                                type="date"
                                name="released"
                                placeholder="dd/mm/aaaa"
                                value={input.released} />
                            {error.released && (
                                <p className="error">{error.released}</p>
                            )}



                            <label className="label1">
                                Rating:
                            </label>
                            <input className="date"
                                onChange={(e) => handleOn(e)}
                                type="number"
                                name="rating"
                                step={0.25}
                                placeholder="0.25"
                                value={input.rating} />
                            {error.rating && (
                                <p className="error">{error.rating}</p>)}
                        </div>

                        <div className="centerGP">
                            <label className="label1">
                                Genres:
                            </label>
                            <label className="label1">
                                Platforms:
                            </label>
                        </div>
                        <div className="centergp">
                            <div className="genresInput" onChange={(e) => handleSelect(e)}>
                                {genres.map((gen) => (
                                    <div key={gen.name}>
                                        <input
                                            type="checkbox"
                                            name="genres"
                                            value={gen.name}
                                        ></input>
                                        <label name={gen}>{gen.name}</label>
                                    </div>))}
                            </div>



                            <div className="genresInput" onChange={(e) => handleSelectPlat(e)} >
                                {platforms1.map((plat) => (
                                    <div key={plat}>
                                        <input
                                            type="checkbox"
                                            name="platforms"
                                            value={plat}

                                        ></input>
                                        <label name={plat} className>{plat}</label>
                                    </div>
                                ))}

                            </div>
                        </div>

                        {error.hasOwnProperty("name") || error.hasOwnProperty("description") || error.hasOwnProperty("released") || error.hasOwnProperty("rating") ? <p className="error1">Enter all required inputs</p> : <button type='submit' > Create your game</button>}


                    </form>
                </div>
            </div>
        </div >
    )
}