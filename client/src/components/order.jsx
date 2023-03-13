import { useDispatch } from "react-redux"

import { Acomodar } from "../action/actions.js"
import { ASC, DESC, RATING, RATINGDESC } from "../constantes/Order.js"
import "./order.css"




export default function Order({ setPagina }) {
    const dispatch = useDispatch()


    function onSort(e) {
        dispatch(Acomodar(e.target.value))
        setPagina(1)
    }




    return <div className="select">
        <select onChange={(e) => onSort(e)} >
            <option value={ASC}>A-Z</option>
            <option value={DESC}>Z-A</option>
            <option value={RATING}>RATING ↑</option>
            <option value={RATINGDESC}>RATING ↓ </option>
        </select>
    </div>

}