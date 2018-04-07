import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {mock, IAsset} from "../../api/mock";
import * as Actions from "./constants";

export function assetArrived(asset: IAsset): Action & { asset: any } {
    return {
        type: Actions.ASSET_ARRIVED_ACTION,
        asset
    };
}
export function streamStart(): ThunkAction<any, any, {}>{
    return function(dispatch, getState, extraArgument){
        function scheduleAction(a) {
            dispatch(assetArrived(a))
        }

        function delay() {

        }

        mock.subscribe((v: IAsset) => {
            console.log(v);
            dispatch(assetArrived(v))
        })
    }
}
