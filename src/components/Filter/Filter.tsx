import * as React from "react";
import {SyntheticEvent} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {IAppGlobalState} from "../../reducers/initialState";
import * as FilteringActions from "../../actions/filtering/actions";
import {IFilteringOptions} from "../../actions/filtering";

export interface IFilterWidgetProps {
    children?: any,
    actions?: any,
    fields: Array<Array<any>>,
    label: string,
    // onChange: (event: SyntheticEvent<HTMLElement>) => void
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
        this._onValueChange = this._onValueChange.bind(this);
        this._onFieldChange = this._onFieldChange.bind(this);
    }

    _onValueChange(event: SyntheticEvent<HTMLElement>) {
        this.props.actions.filter({ name: "assetName", value: ""})
    }

    _onFieldChange(event: SyntheticEvent<HTMLElement>) {
        this.props.actions.filter({ name: "assetName", value: ""})
    }

    public filter() {
        this.props.actions.filter(null);
    }

    render(): JSX.Element {
        return <div className="">
            <label className="filter">{this.props.label}</label>
            <select name="fieldName" id="select-fieldName" onChange={this._onFieldChange}>
                {this.props.fields.map((f, i) => {
                    let field = f[0];
                    return <option key={field.name} value={field.name}>{f[1]}</option>
                })}
            </select>
            <input type="text" onChange={this._onValueChange} name="filteringValue"/>
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
