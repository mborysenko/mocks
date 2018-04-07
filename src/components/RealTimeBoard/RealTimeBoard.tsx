import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {IAsset} from "../../api/mock";
import * as StreamActions from "../../actions/stream/actions";

export interface IRealTimeProps {
    actions?: any,
    assets?: Array<IAsset>
}
export interface IRealTimeState {
}

class RealTimeBoardImplementation extends React.Component<IRealTimeProps, IRealTimeState> {
    constructor(props, state) {
        super(props, state);

        this.start = this.start.bind(this);

    }

    componentWillReceiveProps(nextProps: IRealTimeProps) {

    }

    start() {
        this.props.actions.streamStart();
    }

    public render(): JSX.Element {
        return <div>
            <h1>Real Time Board</h1>
            <button onClick={this.start}>Start</button>
            <div>Number of assets shown: {this.props.assets.length}</div>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price, USD</th>
                    <th>Last Updated</th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                {this.props.assets.sort((a, b) => {
                    return (a.id > b.id) ? 1 : (a.id < b.id) ? -1 : 0;
                }).map((a: IAsset, i) => {
                    return <tr key={a.assetName + a.id + i + ""}>
                        <td>{a.id}</td>
                        <td>{a.assetName}</td>
                        <td>{a.price}</td>
                        <td>{new Date(a.lastUpdate).toLocaleString()}</td>
                        <td>{a.type}</td>
                    </tr>;
                })}
                </tbody>

            </table>
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