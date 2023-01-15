import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { videogameDetail } from "../action/actions";
import { useParams } from "react-router-dom";
import "./videoDetails.css"



export default function VideoDetail() {
    let dispatch = useDispatch()
    const { id } = useParams()


    useEffect(() => {
        dispatch(videogameDetail(id));

    }, [dispatch])



    let videoDetail = useSelector((state) => state.videoDetail)


    return (
        <div className="backDetail">
            <div className="contenedor">
                <Link to="/home">
                    <button >Home</button>


                </Link>
                <div className="contenedor2">

                    <h2>{videoDetail.name} Details</h2>

                    <img className="img" src={videoDetail.image} alt="Imagen" width="200px" height="250px" />
                    <h3 className="title">{videoDetail.description}</h3>
                    <h4 className="genres">{videoDetail.genres}</h4>
                    <h5 className="platforms">{videoDetail.platforms}</h5>
                    <h4 className="rating">{videoDetail.rating}</h4>
                    <h4 className="released">{videoDetail.released}</h4>

                </div>
            </div>
        </div>
    );
}