import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {IAppGlobalState} from "../../reducers/initialState";
import * as SortActions from "../../actions/sorting/actions";
import {ISortOptions, SORTING_DIRECTION_ASC, SORTING_DIRECTION_DESC} from "../../actions/sorting";

export interface ISortWidgetProps {
    children?: any,
    field?: string,
    direction?: string,
    actions?: any,
}

export interface ISortWidgetState {
    sorting?: ISortOptions,
    currentDirection?: string;
}

export class SortWidget extends React.Component<ISortWidgetProps, ISortWidgetState>{
    constructor(props, state) {
        super(props, state);
        let {field, direction} = props;
        this.state = {
            sorting: {
                direction: direction ? direction : SORTING_DIRECTION_ASC,
                field
            },
            currentDirection: null
        };

        this.sort = this.sort.bind(this);
    }

    _toggleSortingDirection(dir: string): string {
        if(dir === SORTING_DIRECTION_ASC) {
            return SORTING_DIRECTION_DESC
        }
        if(dir === SORTING_DIRECTION_DESC) {
            return SORTING_DIRECTION_ASC
        }
    }

    _getCurrentSorting(): ISortOptions {
        let { field, direction } = this.state.sorting;
        let { currentDirection } = this.state;
        let newDir = (currentDirection === null ||currentDirection !== direction) ? direction : this._toggleSortingDirection(direction);

        this.setState({
            currentDirection: newDir
        });

        return {
            field,
            direction: newDir
        }
    }

    public sort() {
        let s = this._getCurrentSorting();
        console.log(s);
        this.props.actions.sort(s)
    }
    render(): JSX.Element {
        return <div className="sort" onClick={this.sort}>{this.props.children}</div>;
    }
}

function mapStateToProps(state: IAppGlobalState, props: ISortWidgetProps) {
    const { field, direction } = state.sorting;
    return Object.assign({}, { sorting: { field, direction }})
}
function mapDispatchToProps(dispatch) {
    return {
        actions:  bindActionCreators(SortActions, dispatch)
    };
}
export const Sorter = connect<ISortWidgetState, {}, ISortWidgetProps, {}>(mapStateToProps, mapDispatchToProps)(SortWidget);