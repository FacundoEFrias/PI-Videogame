import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ClearState, videogameDetail } from "../action/actions";
import { useParams } from "react-router-dom";
import "./videoDetails.css"
import descriptionImage from "../images/description.jpg"



export default function VideoDetail() {
    let dispatch = useDispatch()
    const { id } = useParams()


    useEffect(() => {
        dispatch(videogameDetail(id));
        return () => {
            dispatch(ClearState());
        }
    }, [dispatch, id])



    let videoDetail = useSelector((state) => state.videoDetail)


    return (
        <div className="backDetail">
            <div className="contenedor">
                <Link to="/home">
                    <button >Home</button>
                </Link>

                <div className="contenedor2">

                    <h2>{videoDetail.name} </h2>

                    <img className="img" src={videoDetail.image ? videoDetail.image : descriptionImage} alt="Imagen" width="200px" height="250px" />
                    <h3 className="title">{videoDetail.description}</h3>
                    <h4 className="genres">{videoDetail.genres ? videoDetail.genres : "Genres not found"}</h4>
                    <h5 className="platforms">{videoDetail.platforms}</h5>
                    <h4 className="rating">{videoDetail.rating}</h4>
                    <h4 className="released">{videoDetail.released}</h4>

                </div>
            </div>
        </div>
    );
}