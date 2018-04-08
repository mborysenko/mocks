import * as React from "react";

export interface IGridProps {
    items?: Array<any>,
    children?: any;
}

export class Grid extends React.Component<IGridProps, {}>{
    render(): JSX.Element {
        return <table className="grid">{this.props.children}</table>;
    }

}