import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import authReducer from './authReducer'

//history를 사용한 connectRouter를 router라 명명
//향후 redux 관련된 걸 불러올 땐 router를 불러오면 됨.

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    auth: authReducer,
});

export default createRootReducer;

