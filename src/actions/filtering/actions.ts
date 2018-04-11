import {Action} from "redux";
import {FILTER_ACTION} from "./constants";

export interface ISortFieldOption {
    name: string;
}

export interface IFilteringOptions {
    field: ISortFieldOption,
    value: string
}

export interface IFilteringAction extends Action {
    options: IFilteringOptions;
}

export function filter (sortOptions: IFilteringOptions): IFilteringAction {
    const {field, value} = sortOptions;
    return {
        type: FILTER_ACTION,
        options: {
            field,
            value
        }
    }
}