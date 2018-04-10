import {createStore, applyMiddleware, combineReducers} from 'redux';
import rootReducer from '../reducers/index';
import thunk from "redux-thunk";

declare const module: { hot: any };

export default function configureStore(initialState: any){
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(
            thunk,
        )
        );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}