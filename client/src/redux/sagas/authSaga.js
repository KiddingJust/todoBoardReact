import axios from 'axios';
import {call, put, takeEvery, all, fork} from 'redux-saga/effects';
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST, USER_LOADING_SUCCESS, USER_LOADING_FAILURE, USER_LOADING_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, CLEAR_ERROR_REQUEST, CLEAR_ERROR_FAILURE, CLEAR_ERROR_SUCCESS } from '../types'


// Login

const loginUserAPI = (loginData) => {
    console.log(loginData, "loginData");
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    return axios.post('api/auth', loginData, config)
}

function* loginUser(action) {
    try{
        const result = yield call(loginUserAPI, action.payload)
        console.log(result)
        yield put({
            type: LOGIN_SUCCESS,
            //넘겨주는값
            payload: result.data
        })
    }catch(e) {
        yield put({
            type: LOGIN_FAILURE,
            payload: e.response
        })
    }
}

//로그인 Request 체크. request 들어오면 loginUser 불러옴
function* watchLoginUser() {
    yield takeEvery(LOGIN_REQUEST, loginUser)
}


//LOGOUT -- 서버랑 통신할 부분은 없음. 
function* logout(action) {
    try{
        yield put({
            type: LOGOUT_SUCCESS
        })
    }catch(e) {
        yield put({
            type: LOGOUT_FAILURE,
            payload: e.response
        });
        console.log(e)
    }
}

function* watchLogout() {
    yield takeEvery(LOGOUT_REQUEST, logout)
}


//  User Loading - 매번 로그인과 비슷. 챕터가 넘어가거나 할 떄 자동 로그인 느낌. 
//  다른 점은 token 값만으로 성공 여부 판별. 

const userLoadingAPI = (token) => {
    console.log(token);
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    if(token){
        config.headers["x-auth-token"] = token
    }

    return axios.get('api/auth/user', config)
}

function* userLoading(action) {
    try{
        console.log(action, "userLoading")
        const result = yield call(userLoadingAPI, action.payload)
        yield put({
            type: USER_LOADING_SUCCESS,
            //넘겨주는값
            payload: result.data
        })
    }catch(e) {
        yield put({
            type: USER_LOADING_FAILURE,
            payload: e.response
        })
    }
}

function* watchuserLoading() {
    yield takeEvery(USER_LOADING_REQUEST, userLoading)
}


// Register

const registerUserAPI = (req) => {
    console.log(req, "req");
    return axios.post('api/user', req)
}

function* registerUser(action) {
    try{
        const result = yield call(registerUserAPI, action.payload)
        console.log(result, "RegisterUser Data")
        yield put({
            type: REGISTER_SUCCESS,
            //넘겨주는값
            payload: result.data
        })
    }catch(e) {
        yield put({
            type: REGISTER_FAILURE,
            payload: e.response
        })
    }
}

function* watchregisterUser() {
    yield takeEvery(REGISTER_REQUEST, registerUser)
}



// Clear Error

function* clearError(action) {
    try{
        yield put({
            type: CLEAR_ERROR_SUCCESS,
        })
    }catch(e) {
        yield put({
            type: CLEAR_ERROR_FAILURE,
        });
    }
}

function* watchclearError() {
    yield takeEvery(CLEAR_ERROR_REQUEST, clearError)
}





//모듈화
export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchuserLoading),
        fork(watchregisterUser),
        fork(watchclearError)
    ])
}