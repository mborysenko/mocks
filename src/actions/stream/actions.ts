import {Action} from "redux";
import {ThunkAction} from "redux-thunk";
import {IAsset, mock, limit} from "../../api/mock";
import * as Actions from "./constants";
import * as Rx from "rxjs/Rx";

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
                let i = burst.findIndex((vv) => {
                    return vv.id === v.id;
                });

                if(i >= 0) {
                    burst.splice(i, 1, v);
                } else {
                    burst.push(v);
                }
            });

        // No matter how many updates happend
        let render = Rx.Observable.interval(1000);
        render.subscribe(() => {
            dispatch(assetBurstArrived(burst));
        })
    }
}
