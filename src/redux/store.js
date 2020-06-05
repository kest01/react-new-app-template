// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history'
import reducers from './reducers';
import { initialState } from './reducers';
import type { AppStore } from './reducers';

export const history = createBrowserHistory();

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    store: reducers
});

export function configureStore(initState: AppStore) {
    console.log("configureStore" + initState);
    return createStore(
        createRootReducer(history),
        initState ? initState : { store: initialState},
        applyMiddleware(
            routerMiddleware(history),
            thunk,
        ),
    );
}
