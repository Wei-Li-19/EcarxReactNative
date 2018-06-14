import * as systemTypes from '../constants/dataActionTypes'


const initialState = {
    user:{}, //当前用户信息
    loginReading:false //登录加载中
};

export default function appData(state = initialState,action) {
  switch (action.type) {
    case systemTypes.SYSTEM_LOGIN_S:
        return Object.assign({}, state, {
            user:action.data
        })
    case systemTypes.SYSTEM_LOGIN_READING:
        return Object.assign({}, state, {
            loginReading:action.data
        })
    default:
        return state
  }
};


