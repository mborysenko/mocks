import {IAsset} from "../../api/mock";
import {Action} from "redux";

export interface IAssetAction extends Action {
    asset: IAsset;
}

export interface IAssetMap {
    [id:string]: IAsset
}