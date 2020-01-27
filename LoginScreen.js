
import React,{Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    Alert,
    Image,
    TouchableHighlight
  } from 'react-native';

export default class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email   : '',
        password: '',
      }
    }
  
  
    Event_login = async () => {
      
      const response = await fetch('https://us-central1-kpscheckin.cloudfunctions.net/api/login',{
         method:'POST',
         headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
         },
         body: JSON.stringify({
          email: this.state.email,
          password:this.state.password,
        }),
       })
       const responseJson = await response.json()
       if(responseJson.message !== 'PASS'){
        Alert.alert( `${responseJson.message}`)
       }
       else{
        Alert.alert("Login Success")
       }
    }

  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
          </View>
          
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>
  
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} 
          onPress={this.Event_login}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
  
          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
              <Text>Forgot your password?</Text>
          </TouchableHighlight>
  
          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Register')}>
              <Text>Register</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    loginText: {
      color: 'white',
    }
  });