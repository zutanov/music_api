
import { ADD_TO_PLAYLIST, DELETE_FROM_PLAYLIST } from "../actions/playlist";

export const addToPlaylist = (value) => {
    return {
        type : ADD_TO_PLAYLIST,
        value : value
    }
}

export const deleteFromPlaylist = (value) => {
    return {
        type : DELETE_FROM_PLAYLIST,
        value : value
    }
}