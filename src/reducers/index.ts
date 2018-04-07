import {combineReducers} from 'redux';
import assets from "./streamReducer";
import {routerReducer} from "react-router-redux";


export default combineReducers({
    assets,
    routing: routerReducer
})