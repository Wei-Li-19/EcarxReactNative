'use strict';
import React from 'react';
import {
    Animated,
    Image,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    AsyncStorage
    } from 'react-native';

import { connect } from 'react-redux';    
import  util from '../utils/util'
import  styles from "../styles/Login"
import  * as loginAction from '../actions/loginAction';

const loginBgPath= require('../resources/images/login-bg.jpg');
const logoPath= require('../resources/images/logo.png');
const {width,height} = Dimensions.get('window');

class Login extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        header:null
    }); // navigationOptions header设置为null页面就没有导航条了

    constructor(props) {
        super(props);
        this.state={
            formData:{userName:"",password:""},//登录表单数据
            positionExtent:new Animated.Value(0),//图片位置
            show:false
        };
    }

    async componentDidMount(){
        let appData= await AsyncStorage.getItem("appData");
        //AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统，它对于App来说是全局性的。
        // 它可以用来代替LocalStorage。返回值是一个Promise

        if (appData){
            this.setState({formData:JSON.parse(appData),show:true});
        }

        this.animated();
        this.timer=setInterval(()=>{this.animated();}, 20000);
    }

    componentWillUnmount(){

        clearTimeout(this.timer);//销毁定时器
        
    }

    // 移动动画函数 Animated RN 默认支持的组件有 View、Text、Image和ScrollView,其他需要自己封装
    animated = () => {
        Animated.sequence([ // sequence 多动画顺序执行, parallel（同时执行）、stagger 和 delay
            Animated.timing(this.state.positionExtent, { // timing时间动画
                toValue: width-(1220/1334)*height,// 起始速度，必填参数。
                duration: 10000
            }),
            Animated.timing(this.state.positionExtent, {
                toValue: 0,
                duration: 10000
            })
        ]).start();
    };

    _onPressButton = async ()=>{
        const { navigation} = this.props;
        const { formData }=this.state;

        await AsyncStorage.setItem("appData",JSON.stringify(formData));

        navigation.navigate('App');
    };

    forgetPassWord=()=>{

    };
    render() {
        let {formData}=this.state;
        return (
            <View style={styles.viewPager}>
                    <Animated.Image source={loginBgPath}  style={[styles.bgimage,{left:this.state.positionExtent}]}/>
                       <TouchableWithoutFeedback style={styles.bgBtn} onPress={()=>{/*TouchableWithoutFeedback 没有触摸反馈*/}}>
                        <View  style={[styles.bgwrap]}>
                            <Image source={logoPath} style={[styles.logo]}/>
                            <Text style={[styles.title]}>欢迎回来</Text>
                            <View style={[styles.inputwrap]}>
                                <Text style={[styles.label]}>用户名</Text>
                                <TextInput
                                value={formData.userName}
                                onChangeText={(value) =>{
                                formData.userName=value;
                                    this.setState({formData:formData});
                                    if (value) {
                                    this.setState({show:true});
                                    }
                                    else {
                                    this.setState({show:false});
                                    }
                                }}
                                onSubmitEditing={this.focusTextInput}
                                style={[styles.input]}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#7a8187"
                                placeholder="请输入用户名"
                                />
                            </View>
                            <View style={[styles.inputwrap]}>
                                <Text style={[styles.label]}>密码</Text>
                                <TextInput
                                value={formData.password}
                                onChangeText={(value) =>{
                                formData.password=value;
                                this.setState({formData:formData});
                                }}
                                style={[styles.input]}
                                placeholderTextColor="#7a8187"
                                placeholder="请输入密码"
                                secureTextEntry={true}
                                underlineColorAndroid="transparent"
                                onSubmitEditing={this._onPressButton}
                                />
                            </View>
                           {this.state.show
                             ? <TouchableOpacity onPress={this._onPressButton}>
                               <View style={[styles.btn_green]} >
                                   <Text style={[styles.btntext_H]}>登录</Text>
                               </View>
                           </TouchableOpacity>
                            : <TouchableOpacity>
                                 <View style={[styles.btn]} >
                                     <Text style={[styles.btntext]}>登录</Text>
                                 </View>
                             </TouchableOpacity>
                           }

                            <TouchableOpacity onPress={this.forgetPassWord}>
                            <Text style={[styles.forget]}>忘记密码</Text>
                            </TouchableOpacity>
                        </View>
                        </TouchableWithoutFeedback>
            </View>

        );
    }
}


function mapStateToProps(state) {
    const {nav,appData} = state;
    return {
        routes:nav.routes,
        user:appData.user
    }
}
export default connect(mapStateToProps)(Login);

