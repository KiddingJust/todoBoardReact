import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, CLEAR_ERROR_REQUEST, CLEAR_ERROR_SUCCESS, CLEAR_ERROR_FAILURE, LOGOUT_REQUEST, LOGOUT_FAILURE,
         LOGOUT_SUCCESS, USER_LOADING_FAILURE, USER_LOADING_REQUEST, USER_LOADING_SUCCESS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} from '../types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: "",
    userId: "",
    userName: "",
    userRole: "",
    errorMsg: "",
    successMsg: ""
}

const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case REGISTER_REQUEST:
        case LOGOUT_REQUEST:
        case LOGIN_REQUEST:
            return {
                ...state,   //기존의 상태값 얕은복사? 기존것과 비교하는 과정을 거치는게 리액트이므로...
                errorMsg: "",
                isLoading: true //스피나 넣으려고?
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            //action.payload.token으로 받은 걸 token에 저장
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId: action.payload.user.id,
                userRole: action.payload.user.role,
                errorMsg: ""
            }
            
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
            //action.payload.token으로 받은 걸 token에 저장
            localStorage.removeItem("token")
            return {
                ...state,
                ...action.payload,
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: null,
                errorMsg: action.payload.data.msg
            }
        case USER_LOADING_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADING_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
                userId: action.payload._id,
                userName: action.payload.name,
                userRole: action.payload.role
            }
        case USER_LOADING_FAILURE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                userRole: "",
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                token: null,
                user: null,
                userId: null,
                isAuthenticated: false,
                isLoading: false,
                errorMsg:"",
            }

        default:
            return state
        
    } 
}

export default authReducer;