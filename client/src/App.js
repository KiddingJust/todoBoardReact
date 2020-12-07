import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from './store';
import MyRouter from './routes/Router';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/custom.scss"

const App = () => {
  return (
    //사이트의 모든 상태 관리는 store에서 맡음. 
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MyRouter />
      </ConnectedRouter>
    </Provider>
  ); 
};

export default App;
