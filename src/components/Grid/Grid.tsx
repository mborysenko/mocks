import * as React from "react";
import {GridHead} from "./GridHead";
import {GridBody} from "./GridBody";

export interface IGridProps {
    data?: Array<any>,
    definition: any;
    children?: any;
}

export class Grid extends React.Component<IGridProps, {}>{
    constructor(props, state) {
        super(props, state);


    }

    render(): JSX.Element {
        return <table className="grid">
            <GridHead definition={this.props.definition} />
            <GridBody items={this.props.data} definition={this.props.definition} />
        </table>;
    }

}