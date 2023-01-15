import React from 'react';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getSearchBar } from "../action/actions";
import "./searchBar.css"

export default function SearchBar() {

    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getSearchBar(search))
        setSearch("")
    }
    function onInputChange(e) {
        e.preventDefault()
        setSearch(e.target.value)


    }

    return <div className='Search-Bar'>
        <form className="search-container " onSubmit={handleSubmit} >

            <input className='input' type="text" onChange={(e) => onInputChange(e)} placeholder="Buscar..." value={search} ></input>
            <input className="search-container-Input" type="submit" value="Buscar" />
        </form>


    </div>
}