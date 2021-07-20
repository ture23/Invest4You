import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';

import reducers from './reducer'
import App from './App';
import './index.css'

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <HashRouter><Provider store = {store}>
        <App /> 
    </Provider>
    </HashRouter>,
    
    document.getElementById('root'));

// api su zavrseni i rade sve kako treba nalje se ide na react 
// prvo testiramo povezanost izmedju clienta i servera pali dolaze podatci 