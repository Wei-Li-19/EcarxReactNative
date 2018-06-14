/**
 * Created by liwei on 2018/6/12.
 */
import React, { Component } from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';


class About extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle: { backgroundColor: '#FAFAFA',borderBottomWidth:0,elevation: 0},
    headerTitleStyle: { color: '#333', alignSelf: 'center' },
    headerTintColor: '#999',
    headerBackTitle: null,
    headerRight: <View style={{ width: 24 }}/>,
    headerLeft: (
      <TouchableOpacity onPress={navigation.state.params?navigation.state.params.goBack:null} style={{flex:1,flexDirection:'row',alignItems:'center'}}>
        <Icon name='ios-arrow-back' color={'#666666'}  style={{fontSize:25,paddingHorizontal:20,paddingVertical:10}} />
      </TouchableOpacity>
    ),
    title:'关于'
  });

  componentDidMount() {

    this.props.navigation.setParams({ // 将操作函数以参数的形式传入到导航条中,它们不在一个this作用域中
      goBack:this._goBack
    });
  }

  _goBack = () => {

    const { routes,navigation } = this.props;
    console.log('this.props.navigation',navigation);

    //this.props.navigation.goBack(); // 不传入key 默认返回上层路由

    console.log('routes',routes);
    //navigation.goBack(routes[1].routes[1].key); 返回指定路由,key为要返回的路由的key, 例如 当前路由栈page1, page2, page3, page4, 如果想从page4回跳到page2, 传入page3.key
    //navigation.pop(); // 返回上层路由
    //navigation.popToTop() // 返回根路由

  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={require('../../resources/images/about_logo.png')} style={styles.logo}/>
      </SafeAreaView>
    );
  }

};


function mapStateToProps({nav}) {
  return {
    routes:nav.routes
  }
}
export default connect(mapStateToProps)(About);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center'
  },
  logo: {
    width:228,
    height:74
  }
});