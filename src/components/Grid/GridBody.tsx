import * as React from "react";
import {IAsset} from "../../api/mock";
import {GridRow} from "./GridRow";
import {connect} from "react-redux";
import {IAppGlobalState} from "../../reducers/initialState";
import {ISortOptions} from "../../actions/sorting";

export interface IGridBodyProps {
    definition: Array<Array<any>>
    items?: Array<any>,
    children?: any;
    sorting?: ISortOptions;
}

class GridBodyImplementation extends React.Component<IGridBodyProps, {}> {

    _getCompareFunc(sorting?: ISortOptions): (a: any, b: any) => number {
        return (a: any, b: any) => {
            return (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0;
        }
    }
    render(): JSX.Element {
        return <tbody className="grid-body">
        {this.props.items.sort(this._getCompareFunc()).map((a: IAsset) => {
            return <GridRow key={a.assetName + a.id + ""} definition={this.props.definition} data={a}/>;
        })}
        </tbody>;
    }
}

function mapStateToProps(state: IAppGlobalState, props: IGridBodyProps) {
    let {sorting} = state;
    return {
        sorting
    }
}

export const GridBody = connect(mapStateToProps, null)(GridBodyImplementation);