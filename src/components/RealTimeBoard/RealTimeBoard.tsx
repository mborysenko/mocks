import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {IAsset} from "../../api/mock";
import * as StreamActions from "../../actions/stream/actions";
import {Grid} from "../Grid/Grid";
import {GridHead} from "../Grid/GridHead";
import {GridBody} from "../Grid/GridBody";

export interface IRealTimeProps {
    actions?: any;
    assets?: Array<IAsset>;
    started?: boolean;
}

export interface IRealTimeState {
    started?: boolean;
    gridDefinition?: any;
}

class RealTimeBoardImplementation extends React.Component<IRealTimeProps, IRealTimeState> {
    constructor(props, state) {
        super(props, state);

        this.start = this.start.bind(this);
        this.state = {
            started: false
        }
    }

    private _getTableDefinition(a: IAsset): any {
        return [
            ["id", "Asset ID"],
            ["assetName", "Name"],
            ["price", "Price, USD"],
            ["lastUpdate", "Last Updated", (val) => { return new Date(val).toLocaleString()}],
            ["type", "Type"]
        ];
    }

    componentWillReceiveProps(nextProps: IRealTimeProps) {
        if(nextProps.assets && nextProps.assets.length > 0)
        this.setState({gridDefinition: this._getTableDefinition(nextProps.assets[0])});
    }

    start() {
        this.props.actions.streamStart();
        this.setState({started: true});

    }

    public render(): JSX.Element {
        return <div>
            <h1>Real Time Board</h1>
            <button onClick={this.start} disabled={this.state.started}>Start</button>
            <div>Number of assets shown: {this.props.assets.length}</div>
            <div className="sorting-panel __stick_to_right">

            </div>
            <Grid>
                <GridHead definition={this.state.gridDefinition} />
                <GridBody items={this.props.assets} definition={this.state.gridDefinition} />
            </Grid>
        </div>;
    }
}

function mapDispatchToProps(dispatch): IRealTimeProps {
    return {
        actions: bindActionCreators(StreamActions, dispatch),
    };
}

function mapStateToProps(state: any, props: IRealTimeProps): IRealTimeProps {
    return {
        assets: state.assets
    };
}

export const RealTimeBoard = connect<IRealTimeState, {}, IRealTimeProps, {}>(mapStateToProps, mapDispatchToProps)(RealTimeBoardImplementation) as any;