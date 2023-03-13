import { useDispatch } from "react-redux"
import { filtrarCreados } from "../action/actions.js"
import { ALL, DB, API } from "../constantes/Filtrado.js"


export default function Filtrado({ setPagina }) {
    const dispatch = useDispatch()
    function onSelectChange(e) {
        dispatch(filtrarCreados(e.target.value))
        setPagina(1)

    }
    return <div className="select">
        <select name="select" onChange={(e) => onSelectChange(e)}>
            <option value={ALL}>All Game</option>
            <option value={DB}>Games Database</option>
            <option value={API}>Games Api</option>
        </select>
    </div>

}