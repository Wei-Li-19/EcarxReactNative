import {StyleSheet,Dimensions} from 'react-native';
import  util from '../utils/util'

const {width,height} = Dimensions.get('window')

const styles=StyleSheet.create({
    viewPager: {
        flex: 1,
        width:util._window().width,
        position:"relative"
    },
    bgimage:{
       width:(1220/1334)*height,
       height:height,
       position:"absolute",
    },
    bgBtn:{
        width:(1220/1334)*height,
        height:height,  
        flex:1,
    },
    bgwrap:{
        paddingLeft:30,
        paddingRight:30,
        paddingTop:98,
        width:util._window().width,
        backgroundColor:'transparent',
        position:"absolute",
        left:0,
    },
    inputwrap:{
        marginTop:25
    },
    title:{ 
        color:"#ffffff",
        fontSize:23,
        marginLeft:4
    },
    label:{
        color:"#dfe4ea",
        fontSize:14,
        marginLeft:4,
    },
    forget:{
        color:"#dfe4ea",
        fontSize:14,
        marginLeft:4,
        marginTop:10
    },
    input:{
        height: 50,
        fontSize:20,
        flex:1,
        borderBottomColor:"#7a8187",
        borderBottomWidth:1,
        color:"white"
    },
    btn:{
        height:40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:"center",
        backgroundColor:"rgba(255,255,255,0.2)",
        borderRadius:4,
        marginTop:20,
    },
    btn_green:{
        height:40,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:"center",
        backgroundColor:"rgba(60,179,113,0.6)",
        borderRadius:4,
        marginTop:20,
    },
    logo:{
        width:116,
        height:21,
        marginBottom:23,
        marginLeft:5
    },
    
    btntext:{
        color:"#acaead"
    },
    btntext_H:{
        color:"white"
    }
})
export default styles;