import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { Provider } from 'react-redux'
import rootReducer from './redux/reducers/index';
import { createStore } from 'redux';

const store = createStore(rootReducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
  rootElement
);
