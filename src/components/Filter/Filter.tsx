import * as React from "react";
import {SyntheticEvent} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {IAppGlobalState} from "../../reducers/initialState";
import * as FilteringActions from "../../actions/filtering/actions";
import {IFilteringOptions} from "../../actions/filtering";
import {ISortFieldType} from "../../actions/sorting";

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
    private _selectRef: any;
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
        let s = this._selectRef as HTMLSelectElement;
        let e = event.target as HTMLInputElement;
        this.setState({
            filtering: {
                value: e.value
            }
        });
        let {field} = this.state.filtering;
        let n = field ? field.name : s.value;
        this.props.actions.filter({ field: {name: n}, value: e.value})
    }

    _onFieldChange(event: SyntheticEvent<HTMLElement>) {
        debugger;
        let e = event.target as HTMLSelectElement;
        this.setState({
            filtering: {
                field: {
                    name: e.value
                }
            }
        });

        this.props.actions.filter({ field: {name: e.value}, value: this.state.filtering.value })
    }

    componentDidMount() {
        let s = this._selectRef as HTMLSelectElement;
        this.setState({
            filtering: {
                field: {
                    name: s.value
                }
            }
        });
    }

    public filter() {
        this.props.actions.filter(null);
    }

    render(): JSX.Element {
        return <div className="">
            <label className="filter">{this.props.label}</label>
            <select ref={(r: any) => this._selectRef = r } name="fieldName" id="select-fieldName" onChange={this._onFieldChange}>
                {this.props.fields.map((f, i) => {
                    let field = f[0];
                        return (field.type == ISortFieldType.STRING) ? <option key={field.name} value={field.name}>{f[1]}</option> : false;
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
