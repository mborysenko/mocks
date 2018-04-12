import {Action} from "redux";
import {SORT_ACTION} from "./constants";
import {ISortFieldType, ISortingDirection} from "./API";

export interface ISortFieldOption {
    name: string;
    type: ISortFieldType;
}

export interface ISortOptions {
    field: ISortFieldOption,
    direction: ISortingDirection
}

export interface ISortAction extends Action {
    options: ISortOptions;
}

export function sort (sortOptions: ISortOptions): ISortAction {
    const {field, direction} = sortOptions;
    return {
        type: SORT_ACTION,
        options: {
            field,
            direction
        }

    }
}