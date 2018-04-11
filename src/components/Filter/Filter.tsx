import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {IAppGlobalState} from "../../reducers/initialState";
import * as FilteringActions from "../../actions/filtering/actions";
import {IFilteringOptions} from "../../actions/filtering";
import {ChangeEvent, ReactEventHandler, SyntheticEvent} from "react";

export interface IFilterWidgetProps {
    children?: any,
    actions?: any,
    fields: Array<Array<any>>,
    label: string,
    onChange: (event: SyntheticEvent<HTMLElement>) => void
}

export interface IFilterWidgetState {
    filtering: IFilteringOptions
}

export class FilterWidget extends React.Component<IFilterWidgetProps, IFilterWidgetState> {
    constructor(props, state) {
        super(props, state);

        let {filtering} = props;
        this.state = {
            filtering
        };

        this.filter = this.filter.bind(this);
    }

    _getCurrentFiltering(): IFilteringOptions {
        return;
    }

    public filter() {
        let s = this._getCurrentFiltering();
        console.log(s);
        this.props.actions.sort(s)
    }

    render(): JSX.Element {
        return <div className="">
            <button className="filter" onClick={this.filter}>{this.props.label}</button>
            <select name="fieldName" id="select-fieldName" onChange={this.props.onChange}>
                {this.props.fields.map((f, i) => {
                    return <option value={f[0]}>{f[0]}</option>
                })}
            </select>
            <input type="text" value=""/>
        </div>;
    }
}

function mapStateToProps(state: IAppGlobalState, props: IFilterWidgetProps) {
    const {field, value} = state.filtering;
    return Object.assign({}, {filtering: {field, value}})
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(FilteringActions, dispatch)
    };
}

export const Filter = connect<IFilterWidgetState, {}, IFilterWidgetProps, {}>(mapStateToProps, mapDispatchToProps)(FilterWidget);
