import { ADD_TO_PLAYLIST, DELETE_FROM_PLAYLIST } from "../actions/playlist"

const initialState = {
    playlist : []
}

const playlistReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_PLAYLIST:
            return {playlist : [...state.playlist, action.value]}
        case DELETE_FROM_PLAYLIST:
            return {playlist : [...state.playlist.filter(el => el.id !== action.value.id)]}
            default: return state
    }
}

export default playlistReducer