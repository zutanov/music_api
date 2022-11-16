import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import spin from '../../assets/images/spin.svg' 
import ups from '../../assets/images/ups.jpg'

export const Album = () => {
    const [album, setAlbum] = useState([])
    const [load, setLoad] = useState(false)
    
    
    const setImage = (image) => {
        if(image) {
            return image
        } else {
            return ups
        }
    }
    

    const getTopAlbum = async() => {
        const {data} = await axios('https://api.napster.com/v2.1/albums/top?limit=21&apikey=MzdkNDhiZjgtNGYxYS00YTZiLWFiMTAtMDE4YTEzZDMzYTU5')
        setAlbum(data?.albums)
        console.log(data?.albums)
    }

    useEffect(() => {
        getTopAlbum()
        setTimeout(() => {
            setLoad(true)
        },1000)
    },[]) 
    if (!load) {
        return <div className="spin">
             <img src={spin} alt='load'/>
         </div>
     }  else {
    return (
        <section className="album">
            <h2 className="section__title album__title">Top Albums</h2>
               <div className="container grid artist__grid">
                      {
                        album?.map((el, idx) => {
                           return     <div key={idx} className="card" style={{background: `url(https://api.napster.com/imageserver/v2/albums/${setImage(el?.id)}/images/300x300.jpg) no-repeat center/cover`}} >
                                        <Link to={`/artistContent/${el?.contributingArtists?.primaryArtist}`}>
                                        <h4 className="card__title">{el.artistName}</h4>
                                        </Link>
                                        <Link to={`/albumContent/${el.id}`}>
                                        <h3 className="card__desc">{el.name}</h3>
                                        </Link>
                                        </div>
                })
           }   
            </div>
        </section>
    )
    }
}