import {GENRE,GET_ALL, ID, SEARCH_ALL, SORT, ALL_GENRE, CREADOS, ALL_PlATFORMS} from "../action/actions.js"
import { Todos } from "../constantes/FiltradoGenre.js";
import {ASC,DESC,RATING, RATINGDESC} from "../constantes/Order.js"
import {ALL,API} from "../constantes/Filtrado.js"


const initialState ={
    videogame: [],
    videogames: [],
    videoDetail: [],
    genre: [],
    platform:[],
    filters: {}
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case  GET_ALL:
            return {
                ...state,
                videogame: action.payload,
                videogames: action.payload

            }
            
            case  SEARCH_ALL:
                if(typeof action.payload === "string"){
                    alert("No games found")
                    return {...state}
                }
                 return {
                    ...state,
                    videogames: action.payload
                }
            case SORT:
              let sortName = [...state.videogame]
              if(action.payload === ASC){
                  sortName.sort((a,b)=>{
                      if(a.name > b.name){
                          return 1
                      }
                      if(b.name> a.name){
                          return -1
                      }
                      return 0
                  })}
                if(action.payload === DESC){
                    sortName.sort((a,b)=>{
                        if(a.name > b.name){
                            return -1
                        }
                        if(b.name> a.name){
                            return 1
                        }
                        return 0
                    })
                } if(action.payload === RATING){
                    sortName.sort((a,b)=> {
                        if(a.rating > b.rating){
                            return -1
                        }
                        if(b.rating > a.rating){
                            return 1
                        }
                        return 0
                    })
                }
                else if(action.payload === RATINGDESC){
                    sortName.sort((a,b)=>{
                        if(a.rating > b.rating){
                            return 1
                        }
                        if(b.rating > a.rating){
                            return -1
                        }
                        return 0
                    })}
                return {
                    ...state,
                    videogames:sortName
                }

              
                             
                   
                case ALL_GENRE:
                    let AllGenre = [...state.videogame]
                    const filterGenre = action.payload
                    const filteredByGenres = filterGenre === Todos ? AllGenre : AllGenre.filter(game => game.genres.includes(filterGenre));
                    const filteredByOrigin = filterGenre === API ? AllGenre.filter(game => game.origin === API) : AllGenre.filter(game => !game.origin);
                    const filteredByOriginAll = filterGenre === ALL ? AllGenre : filteredByOrigin;
                    const filterAz = filterGenre === ASC ? AllGenre.sort((a, b) => a.name.localeCompare(b.name)) : AllGenre;
                    const filterZa = filterGenre === DESC ? AllGenre.sort((a,b)=> b.name.localeCompare(a.name)) : AllGenre
                    const filterRating = filterGenre === RATING ? AllGenre.sort((a,b)=> b.rating - a.rating) : AllGenre;
                    const filterRatingDes = filterGenre === RATINGDESC ? AllGenre.sort((a,b)=> a.rating - b.rating) : AllGenre;
                     return {
                            ...state,
                        videogames: filteredByGenres.concat(filteredByOrigin, filteredByOriginAll, filterAz,filterZa,filterRating,filterRatingDes)
                         };
                case GENRE:
                    return {
                         ...state,
                        genre: action.payload
                        }
                case ID:
                    return {
                        ...state,
                        videoDetail: action.payload,
                    }
                case CREADOS:
                    let Creado = [...state.videogame]
                    let FilterCreados = action.payload === API ? Creado.filter(e=> e.origin === API): Creado.filter(e=>!e.origin)

                    return {
                        ...state,
                        videogames: action.payload === ALL ? Creado : FilterCreados
                    }
                case "POST":
                    return {
                        ...state
                    }
                case ALL_PlATFORMS:
                    return {
                        ...state,
                        platform: action.payload
                    }
                case 'CLEAR_STATE':
                    return{
                         ...state,
                          videoDetail: []
                         }
                  
            default:
                return state
    }
};

export default rootReducer;
