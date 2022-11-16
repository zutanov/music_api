import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const HeaderSearch = () => {

    const [search, setSearch] = useState('')
    const [artists, setArtists] = useState([])
    const [filtered, setFiltered] = useState([])
   
    const handleSearch = (e) => {
        setSearch(e.target.value)
        console.log(search)
    }

    const handleClear = () => {
        setSearch("")
    }

    const handleClose = () => {
        setFiltered([])
    }

    const getSearch = async() => {
        const {data} = await axios(`https://api.napster.com/v2.2/search/verbose?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4&query=${search}&per_type_limit=10`)
        const filteredSearch = data?.search?.data?.artists.filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
        setFiltered(filteredSearch)
        console.log(filtered)
    }

    const getArtists = async() => {
        const {data} = await axios()
    }

    useEffect(() => {

    })

    useEffect(() => {
        if(search.length > 3) {
            getSearch()
        } else {
            handleClose()
        }
    },[search])

    return (

        

            <div className="header__search">
                <input className="header__inp" value={search} onInput={handleSearch} type='text' placeholder="Search"/>
              
                

                {
                    filtered[0] && <div className="header__modal">
                        {
                            filtered.map((el) => (
                                <Link to={`/artistContent/${el.id}`} onClick={ () => {
                                    handleClear()
                                    handleClose()
                                }} className='header__filtered'>
                                    {el.name}
                                </Link>
                            ))
                        }
                    </div>
                }
           </div>
    )
}