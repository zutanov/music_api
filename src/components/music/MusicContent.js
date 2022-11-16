import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import spin from '../../assets/images/spin.svg' 
import store from "../../store/store";
import { addToPlaylist } from "../../store/actionCreators/playlist";

export const MusicContent= () => {
    const [track, setTrack] = useState([])
    const [genre, setGenre] = useState([])
    const [load, setLoad] = useState(false)
    const {id, albumId} = useParams()
    
    const getTrack = async() => {
        const {data} = await axios(`https://api.napster.com/v2.1/tracks/${id}?apikey=MzdkNDhiZjgtNGYxYS00YTZiLWFiMTAtMDE4YTEzZDMzYTU5`)
        setTrack(data?.tracks[0])
        console.log(data?.tracks[0])
    }

    const getGenreTracks = async() => {
        const {data} = await axios(`https://api.napster.com/v2.1/genres/${track?.links?.genres?.ids[0]}/tracks/top?apikey=MzdkNDhiZjgtNGYxYS00YTZiLWFiMTAtMDE4YTEzZDMzYTU5&limit=20`)
        setGenre(data?.tracks)
        console.log(data?.tracks)
    }

    const handleClick = (track) => {
        store.dispatch(addToPlaylist(track))
    }

    useEffect(() => {
        getTrack()
        setTimeout(() => {
            setLoad(true)
        },1000)
    },[])

    useEffect(() => {
        getGenreTracks()
    },[track])

    const imageURL = `https://api.napster.com/imageserver/v2/albums/${track?.albumId}/images/500x500.jpg`
    
    if (!load)      {
       return <div className="spin">
            <img src={spin} alt='load'/>
        </div>
    } 
        else {
    return (
        <section className="music-content">
            <div className="container grid music-content__grid">
                <div className="music-content__bg">
                    <div className="image" style={{background: `url(${imageURL}) no-repeat center/cover`}}>
                    </div>
                    <div className="music-content__img">
                        <img src={imageURL} alt='image'/>
                     </div>
                </div>
                   <div className="music-content__info">
                   <Link to={`/artistContent/${track?.artistId}`}>
                        <h4 className="section__title">Artistname: {track?.artistName}</h4> 
                    </Link> 
                   <Link to={`/albumContent/${track?.albumId}`}>
                        <h4 className="section__title">Album: {track?.albumName}</h4>
                   </Link>   
                        <h4 className="section__title">Track: {track?.name}</h4>  
                    <audio controls autoPlay loop className="music-content__audio">
                        <source src={track?.previewURL} type="audio/mpeg"/>
                    </audio>

                    

                    </div> 
            </div>

            <div className="container">
                    <h2 className="section__title album-content__title">Genre's top tracks</h2>
                    { 
                    genre?.map( (el, idx) => (
                    <div key={idx} className="album-content__tracks" >
                        <div className="grid album-content__grid-template ">
                            <div className="album-content__albumImg">
                                <img src={`https://api.napster.com/imageserver/v2/albums/${el?.albumId}/images/70x70.jpg`} alt=""/>
                            </div>
                            <div className="album-content__descinfo">
                                <h3 className="album-content__track">{el?.name}</h3>
                                <Link to={`/albumContent/${el.albumId}`}>
                                <p className="album-content__album">{el?.albumName}</p>
                                </Link>
                                <audio data-track-id={el?.id} preload="none" controls className="album-content__audio">
                                    <source src={el?.previewURL} type="audio/mpeg"/>
                                </audio>
                            </div>
                            <div className="album-content__playlist">
                                <button onClick={() => {
                                    handleClick(el)
                                }} className="album-content__btn">Add to playlist</button>
                           </div>

                        </div>
                    </div>
                ))
                }
                </div>
        </section>
    )
}
}