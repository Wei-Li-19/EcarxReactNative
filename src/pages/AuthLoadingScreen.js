import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Loading from '../components/Loading'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    let appData = await AsyncStorage.getItem('appData');

    if (appData) {
      appData = JSON.parse(appData);

      setTimeout(()=>{
        this.props.navigation.navigate(appData.userName=='Liwei' ? 'App' : 'Auth');
      },2000);
    }else {
      this.props.navigation.navigate('Auth');
    }

  };

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Loading loadingText="加载中"/>
      </View>
    );
  }
}

export default AuthLoadingScreen