import * as StreamActions from "../actions/stream/constants";
import {IAssetAction} from "../actions/stream";
import {IAsset} from "../api/mock";

export default function streamReducer(state: Array<IAsset> = [], action: IAssetAction) {
    if (action.type == StreamActions.ASSET_BURST_ARRIVED_ACTION) {
        return [...action.assets]
    }

    return state;
}