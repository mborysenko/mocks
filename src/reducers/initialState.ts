import {ISortFieldType, ISortingDirection, ISortOptions, SORTING_DIRECTION_ASC} from "../actions/sorting";
import {IAsset} from "../api/mock";

export interface IAppGlobalState {
    assets?: Array<IAsset>,
    sorting?: ISortOptions
}

const initial: IAppGlobalState =  {
    assets: [],
    sorting: {
        field: {
            name: "id",
            type: ISortFieldType.NUMERIC
        },
        direction: ISortingDirection.ASCENDING
    }
};

export {
    initial as default,
}