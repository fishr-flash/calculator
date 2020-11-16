import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import reducer from "./reducers/index";
//import { composeWithDevTools } from 'redux-devtools-extension';
import {createStore} from 'redux';

/**
 * Логирует все экшены и состояния после того, как они будут отправлены.
 */
/*
const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);

    const act = { type: "onClickNumber", value: "1" };
    let res = next( act );
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};


const store = createStore( reducer, composeWithDevTools( applyMiddleware( logger ) ) );
*/
const store = ( process && process.env.NODE_ENV === 'development' ) ?
    createStore( reducer,window.__REDUX_DEVTOOLS_EXTENSION__
                                && window.__REDUX_DEVTOOLS_EXTENSION__())
    : createStore( reducer ) ;
ReactDOM.render(
    <Provider store={ store  } >
          <React.StrictMode>
            <App />
          </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
