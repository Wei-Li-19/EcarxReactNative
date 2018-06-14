import {AsyncStorage } from 'react-native';
import * as types from "../constants/dataActionTypes";
import request from '../utils/request'

import store from "../store/createStore";

export const goLogin = (reqData) => async (dispatch) => {
    try {
        let data  = await request.post("http://mock.xchanger.cn/mock/5b1f403e358b2900111d4fd3/EcarxReactNative/login",reqData);
        if(!data.status){
            return data; 
        }
        let appData = await store.getState().appData;
        appData.user=data.info;
        await AsyncStorage.setItem("appData",JSON.stringify(appData));
        dispatch({type: types.SYSTEM_LOGIN_S, data:data.info});
        return data
    } catch (err) {
        return {status:false,info:err};
    }
};

