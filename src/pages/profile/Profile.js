import React, { Component } from 'react';
import {StyleSheet,Text,View,TouchableOpacity,Image,Alert,AsyncStorage} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import styles from '../../styles/profile/Profile'
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

class Profile extends Component {



  _outLogin = () => {

    Alert.alert(
      '提示!',
      '是否退出登录',
      [
        {text: '取消', onPress: () => console.log('Cancel')},
        {text: '确定', onPress: async () => {
          let appData = await AsyncStorage.getItem("appData");
          appData = JSON.parse(appData);
          appData.password = '';
          await AsyncStorage.setItem("appData",JSON.stringify(appData));
          this.props.navigation.navigate('Auth');
        }}
      ]
    );
  };

  _clearUserInfo = () => {
    AsyncStorage.removeItem("appData");
  };

  _goAbout = () => {
    this.props.navigation.navigate('About');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <TouchableOpacity style={[styles.topItem,{borderBottomWidth:0.5,borderBottomColor:'#d9d9d9'}]} onPress={()=>{}}>
            <Image source={{uri:'http://scimg.jb51.net/allimg/160706/103-160F6095531355.jpg'}}
                   style={styles.topItemIcon} />
            <View style={styles.topItemRight}>
              <View style={styles.leftText}>
                <Text style={[{fontSize:16,color:'black'}]}>{'Liwei'}</Text>
                <Text style={[{fontSize:16,color:'black'}]}>{'Liwei'}</Text>
              </View>
              <View style={styles.rightIconc}>
                <Icon name={'ios-arrow-forward'} style={styles.rightIcon}/>
              </View>
            </View>
          </TouchableOpacity>



          <TouchableOpacity onPress={()=>{this._outLogin()}} style={[styles.myListItem,{borderBottomWidth:0.5,borderBottomColor:'#d9d9d9'}]}>
            <View style={styles.myListItemIconc}>
              <Icon name={'ios-key-outline'} style={styles.myListItemIcon}/>
            </View>
            <View style={[styles.myListItemTextc]}>
              <View style={styles.myListItemText}>
                <Text style={[{fontSize:11.5,color:'black'}]}>退出登录</Text>
              </View>
              <View style={[styles.rightIconc,{marginLeft:12.5}]}>
                <Icon name={'ios-arrow-forward'} style={styles.rightIcon}/>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{this._clearUserInfo()}} style={[styles.myListItem,{borderBottomWidth:0.5,borderBottomColor:'#d9d9d9'}]}>
            <View style={styles.myListItemIconc}>
              <Icon name={'ios-trash-outline'} style={styles.myListItemIcon}/>
            </View>
            <View style={[styles.myListItemTextc]}>
              <View style={styles.myListItemText}>
                <Text style={[{fontSize:11.5,color:'black'}]}>清空数据</Text>
              </View>
              <View style={[styles.rightIconc,{marginLeft:12.5}]}>
                <Icon name={'ios-arrow-forward'} style={styles.rightIcon}/>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{this._goAbout()}} style={[styles.myListItem,{borderBottomWidth:0.5,borderBottomColor:'#d9d9d9'}]}>
            <View style={styles.myListItemIconc}>
              <Icon name={'ios-link-outline'} style={styles.myListItemIcon}/>
            </View>
            <View style={[styles.myListItemTextc]}>
              <View style={styles.myListItemText}>
                <Text style={[{fontSize:11.5,color:'black'}]}>关于</Text>
              </View>
              <View style={[styles.rightIconc,{marginLeft:12.5}]}>
                <Icon name={'ios-arrow-forward'} style={styles.rightIcon}/>
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }

}

function mapStateToProps({nav}) {
  return {
    routes:nav.routes
  }
}
export default connect(mapStateToProps)(Profile);

