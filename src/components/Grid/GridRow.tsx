import * as React from "react";

export interface IGridRowProps {
    items: Array<any>
}

export class GridRow extends React.Component<IGridRowProps, {}>{
    render(): JSX.Element {
        return <tr className="lvf-grid">{this.props.children}</tr>;
    }
}