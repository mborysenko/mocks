import {IAsset} from "../../api/mock";
import {Action} from "redux";

export interface IAssetAction extends Action {
    assets?: Array<IAsset>;
}

export interface IAssetMap {
    [id:string]: IAsset
}