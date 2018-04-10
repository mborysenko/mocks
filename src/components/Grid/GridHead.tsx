import * as React from "react";
import {Sorter} from "../Sorting/SortWidget";
import {ISortFieldOption} from "../../actions/sorting";

export interface IGridHeadProps {
    definition?: Array<Array<any>>,
    children?: any;
}

export interface IDefinition {

}

export class GridHead extends React.Component<IGridHeadProps, {}>{
    render(): JSX.Element {
        return <thead className="grid-head">
        <tr className="grid-row">
            {this.props.definition && this.props.definition.map((d, i) =>  {
                let fieldData: ISortFieldOption = d[0];
                let field = {
                    name: fieldData.name,
                    type: fieldData.type
                };
                return <th key={field.name + i + ""} data-field={field} className="grid-cell">
                        <Sorter field={field}>{d[1]}</Sorter>
                    </th>;
            })}
        </tr>
        </thead>;
    }

}