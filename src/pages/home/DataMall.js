import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Platform,BackHandler,Image,FlatList,NativeAppEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import styles from '../../styles/home/DataMall'
import util from '../../utils/util'
import * as dataMallAction from '../../actions/dataMallAction'
import Swiper from 'react-native-swiper';
import LoadingView from '../../components/LoadingView'
import * as types from "../../constants/dataMallActionType";
import LoadingLoadMore from '../../components/LoadingLoadMore'
import Awesome from '../../../node_modules/react-native-vector-icons/FontAwesome';

class DataMall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing:false,
            scrollEnabled: true,
            isLoadMore:true,
            page:2,
            loadMoreTime:0
        };
    }

    componentWillMount() {
        let {dispatch} = this.props;
        dispatch(dataMallAction.getBanners());
        this._loadData();

    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }

    _loadData = () =>{
        let {dispatch} = this.props;
        dispatch(dataMallAction.getGoodsList({page:1}));
    };

    onBackAndroid = () => {
        const routers = this.props.routes;
        //console.log('----routers----',routers);
        if (routers.length > 1) {
            this.props.navigation.dispatch(NavigationActions.back());
            return true;
        } else {
            //if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //    //最近2秒内按过back键，可以退出应用。这里退回为原生页面
            //    return false;
            //}
            //this.lastBackPressed = Date.now();
            //toastShort('再按一次退出应用');
            return true;
        }
    };

    // 渲染每条cell
    _renderItem = ({item,index}) =>{
        let margin = index%2==0? 15:4.5;
        return(
            <TouchableOpacity style={styles.goodsItem} onPress={()=>{this._toDetail(item)}} activeOpacity={1}>
                <View style={[styles.goodsItem1,{marginLeft:margin}]}>
                    <View style={styles.goodsItem2}>
                        <Image style={styles.goodsImage} resizeMethod="resize" resizeMode="stretch" source={{uri:item.image}}/>
                        <View style={styles.goodsInfo}>
                            <View style={styles.InfoView}>
                                <Text style={styles.nameText} numberOfLines={1}>{item.name}</Text>
                            </View>
                            <View style={styles.InfoView}>
                                <Text style={styles.infoText} numberOfLines={1}>{item.infoDescription}</Text>
                            </View>
                            <View style={styles.InfoView}>
                                <Text style={styles.priceText} numberOfLines={1}>{item.price}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </TouchableOpacity>
        )
    };

    // 进入详情页面
    _toDetail(item) {
        this.props.navigation.navigate('DataDetail',{detail:item})// 第一个参数:路由名称, 第二个参数:传递的参数
    };
    // 进入详情页面
    _toOrderList = ()=>{
        this.props.navigation.navigate('OrderList')
    };
    // 每行之间间隔
    _separator = () => {
        return <View style={{height:10}}/>;
    };

    // 下拉刷新
    _onRefresh = () =>{
        let {dispatch} = this.props;
        let params = {page:1};
        dispatch(dataMallAction.getGoodsList(params)).then(()=>{     this.setState({isRefreshing: false}) });
        this.setState({isRefreshing: true,scrollEnabled:true,page:2});
    };

    // 上拉加载更多
    _onEndReached = (distanceFromEnd) =>{
        let {dispatch} = this.props;
        //判断能否进行上拉加载
        if (distanceFromEnd.distanceFromEnd>0&&this.state.scrollEnabled&&(Date.now()-this.state.loadMoreTime)>1000) {
            //console.log('渲染上拉加载时的footer');
            this.setState({isLoadMore:true,loadMoreTime:Date.now()});
            let productId = '';
            let goodsList = this.props.dataMallData.goodsList;
            if (goodsList.length>0){
                productId = goodsList[goodsList.length-1].productId
            }
            let params = {page:this.state.page};
            dispatch(dataMallAction.getGoodsList(params)).then(()=>{
                goodsList = this.props.dataMallData.goodsList;
                if(goodsList.length > 0 && productId == goodsList[goodsList.length-1].productId){//无新数据了
                    this.setState({scrollEnabled:false,isLoadMore:false});
                    //console.log('无新数据了')
                }else{
                    this.setState({page:this.state.page+1,isLoadMore:false});
                    //console.log('还有新数据了')
                }
            });
        }else {
            if ( this.props.dataMallData.goodsList.length<=4){
                this.setState({isLoadMore:false}) ;
            }
        }
    };

    // 渲染上拉加载时的footer
    _ListFooterComponent = () =>{
        if(this.state.isLoadMore ){

            return <LoadingLoadMore/>
        }else {
            return<LoadingLoadMore LoadMoreText="-没有更多了-"/>
        }
    };

    _renderSwiper = () =>{
        const {dataMallData} = this.props;
        return(
            <View style={{height:212}}>
                <View style={styles.mallTitle}>
                    <Text style={styles.titleText}>流量商城</Text>
                </View>
                {dataMallData.bannerList.length>0&&<Swiper
                    loop={true}
                    showsPagination={false}
                    autoplay={true}
                    showsPagination={true}
                    dot={<View style={styles.customDot} />}
                    activeDot={<View style={styles.customActiveDot} />}
                    paginationStyle={{bottom: 10,justifyContent:'flex-end',paddingRight:25 }}
                    autoplayTimeout={4}>
                    {
                        this.props.dataMallData.bannerList.map((item,index)=>{
                            return(
                                <View style={styles.banner} key={index}>
                                    <Image  style={styles.bannerImage}
                                            resizeMethod="resize"
                                            resizeMode="stretch"
                                            source={{uri:item.image}} />
                                </View>
                            )
                        })
                    }
                </Swiper>}
                <View style={{height:10}}/>
            </View>
        )
    };
    render() {
        const {dataMallData} = this.props;
        if (dataMallData.loading){
            return(<LoadingView/>)
        }else {
            return (
                <View style={styles.container}>
                    <FlatList
                        style={{flex:1}}
                        columnWrapperStyle={styles.columnWrapperStyle}
                        ListHeaderComponent={this._renderSwiper}
                        keyExtractor={(item, index) => index}
                        data={dataMallData.goodsList}
                        renderItem={this._renderItem}
                        numColumns={2}
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        onEndReachedThreshold={0.5}
                        onEndReached={(distanceFromEnd)=>{this._onEndReached(distanceFromEnd)}}
                        ListFooterComponent={this._ListFooterComponent}
                    />
                </View>
            );
        }

    }
}
function mapStateToProps(state) {
    const {dataMallData,nav} = state;
    return {
        dataMallData,
        routes:nav.routes
    }
}


export default connect(mapStateToProps)(DataMall);

