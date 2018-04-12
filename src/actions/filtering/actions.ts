import {Action} from "redux";
import {FILTER_ACTION} from "./constants";
import {ISortFieldOption} from "../sorting";

export interface IFilteredFieldOption {
    name: string;
}

export interface IFilteringOptions {
    field?: ISortFieldOption,
    value?: string
}

export interface IFilteringAction extends Action {
    filtering: IFilteringOptions;
}

export function filter (options: IFilteringOptions): IFilteringAction {
    const {field, value} = options;
    return {
        type: FILTER_ACTION,
        filtering: {
            field,
            value
        }
    }
}