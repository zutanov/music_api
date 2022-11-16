import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import spin from '../../assets/images/spin.svg'; 

export const Artist = () => {
    const [artist, setArtist] = useState([])
    const [load, setLoad] = useState(false)
    const {id} = useParams()

    const getTopArtist = async() => {
        const {data} = await axios('https://api.napster.com/v2.1/artists/top?limit=24&apikey=MzdkNDhiZjgtNGYxYS00YTZiLWFiMTAtMDE4YTEzZDMzYTU5')
        setArtist(data?.artists)
    }

    useEffect(() => {
        getTopArtist()
        setTimeout(() => {
            setLoad(true)
        },1000)
    },[]) 

    if (!load)      {
        return <div className="spin">
             <img src={spin} alt='load'/>
         </div>
     }  else {
    return (
     

<section class="bg-white dark:bg-gray-900" style={{paddingTop: 100}}>
            <div class="container px-6 py-10 mx-auto ">
                <h1 class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">Top Artists</h1>
                               
                <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">
                   
        
            {
                    artist.map((el, idx) => {
                     return     <Link to={`/artistContent/${el.id}`}>
                    <div key={idx} class="flex flex-col items-center p-8 transition-colors duration-200 transform cursor-pointer group hover:bg-blue-600 rounded-xl">
                        
                       <img class="object-cover w-40 h-40 rounded-full ring-4 ring-gray-300" src={`https://api.napster.com/imageserver/v2/artists/${el.id}/images/356x237.jpg`} alt=""/>
                                         
                     <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">{el.name}</h1>
                      
                    </div>
                      </Link>
                    })
               }  

                    
                    
                </div>
            </div>
        </section>


      
    )
    }
}