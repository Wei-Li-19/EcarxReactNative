'use strict';
import axios from 'axios';
import * as configs from "../constants/configs";
//配置headers头等通用请求配置
const httpConfig={
    baseURL:__DEV__? configs.API_DEV:configs.API_PRO,
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json;responseformat=3',
        'X-STORE': 'FLOW',
        'X-ENV-TYPE':__DEV__? 'testing':'testing',
        'X-APP-ID':'M820igii5lL4tcy'
    },
    timeout: __DEV__? configs.API_TIMEOUT_DEV:configs.API_TIMEOUT_PRO
};

// 创建axios实例(axios具体了解中文文档:https://www.kancloud.cn/yunye/axios)
const request=axios.create(httpConfig);

//请求拦截器(插入一些请求配置信息)
request.interceptors.request.use(async config=>{

    return config;
});

//响应拦截器(可以做一些通用的响应处理和错误处理)
request.interceptors.response.use(response=>{
    //console.log("************************",response);
    if(response.status==200){
        return response.data;
    }
    return response;

},err=>{
    console.log("*******err.response^^^^^^^",err);
    if(err.code&&err.code=='ECONNABORTED'){
        return Promise.reject(new Error('连接超时!'));
    }
    if(err.message&&err.message=='Network Error'){
        return Promise.reject(new Error('网络未连接!'));
    }
    if(err.response.data.message){
        err.message=err.response.data.message;//后端不同这里要单独处理
    }


    return Promise.reject(err);
});


export default request;
