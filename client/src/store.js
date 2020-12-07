import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';

import createRootReducer from './redux/reducers/index'
import rootSaga from './redux/sagas'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const initialState = {}

const middlewares = [sagaMiddleware, routerMiddleware(history)]
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

//배포환경에서는 redux devtools가 되어있으면 웹이 어떻게 구성된지 다 보임
//그래서 배포 때는 개발자 도구가 안보이도록 설정하는 것. 
const composeEnhancer =
    process.env.NODE_ENV === "production" ? compose : devtools || compose;

//Store 만들기
//아래 세개 합쳐서 만드는 것.
const store = createStore(
    createRootReducer(history),
    initialState,   //웹의 모든 상태롤 담고 있는 초기값. 
    composeEnhancer(applyMiddleware(...middlewares))
)
//saga Middleware를 작동하는 것. 
sagaMiddleware.run(rootSaga)

export default store;




