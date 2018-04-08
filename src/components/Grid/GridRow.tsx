import * as React from "react";

export interface IGridRowProps {
    definition?: Array<Array<any>>
    data: any;
}

export class GridRow extends React.Component<IGridRowProps, {}>{
    render(): JSX.Element {
        let d = this.props.data;
        return <tr className="grid-row" key={d.assetName + d.id + ""}>
            {this.props.definition && this.props.definition.map((v) => {
                let key = v[0];
                let val = d[key];
                let formatter: Function = v[2];
                return <td className="grid-cell">{formatter ? formatter(val) : val}</td>
            })}
        </tr>;
    }
}