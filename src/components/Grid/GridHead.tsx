import * as React from "react";
import {Sorter} from "../Sorting/SortWidget";

export interface IGridHeadProps {
    definition?: Array<Array<string>>,
    children?: any;
}

export interface IDefinition {

}

export class GridHead extends React.Component<IGridHeadProps, {}>{
    render(): JSX.Element {
        return <thead className="grid-head">
        <tr className="grid-row">
            {this.props.definition && this.props.definition.map((d, i) =>  {
                let field = d[0];
                return <th key={field + i + ""} data-field={field} className="grid-cell">
                        <Sorter field={field}>{d[1]}</Sorter>
                    </th>;
            })}
        </tr>
        </thead>;
    }

}