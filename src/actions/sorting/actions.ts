import {Action} from "redux";
import {SORT_ACTION} from "./constants";

export interface ISortOptions {
    field: string,
    direction: string
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