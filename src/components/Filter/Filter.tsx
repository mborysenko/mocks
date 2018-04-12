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
        let value = e.value;


        this.setState((state) => {
            return Object.assign({}, state, {
                filtering: {
                    value
                }
            })
        });

        let field = this._getFieldData(s.value)[0];
        let n = field ? field.name : s.value;


        this.props.actions.filter({
            field: {
                name: n,
                type: field.type,
            },
            value: this._prepareValue(e.value, field.type)
        });
    }

    _prepareValue(val: string, type: ISortFieldType): string | Array<string> {
        if (type === ISortFieldType.NUMERIC) {
            if (!val || val.trim() === "") {
                return ["0"]
            }

            let value = val.split(":");

            if (value.length > 1) {
                let b = value.shift();
                let t = value.shift();

                if (t.trim() === "") {
                    return [b]
                }

                if (parseInt(b) > parseInt(t)) {
                    return [t, b]
                }
                return [b, t];
            }

            if (value.length = 1) {
                return [value[0]]
            }

        }

        return val;
    }

    _onFieldChange(event: SyntheticEvent<HTMLElement>) {
        let e = event.target as HTMLSelectElement;
        let name = e.value;
        let f: any = this.props.fields.find((f) => {
            let field = f[0];
            return field.name === name;
        });

        let fieldData = f[0];
        let field = {
            name: fieldData.name,
            type: fieldData.type,
        };

        this.setState((state) => {
            return Object.assign({}, state, {
                filtering: {
                    field
                }
            })
        });

        this.props.actions.filter({
            field,
            value: this._prepareValue(this.state.filtering.value, field.type)
        })
    }

    _getFieldData(name: string) {
        return this.props.fields.find((f) => {
            let field = f[0];
            return field.name === name;
        });
    }

    componentDidMount() {
        let s = this._selectRef as HTMLSelectElement;

        let f: any = this._getFieldData(s.value);
        let fieldData = f[0];
        this.setState((state) => {
            return Object.assign({}, state, {
                filtering: {
                    field: {
                        name: fieldData.name,
                        type: fieldData.type,
                    }
                }
            })
        });
    }

    public filter() {
        this.props.actions.filter(null);
    }

    render(): JSX.Element {
        return <div className="">
            <label className="filter">{this.props.label}</label>
            <select ref={(r: any) => this._selectRef = r} name="fieldName" id="select-fieldName"
                    onChange={this._onFieldChange}>
                {this.props.fields.map((f, i) => {
                    let field = f[0];
                    return /*(field.type == ISortFieldType.STRING) ? */<option data-type={field.type} key={field.name}
                                                                               value={field.name}>{f[1]}</option>/* : false*/;
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
