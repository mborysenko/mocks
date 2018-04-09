import * as React from "react";
import {IAsset} from "../../api/mock";
import {AreaHTMLAttributes} from "react";
import {GridRow} from "./GridRow";

export interface IGridBodydProps {
    definition: Array<Array<any>>
    items?: Array<any>,
    children?: any;
}

export class GridBody extends React.Component<IGridBodydProps, {}> {
    render(): JSX.Element {
        return <tbody className="grid-body">
        {this.props.items.sort((a, b) => {
            return (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0;
        }).map((a: IAsset) => {
            return <GridRow key={a.assetName + a.id + ""} definition={this.props.definition} data={a} />;
        })}
        </tbody>;
    }

}