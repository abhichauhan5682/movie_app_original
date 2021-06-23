import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    DELETE_ACCOUNT,
} from '../action/types';

const initialState={
    token:localStorage.getItem('token'),
    isAuth:false,
    isLoading:false,
    user:null
}

export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case USER_LOADED:
            localStorage.setItem('userId',payload._id);
            return {
                ...state,
                isAuth :true,
                isLoading:false,
                user:payload
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{
                ...state,
                ...payload,
                isAuth:true,
                isLoading:false
            };
        case LOGOUT:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            return{
                ...state,
                isAuth:false,
                isLoading:false,
                token:null
            }
        default:
            return state;        
    }
}