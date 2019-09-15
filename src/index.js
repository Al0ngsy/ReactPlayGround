import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './App'
import * as serviceWorker from './serviceWorker';
// Reducers
import reduxReducers from './reducers'

const store = createStore(reduxReducers)

ReactDOM.render(
    // Provider make the store available to all container components 
    // in the App without to pass it explicitly
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
