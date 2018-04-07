import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {IAsset, limit, mock} from "../../api/mock";
import * as Actions from "./constants";

export function assetBurstArrived(assets: Array<IAsset>): Action & { assets: Array<IAsset> } {
    return {
        type: Actions.ASSET_BURST_ARRIVED_ACTION,
        assets
    };
}

export function streamStart(): ThunkAction<any, any, {}> {
    return function (dispatch) {
        // mock
        //     .scan((acc, v) => {
        //         return [...acc, v];
        //     }, [])
        //     .subscribe((v: IAsset[]) => {
        //         if (v.length == limit) {
        //             debugger;
        //             dispatch(assetBurstArrived(v));
        //         }
        //     });

        let burst: Array<IAsset> = [];

        mock
            .subscribe((v: IAsset) => {
                if (burst.length == limit) {
                    dispatch(assetBurstArrived(burst));
                    burst = [];
                }
                else {
                    burst.push(v);
                }
            })
    }
}
