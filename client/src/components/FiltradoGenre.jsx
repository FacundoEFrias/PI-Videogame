import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { FilterAllGenre, FilterGenre } from "../action/actions.js"
import { Todos } from "../constantes/FiltradoGenre.js"
import "./filtradoGenre.css"






export default function FiltradoGenre({ setPagina }) {
    const dispatch = useDispatch()
    const allGenre = useSelector((state) => state.genre)


    

    function onSelectChange(e) {
        dispatch(FilterAllGenre(e.target.value))
        setPagina(1)
    }


 return (
      <div className='select'>
        
          <select name="select" onChange={(e) => onSelectChange(e)}>
            <option value={Todos}>All</option>
        
          </select>
        
      </div>
    );

