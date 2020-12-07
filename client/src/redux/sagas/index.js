import {all, fork} from 'redux-saga/effects';
import axios from 'axios';

import authSaga from './authSaga'
import dotenv from 'dotenv'
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL
//function* 은, generator 함수라 하여,
//일반 함수는 값을 하나만 반환하지만
//이 함수는 여러 값을 반환할 수 있음. 최신 문법. 
//향후에, 이 배열 안에 여러가지 sagas 관련된 걸 넣게 됨.
export default function* rootSaga() {
    yield all([
        fork(authSaga)
    ]);
}