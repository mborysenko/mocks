import * as React from "react";
import {IAsset} from "../../api/mock";
import {AreaHTMLAttributes} from "react";

export interface IGridBodydProps {
    items?: Array<any>,
    definition?: Array<Array<any>>
    children?: any;
}

export class GridBody extends React.Component<IGridBodydProps, {}> {
    render(): JSX.Element {
        return <tbody className="grid-body">
        {this.props.items.sort((a, b) => {
            return (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0;
        }).map((a: IAsset, i) => {
            return <tr className="grid-row" key={a.assetName + a.id + i + ""}>
                {this.props.definition && this.props.definition.map((v) => {
                    let key = v[0];
                    let val = a[key];
                    let formatter: Function = v[2];
                    return <td className="grid-cell">{formatter ? formatter(val) : val}</td>
                })}
            </tr>;
        })}
        </tbody>;
    }

}