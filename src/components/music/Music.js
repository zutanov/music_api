import axios from "axios";
import React, { useEffect, useState } from "react";
import spin from '../../assets/images/spin.svg' 
import { Link } from "react-router-dom";
import { Pagination } from "../pagination/Pagination.js";

export const Music= () => {
    const [music, setMusic] = useState([])
    const [currentMusic, setCurrentMusic] = useState(1)
    const [currentLimitMusic] = useState(21)
    const [load, setLoad] = useState(true)

    const getTopMusic = async() => {
        const {data} = await axios('https://api.napster.com/v2.1/tracks/top?limit=210&apikey=MzdkNDhiZjgtNGYxYS00YTZiLWFiMTAtMDE4YTEzZDMzYTU5')
        setMusic(data?.tracks)
        console.log(data?.tracks)
    }

    useEffect(() => {
        getTopMusic()
        setTimeout(() => {
            setLoad(false)
        },1000)
    },[])

    const lastMusicIndex = currentMusic * currentLimitMusic
    const firstMusicIndex = lastMusicIndex - currentLimitMusic
    const currentMusicPage = music.slice(firstMusicIndex, lastMusicIndex)
    
    const paginate = (pageNumber) => {
        setCurrentMusic(pageNumber)
    }

   
    if (load)      {
       return <div className="spin">
            <img src={spin} alt='load'/>
        </div>
    } 
        else {
    return (
        <section className="music">
            <h2 className="section__title music__title">Top Music</h2>
            <div className="container grid music__grid">
               {
                        currentMusicPage.map((el, idx) => {
                        return      <div key={idx} className="card" style={{background: `url(https://api.napster.com/imageserver/v2/albums/${el.albumId}/images/300x300.jpg) no-repeat center/cover`}}>
                        <Link to={`/musicContent/${el.id}`}>
                        <h4 className="card__title">{el.name}</h4>
                        </Link>
                        <audio controls preload="none" class="card__audio">
                            <source src={el.previewURL} type="audio/mpeg"/>
                        </audio>
                    </div>
                    })
               }     
             
               </div>

               
               <Pagination
                    currentLimitMusic = {currentLimitMusic}
                    totalMusic = {music.length}
                    paginate={paginate}
                    setCurrentMusic={setCurrentMusic}
               />
        </section>
    )
}
}