import {GENRE,GET_ALL, ID, SEARCH_ALL, SORT, ALL_GENRE, CREADOS, ALL_PlATFORMS} from "../action/actions.js"
import { Todos } from "../constantes/FiltradoGenre.js";
import {ASC,DESC,RATING} from "../constantes/Order.js"
import {ALL,API} from "../constantes/Filtrado.js"


const initialState ={
    videogame: [],
    videogames: [],
    videoDetail: [],
    genre: [],
    platform:[]
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case  GET_ALL:
            return {
                ...state,
                videogame: action.payload,
                videogames: action.payload

            }
            //se utiliza typeof para saber si se encontro o no
            case  SEARCH_ALL:
                if(typeof action.payload === "string"){
                    alert("Not found the game")
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
                } else if(action.payload === RATING){
                    sortName.sort((a,b)=> {
                        if(a.rating > b.rating){
                            return -1
                        }
                        if(b.rating> a.rating){
                            return 1
                        }
                        return 0
                    })
                }
                return {
                    ...state,
                    videogames:sortName
                }

              
                             
                   
                case ALL_GENRE:
                    let AllGenre = [...state.videogame]
                    let FilterGenre = action.payload === Todos ? AllGenre : AllGenre.filter(x => x.genres.includes(action.payload))
                    if(FilterGenre.length === 0){
                        alert(`No games found with that genre ${action.payload} `)
                        return state
                    }
                    return {
                        ...state,
                        videogames: FilterGenre
                        
                    }
                    case GENRE:
                        return {
                            ...state,
                            genre: action.payload
                        }
                case ID:
                    return {
                        ...state,
                        videoDetail: action.payload
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
                    
                  
            default:
                return state
    }
};

export default rootReducer;