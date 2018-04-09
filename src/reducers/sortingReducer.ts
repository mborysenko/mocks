import * as SortActions from "../actions/sorting/constants";
import {ISortAction} from "../actions/sorting";
import {IAsset} from "../api/mock";

export default function sortingReducer(state: Array<IAsset> = [], action: ISortAction) {
    if (action.type == SortActions.SORT_ACTION) {
        const {field, direction} = action.options;
        return Object.assign({}, {field, direction});
    }

    return state;
}