import * as React from "react";
import {IAsset} from "../../api/mock";
import {GridRow} from "./GridRow";
import {connect} from "react-redux";
import {IAppGlobalState} from "../../reducers/initialState";
import {ISortFieldType, ISortingDirection, ISortOptions} from "../../actions/sorting";
import {IFilteringOptions} from "../../actions/filtering";

export interface IGridBodyProps {
    definition: Array<Array<any>>
    items?: Array<any>,
    children?: any;
    sorting?: ISortOptions;
    filtering?: IFilteringOptions;
}

class GridBodyImplementation extends React.Component<IGridBodyProps, {}> {
    private _compareFuncMap = {
        [ISortingDirection.ASCENDING]: (a, b) => {
            return (a > b) ? 1 : (a < b) ? -1 : 0;
        },
        [ISortingDirection.DESCENDING]: (a, b) => {
            return (a > b) ? -1 : (a < b) ? 1 : 0;
        }
    };

    private _getFilterFunc(options?: IFilteringOptions): (a: any) => boolean {
        let {name} = options.field;
        let q = options.value;
        return (a) => {
            let v = a[name];
            return v ? v.toLowerCase().indexOf(q.toLowerCase()) > -1 : true;
        };
    }
    private _getCompareFunc(sorting?: ISortOptions): (a: any, b: any) => number {
        let f = sorting.field;
        let key = f.name;
        let func = this._compareFuncMap[sorting.direction];

        return (a: any, b: any) => {
            let af = a[key], bf = b[key];
            return (func || func !== null) ? func(af, bf) : undefined;
        }
    }

    render(): JSX.Element {
        return <tbody className="grid-body">
        {this.props.items
            .filter(this._getFilterFunc(this.props.filtering))
            .sort(this._getCompareFunc(this.props.sorting)).map((a: IAsset) => {
            return <GridRow key={a.assetName + a.id + ""} definition={this.props.definition} data={a}/>;
        })}
        </tbody>;
    }
}

function mapStateToProps(state: IAppGlobalState, props: IGridBodyProps) {
    let {sorting, filtering} = state;
    console.log("FILTERING RECEIVED", state.filtering);

    return {
        sorting,
        filtering
    }
}

export const GridBody = connect(mapStateToProps, null)(GridBodyImplementation);