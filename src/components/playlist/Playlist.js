import React from "react";
import { useSelector } from "react-redux";
import { deleteFromPlaylist } from "../../store/actionCreators/playlist";
import store from "../../store/store";

export const Playlist = () => {
    
    const playlist = useSelector(store => store?.playlistReducer?.playlist) 
    const handleDelete = (track) => {
        store.dispatch(deleteFromPlaylist(track))
        console.log(store)
    }

    return (
        <section className="playlist">
                 <div className="container">
                    <h2 className="section__title album-content__title">Playlist</h2>
                     { !playlist[0] && (<h2 className="section__title album-content__title">Create your favorite Playlist</h2>) || playlist?.map( (el, idx) => (
                    <div  key={idx} className="album-content__tracks" >
                        <div className="grid album-content__grid-template ">
                            <div className="album-content__albumImg">
                                <img src={`https://api.napster.com/imageserver/v2/albums/${el?.albumId}/images/70x70.jpg`} alt=""/>
                            </div>
                            <div className="album-content__descinfo">
                                <div className="d-flex">
                                <h3 className="album-content__track mr_30">{el?.name}</h3>
                                <p className="album-content__album">{el?.albumName}</p>
                                </div>
                                <audio data-track-id={el?.id} preload="none" controls className="album-content__audio">
                                    <source src={el?.previewURL} type="audio/mpeg"/>
                                </audio>
                            </div>
                            <div className="album-content__playlist">
                                <button onClick={() => {
                                    handleDelete(el)
                                }} className="album-content__btn">Delete</button>
                            </div>
                        </div>
                    </div>
                )) 
                }
                </div>
        </section>
    )
}