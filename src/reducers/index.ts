import {combineReducers} from 'redux';
import assets from "./streamReducer";
import sorting from "./sortingReducer";

export default combineReducers({
    assets,
    sorting
})