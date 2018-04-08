import * as React from "react";

import "styles.less";
/* React Router stuff */
import {BrowserRouter as Router, Route} from "react-router-dom";
/* Redux stuff */
import {Provider} from "react-redux";

import {RealTimeBoard} from "./components/RealTimeBoard";
import configureStore from "./store/configureStore";

let store = configureStore({});
export interface IAppProperties {
}

export interface IAppState {
    context?: any;
}

export class App extends React.Component<IAppProperties, IAppState> {
    public render(): JSX.Element {
        return <Provider store={store}>
            <Router>
                <div>
                    <RealTimeBoard />
                </div>
            </Router>
        </Provider>;
    }
}

export {
    App as default
}