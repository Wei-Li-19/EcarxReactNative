import React from 'react';
import { StackNavigator,SwitchNavigator } from 'react-navigation';
import { View,Text } from 'react-native';


import MainTabView from '../pages/MainTabView';
import Login from '../pages/Login';
import AuthLoadingScreen from '../pages/AuthLoadingScreen';
import DataDetail from '../pages/home/DataDetail'
import About from '../pages/profile/About'

//(RouteConfigs, TabNavigatorConfig)
// 路由配置(RouteConfigs)
// 标签导航器配置(TabNavigatorConfig)

const AppStack = StackNavigator({
  MainTabView:{screen:MainTabView},
  Login:{screen:Login},
  DataDetail:DataDetail,
  About:About
  }, {
  headerMode: 'screen',//screen，页面切换显示过渡变化
   mode:"card",
  //initialRouteParams:{}, //初始路由参数
  //initialRouteName:'Login', //栈默认页面
  //navigationOptions:({ navigation,screenProps }) => ({//可以设置通用导航条
  //  title:'',//页面的标题
  //  header:'', // React元素(组件) 设置为null隐藏标题栏
  //  headerTitle:'',//标题使用的字符串或React元素(组件)
  //  headerRight:'',//标题栏的右侧的React元素(组件)
  //  headerLeft:'',//左侧的React元素(组件)
  //  headerStyle:'',//设置标题栏的样式对象(可以通过修改这个样式去除安卓上的下面线条和阴影)
  //  headerTitleStyle:'',
  //  gesturesEnabled:'', //是否可以使用手势关闭此屏幕。在iOS上默认为true，在Android上为false。
  //})


  /*
  * mode - 定义渲染(rendering)和转换(transitions)的样式式,两种选项(给字符串即可)：
       card - 使用标准的iOS和Android的界面切换，这是默认的。
       modal - 使屏幕从底部滑入，这是一种常见的iOS模式。只适用于iOS，对Android没有作用。
   headerMode - 指定标题(Header)应该如何被渲染,选项：
       float - 渲染一个保持在顶部的标题，并在屏幕更改时显示动画。这是iOS上的常见模式。(即共用一个header 意思就是有title文字渐变效果)
       screen - 每个屏幕都有一个标题，标题与屏幕一起淡入淡出。这是Android上的常见模式(各用各的header 意思就是没有title文字渐变效果)
       none - 不会显示标题(没有header)
   cardStyle - 使用该属性继承或者重载一个在stack中的card的样式.
   transitionConfig - 定义一个返回覆盖默认屏幕的换场动画的对象的函数.
   onTransitionStart - 当Card换场动画即将开始时，调用此函数.
   onTransitionEnd - 当Card换场动画完成时，立即调用此函数.
   */
});
const AuthStack = StackNavigator({ Login: Login });

const SwitchRouters = SwitchNavigator(
  {
    AuthLoading: {screen:AuthLoadingScreen},
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);



export default SwitchRouters;





