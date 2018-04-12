import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {IAsset} from "../../api/mock";
import * as StreamActions from "../../actions/stream/actions";
import {Grid} from "../Grid/Grid";
import {IAppGlobalState} from "../../reducers/initialState";
import {ISortFieldType, ISortOptions} from "../../actions/sorting";
import {Filter} from "../Filter/Filter";
import {IFilteringOptions} from "../../actions/filtering";

export interface IRealTimeProps {
    actions?: any;
    assets?: Array<IAsset>;
    started?: boolean;
    sorting?: ISortOptions;
    filtering?: IFilteringOptions;
}

export interface IRealTimeState {
    started?: boolean;
    gridDefinition?: any;
    sorting?: ISortOptions;
}

class RealTimeBoardImplementation extends React.Component<IRealTimeProps, IRealTimeState> {
    constructor(props, state) {
        super(props, state);

        this.start = this.start.bind(this);
        this.state = {
            started: false,
            sorting: this.props.sorting,
            gridDefinition: this._getTableDefinition()
        }
    }

    private _getTableDefinition(): any {
        return [
            [{
                name: "id",
                type: ISortFieldType.NUMERIC
            }, "Asset ID"],
            [{
                name: "assetName",
                type: ISortFieldType.STRING
            }, "Name"],
            [{
                name: "price",
                type: ISortFieldType.NUMERIC
            }, "Price, USD"],
            [{
                name: "lastUpdate",
                type: ISortFieldType.NUMERIC
            }, "Last Updated", (val) => { return new Date(val).toLocaleString()}],
            [{
                name: "type",
                type: ISortFieldType.STRING
            }, "Type"]
        ];
    }

    componentWillReceiveProps(nextProps: IRealTimeProps) {
        if(nextProps.assets && nextProps.assets.length > 0)
        this.setState({gridDefinition: this._getTableDefinition()});
    }

    start() {
        this.props.actions.streamStart();
        this.setState({started: true});
    }

    public render(): JSX.Element {
        let { gridDefinition } = this.state;
        return <div>
            <h1>Real Time Board</h1>
            <button onClick={this.start} disabled={this.state.started}>Start</button>
            <div>Number of assets shown: {this.props.assets.length}</div>
            <Filter fields={gridDefinition} label="Filter By:"/>
            <Grid definition={gridDefinition} data={this.props.assets} />
        </div>;
    }
}

function mapDispatchToProps(dispatch): IRealTimeProps {
    return {
        actions: bindActionCreators(StreamActions, dispatch),
    };
}

function mapStateToProps(state: IAppGlobalState, props: IRealTimeProps): IRealTimeProps {
    return {
        assets: state.assets,
        sorting: state.sorting
    };
}

export const RealTimeBoard = connect<IRealTimeState, {}, IRealTimeProps, {}>(mapStateToProps, mapDispatchToProps)(RealTimeBoardImplementation) as any;