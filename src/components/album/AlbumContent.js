import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import spin from '../../assets/images/spin.svg' 
import { addToPlaylist } from "../../store/actionCreators/playlist";
import store from "../../store/store";

export const AlbumContent= () => {
    const [album, setAlbum] = useState([])
    const [tracks, setTracks] = useState([])
    const [load, setLoad] = useState(false)
    const {id} = useParams()
    const playlist = useSelector(store => store?.playlistReducer?.playlist)

    const getAlbum = async() => {
        const {data} = await axios(`https://api.napster.com/v2.1/albums/${id}?apikey=MzdkNDhiZjgtNGYxYS00YTZiLWFiMTAtMDE4YTEzZDMzYTU5`)
        setAlbum(data?.albums[0])
        console.log(data?.albums)
    }

    const handleClick = (track) => {
        store.dispatch(addToPlaylist(track))
        console.log(playlist)
    }

    const getAlbumTracks = async() => {
        const {data} = await axios(`https://api.napster.com/v2.1/albums/${id}/tracks?apikey=MzdkNDhiZjgtNGYxYS00YTZiLWFiMTAtMDE4YTEzZDMzYTU5`)
        setTracks(data?.tracks)
        console.log(data?.tracks)
    }

    useEffect(() => {
        getAlbum()
        getAlbumTracks()
        setTimeout(() => {
            setLoad(true)
        },1000)
    },[])

    const imageURL = `https://api.napster.com/imageserver/v2/albums/${album?.id}/images/500x500.jpg`
    
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
                    <h4 className="album-content__desc">Album: {album?.name}</h4>   
                    <Link to={`/artistContent/${album?.contributingArtists?.primaryArtist}`}>
                    <h4 className="album-content__desc">Artistname: {album?.artistName}</h4>
                    </Link>   
                    <h4 className="album-content__desc">copyright: {album?.copyright} </h4>  
                    <h4 className="album-content__desc">label: {album?.label} </h4>  
                    <h4 className="album-content__desc">released: {album?.released?.substr(0,7) || '-'}  </h4>  
                    </div> 
            </div>
            <div className="container">
                    <h2 className="section__title album-content__title">Album's tracks</h2>
                    { 
                    tracks?.map( (el, idx) => (
                    <div  key={idx} className="album-content__tracks" >
                        <div className="grid album-content__grid-template ">
                            <div className="album-content__albumImg">
                                <img src={`https://api.napster.com/imageserver/v2/albums/${el?.albumId}/images/70x70.jpg`} alt=""/>
                            </div>
                            <div className="album-content__descinfo">
                                <h3 className="album-content__track">{el?.name}</h3>
                                <p className="album-content__album">{el?.albumName}</p>
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