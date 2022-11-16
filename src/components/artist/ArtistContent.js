import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import spin from '../../assets/images/spin.svg' 
import store from "../../store/store";
import { addToPlaylist } from "../../store/actionCreators/playlist";

export const ArtistContent= () => {
    const [artist, setArtist] = useState([])
    const [tracks, setTracks] = useState([])
    const [load, setLoad] = useState(false)
    const {id} = useParams()
    
    const getArtist = async() => {
        const {data} = await axios(`https://api.napster.com/v2.1/artists/${id}?apikey=MzdkNDhiZjgtNGYxYS00YTZiLWFiMTAtMDE4YTEzZDMzYTU5`)
        setArtist(data?.artists[0])
        console.log(data?.artists)
    }

    const getArtistTracks = async() => {
        const {data} = await axios(`https://api.napster.com/v2.1/artists/${id}/tracks/top?apikey=MzdkNDhiZjgtNGYxYS00YTZiLWFiMTAtMDE4YTEzZDMzYTU5&limit=15`)
        setTracks(data?.tracks)
        console.log(data?.tracks)
    }

    const handleClick = (track) => {
        store.dispatch(addToPlaylist(track))
    }

    useEffect(() => {
        getArtist()
        getArtistTracks()
        setTimeout(() => {
            setLoad(true)
        },1000)
    },[id])

    const imageURL = `https://api.napster.com/imageserver/v2/artists/${artist?.id}/images/500x500.jpg`
    
    if (!load)      {
       return <div className="spin">
            <img src={spin} alt='load'/>
        </div>
    } 
        else {
    return (
        <section className="album-content">
            <div className="container grid album-content__grid">
                <div className="album-content__bg">
                    <div className="image" style={{background: `url(${imageURL}) no-repeat center/cover`}}>
                    </div>
                    <div className="album-content__img">
                        <img src={imageURL} alt='image'/>
                     </div>
                </div>
                   <div className="album-content__info">
                    <h2 className="album-content__title">{artist?.name}</h2>   
                    <h4 className="album-content__desc">{artist?.bios?.[0].bio} </h4>  
                    </div> 
            </div>
            <div className="container">
                    <h2 className="section__title album-content__title">Artist's top tracks</h2>
                    { tracks?.map( (el, idx) => (
                    <div key={idx} className="album-content__tracks" >
                        <div className="grid album-content__grid-template ">
                            <div className="album-content__albumImg">
                                <img src={`https://api.napster.com/imageserver/v2/albums/${el?.albumId}/images/70x70.jpg`} alt=""/>
                            </div>
                            <div className="album-content__descinfo">
                                <Link to={`/musicContent/${el?.id}`}>
                                <h3 className="album-content__track">{el?.name}</h3>
                                </Link>
                                <Link to={`/albumContent/${el?.albumId}`}>
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