/**
 * Created by liwei on 2017/12/15.
 */
import * as types from "../constants/dataMallActionType";

const initialState = {
    goodsList:[],
    bannerList:[],
    goodDetail:{},
    loading:true,
    orderDetail:{}
};

export default function dataMallData(state = initialState,action){

    switch (action.type){
        case types.DATAMALL_LOADING://loading页面控制
            return Object.assign({},state,{loading:action.data});
        case types.DATAMALL_GOODSLIST://第一次加载
            return Object.assign({},state,{goodsList:action.data,loading:false});
        case types.DATAMALL_MOREGOODSLIST://商品列表加载更多
            return Object.assign({},state,{goodsList:state.goodsList.concat(action.data)});
        case types.DATAMALL_BANNER://banner条轮播图
            return Object.assign({},state,{bannerList:action.data});
        case types.DATAMALL_GOODSDETAIL://商品详情
            return Object.assign({},state,{goodDetail:action.data,loading:false});
        case types.DATAMALL_ORDERDETAIL://订单详情
            return Object.assign({},state,{orderDetail:action.data});
        case types.DATAMALL_CLEAR://数据置空
            //console.log('数据置空---------')
            return Object.assign({},state,{goodsList:[], bannerList:[], goodDetail:{}, loading:true, orderDetail:{}});
        default:
            return state;
    }
}
