/**
 * Created by liwei on 2017/12/27.
 */
'use strict'
import * as types from "../constants/dataMallActionType";
import request from '../utils/request'
import {Alert } from 'react-native';

//获取banner图列表
export function getBanners(){
    return dispatch =>{
        return  request.get(`banner/index`)
            .then(data=>{
                //console.log('^^^^^^^^^^^',data);
                dispatch({type:types.DATAMALL_BANNER,data:data.banners});//
            })
            .catch(response =>{
                console.log('catch',response);
                if(response){
                    Alert.alert('错误',response.message?response.message:'服务器错误')
                }
            });
    }
}
//获取商品列表
export function getGoodsList(params){
    return dispatch =>{
        return  request.get(`product`,{params:params})
            .then(data=>{

                if (params.page<2){
                    //console.log('首次请求params',params)
                    dispatch({type:types.DATAMALL_GOODSLIST,data:data.products});
                }else {
                    //console.log('二请求params',params)
                    dispatch({type:types.DATAMALL_MOREGOODSLIST,data:data.products||[]});
                }
                //console.log('########',data);

            })
            .catch(response =>{
                console.log('catch',response);
                if(response){

                    //alert(response)
                    Alert.alert('错误',response.message?response.message:'服务器错误')
                }
            });
    }
}

//获取商品详情
export function getGoodsDetail(pid){
    return dispatch =>{
        return  request.get(`product/`+pid)
            .then(data=>{
                dispatch({type:types.DATAMALL_GOODSDETAIL,data:data});
            })
            .catch(response =>{
                if(response){
                    Alert.alert('错误',response.message?response.message:'服务器错误')
                    //alert(response)
                }
            });
    }
}

//立即购买
export const orderGoods = async(params) => {
    try {
        let data  = await request.post(`order`,params);
        return {status:true,info:data};
    } catch (err) {
        return {status:false,info:err};
    }
};

// 设置支付方式
export const setPayment = async(params) => {
    try {
        let data  = await request.post(`order/payment`,params);
        return {status:true,info:data};
    } catch (err) {
        return {status:false,info:err};
    }
};

// 钱包下单
export const walletOrder = async(params) => {
    try {
        let data  = await request.post(`wallet/order`,params);
        return {status:true,info:data};
    } catch (err) {
        return {status:false,info:err};
    }
};