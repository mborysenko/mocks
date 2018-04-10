import * as React from "react";
import initialState from "./reducers/initialState";

import "styles.less";

/* Redux stuff */
import {Provider} from "react-redux";

import {RealTimeBoard} from "./components/RealTimeBoard";
import configureStore from "./store/configureStore";

let store = configureStore(initialState);
export interface IAppProperties {
}

export interface IAppState {
    context?: any;
}

export class App extends React.Component<IAppProperties, IAppState> {
    public render(): JSX.Element {
        return <Provider store={store}>
                <div>
                    <RealTimeBoard />
                </div>
        </Provider>;
    }
}

export {
    App as default
}