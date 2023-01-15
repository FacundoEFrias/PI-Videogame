import { useDispatch } from "react-redux"
import { filtrarCreados } from "../action/actions.js"
import { ALL, DB, API } from "../constantes/Filtrado.js"


export default function Filtrado() {
    const dispatch = useDispatch()
    function onSelectChange(e) {
        dispatch(filtrarCreados(e.target.value))

    }
    return <div className="select">
        <select name="select" onChange={(e) => onSelectChange(e)}>
            <option value={ALL}>Juegos</option>
            <option value={DB}>Juegos BaseDatos</option>
            <option value={API}>Juegos Api</option>
        </select>
    </div>

}