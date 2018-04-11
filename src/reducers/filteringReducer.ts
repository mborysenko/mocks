import * as FilteringActions from "../actions/filtering/constants";
import {IAsset} from "../api/mock";
import {IFilteringAction} from "../actions/filtering";

export default function sortingReducer(state: Array<IAsset> = [], action: IFilteringAction) {
    if (action.type == FilteringActions.FILTER_ACTION) {
        const {field, value} = action.options;
        return Object.assign({}, {field, value});
    }

    return state;
}