import React, { Component } from 'react';
import {TabNavigator} from 'react-navigation';
import Home from './home/DataMall'
import Profile from './profile/Profile'
import Second from './second/Second';

export default TabNavigator({
  Home: { screen: Home },
  Second: { screen: Second },
  Profile: { screen: Profile }
});
