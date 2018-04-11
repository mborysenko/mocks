import {combineReducers} from 'redux';
import assets from "./streamReducer";
import sorting from "./sortingReducer";
import filtering from "./filteringReducer";

export default combineReducers({
    assets,
    sorting,
    filtering
})