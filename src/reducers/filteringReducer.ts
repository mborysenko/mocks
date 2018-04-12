import * as FilteringActions from "../actions/filtering/constants";
import {IAsset} from "../api/mock";
import {IFilteringAction} from "../actions/filtering";

export default function filteringReducer(state: Array<IAsset> = [], action: IFilteringAction) {
    if (action.type == FilteringActions.FILTER_ACTION) {
        return Object.assign({}, action.filtering);
    }

    return state;
}