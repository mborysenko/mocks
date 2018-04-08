import * as React from "react";

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
            {this.props.definition && this.props.definition.map((d) =>  {
                return  <th data-field={d[0]} className="grid-cell">{d[1]}</th>;
            })}
        </tr>
        </thead>;
    }

}