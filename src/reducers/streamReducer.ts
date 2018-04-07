import * as StreamActions from "../actions/stream/constants";
import {IAssetAction} from "../actions/stream/API";
import {IAsset} from "../api/mock";

export default function streamReducer(state: Array<IAsset> = [], action: IAssetAction) {
    if (action.type == StreamActions.ASSET_ARRIVED_ACTION) {
        let a = action.asset;
        let i = state.findIndex((v:IAsset) => {
            return a.id === v.id;
        });
        if(i >= 0)
            state.splice(i, 1, a);
        else
            state.push(a);
        return [
            ...state
        ];
    }

    if (action.type == StreamActions.ASSET_MAP_ARRIVED_ACTION) {
        let newAsset = { [action.asset.id]: action.asset };
        return Object.assign({}, state, newAsset);

    }

    return state;
}