import {ISortFieldType, ISortingDirection, ISortOptions} from "../actions/sorting";
import {IAsset} from "../api/mock";
import {IFilteringOptions} from "../actions/filtering";

export interface IAppGlobalState {
    assets?: Array<IAsset>,
    sorting?: ISortOptions
    filtering?: IFilteringOptions
}

const initial: IAppGlobalState = {
    assets: [],
    sorting: {
        field: {
            name: "id",
            type: ISortFieldType.NUMERIC
        },
        direction: ISortingDirection.ASCENDING
    },
    filtering: {
        field: {name: ""},
        value: "",
    }
};

export {
    initial as default,
}