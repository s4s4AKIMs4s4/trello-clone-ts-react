import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Mediator';
import Login from './components/Login';
import {Provider} from "react-redux";
import {store} from "./store";
import './styles/Antd.css'
import AuthPage from './components/authPage';

  ReactDOM.render(
    <Provider store={store}>
            <AuthPage/>
    </Provider>,
document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
