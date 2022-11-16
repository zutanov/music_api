import playlistReducer from "./reducers/playlistReducer";
import { combineReducers, createStore } from "redux";

const store = createStore(combineReducers({playlistReducer}))

export default store