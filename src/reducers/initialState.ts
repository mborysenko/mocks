import { ISortOptions, SORTING_DIRECTION_ASC} from "../actions/sorting";
import {IAsset} from "../api/mock";

export interface IAppGlobalState {
    assets?: Array<IAsset>,
    sorting?: ISortOptions
}

const initial: IAppGlobalState =  {
    assets: [],
    sorting: {
        field: "id",
        direction: SORTING_DIRECTION_ASC
    }
};

export {
    initial as default,
}