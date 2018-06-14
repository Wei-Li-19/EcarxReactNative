import {StyleSheet} from 'react-native';
import util from '../../utils/util'


const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center'
  },
  body:{
    flex:1,
    width:util._window().width,
    backgroundColor:'#f8f8f8'

  },
  topItem:{
    height:util._pt(174),
    marginTop:16,
    paddingLeft:12.5,
    backgroundColor:'white',
    flexDirection:'row',
    alignItems:'center'
  },
  topItemIcon:{
    width: util._pt(128),
    height: util._pt(128),
    borderRadius:util._pt(128)/2
  },

  topItemRight: {
    flex: 1,
    height:util._pt(174),
    marginLeft: 12.5,
    flexDirection:'row',
    alignItems:'center'
  },
  rightIconc:{
    width:util._pt(24),
    marginRight:12.5,
    justifyContent:'center',
    alignItems:'center'
  },
  leftText:{
    flex:1,
    height:util._pt(76),
    justifyContent:'space-between'
  },
  rightIcon: {
    fontSize:12,
    color:'#cccccc'
  },

  myListItem:{
    paddingLeft:12.5,
    backgroundColor:'white',
    flexDirection:'row',
    alignItems:'center',
    height:43
  },
  myListItemIconc:{
    width:util._pt(32),
    justifyContent:'center',
    alignItems:'center',
    marginRight:12.5
  },
  myListItemIcon:{
    fontSize:20,
    color:'#03aaf4'
  },
  myListItemTextc:{
    flex:1,
    height:42,
    flexDirection:'row',
    alignItems:'center'

  },
  myListItemText:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  }




});
export default styles;