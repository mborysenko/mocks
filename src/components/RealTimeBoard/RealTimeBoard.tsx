import * as React from "react";

export interface IRealTimeProps {}
export interface IRealTimeState {}

class RealTimeBoardImplementation extends React.Component<IRealTimeProps, IRealTimeState> {
    public render(): JSX.Element {
        return <h1>Real Time Board</h1>;
    }
}

export const RealTimeBoard = RealTimeBoardImplementation;