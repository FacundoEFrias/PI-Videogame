import axios from "axios";

export const GET_ALL = "GET_ALL"
export const SEARCH_ALL = "SEARCH_ALL"
export const SORT = "SORT"
export const ID = "ID"
export const GENRE = "GENRE"
export const ALL_GENRE = "ALL_GENRE"
export const CREADOS = "CREADOS"
export const ALL_PlATFORMS = "ALL_PlATFORMS"

export function getVideogame() {
    return function(dispatch){
        axios.get("http://localhost:3001/api/videogame/")
        .then((videogame) => {
            dispatch({ type: GET_ALL, 
                        payload: videogame.data });
          })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function getSearchBar(search){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/videogame?name=${search}`)
        .then((videogame) => {
            dispatch({ type: SEARCH_ALL, 
                        payload: videogame.data });
          })
        .catch((error) => {
           
        })
    }
}

export function Acomodar(payload){
    return {
        type: ALL_GENRE,
        payload
    }

}

export function FilterGenre(){
    return function(dispatch){
        axios.get("http://localhost:3001/api/genre")
        .then((videogame) => {
            dispatch({ type: GENRE, 
                        payload: videogame.data });
          })
        .catch((error) => {
            console.log(error)
        })
    }
}

export function FilterAllGenre(payload){
    return {
        type: ALL_GENRE,
        payload
    }
}

export function videogameDetail(id){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/videogame/${id}`)
        .then((videogame) => {
            dispatch({ type: ID, 
                        payload: videogame.data });
          })
        .catch((error) => {
            console.log(error)
        })
}}

export function filtrarCreados(payload){
    return {
        type: ALL_GENRE,
        payload
    }
}
export function postVideogame(payload){
    return async function(dispatch){
       const respon = axios.post(`http://localhost:3001/api/post/`, payload)
        return respon
        .catch((error) => {
            console.log(error)
        })
}}

export function FilterAllPlatforms(payload){
    return function(dispatch){
        axios.get(`http://localhost:3001/api/platforms/`)
        .then((videogame) => {
            dispatch({ type: ALL_PlATFORMS, 
                        payload: videogame.data });
          })
        .catch((error) => {
            console.log(error)
        })
    }}

export function ClearState () {
    return {
  type: 'CLEAR_STATE'
}}