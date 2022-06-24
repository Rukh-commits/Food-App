
import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image,Alert } from 'react-native';
import { Button, TextInput} from 'react-native-paper';

//import{getAuth,signInWithEmailAndPassword} from 'firebase/auth';
//import { initializeApp } from 'firebase/app';
//import {firebaseConfig} from '../firebase';

import { AuthContext } from '../components/context';

import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '642790762431-lkpk913neefn2nmkdus51t6vskcnsq8o.apps.googleusercontent.com',
});




export default function Login({ route, navigation }) {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  
  
  
  const { signIn } = React.useContext(AuthContext);

  
const onGoogleButtonPress=async() =>{
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  auth().signInWithCredential(googleCredential).then((userCredential)=>{
    console.log('Signed in')
    const user=userCredential.user;
    console.log(user)
    Alert.alert("You are logged in")
  })
  .catch(error=>{
    console.log(error)
  })
}

  const handleSignIn=()=>{
    auth().signInWithEmailAndPassword(email,password)
    .then((userCredential)=>{
      console.log('Signed in')
      const user=userCredential.user;
      signIn(user.uid);
      console.log(user)
      Alert.alert("You are logged in")

    })
    .catch(error=>{
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
    <View>
    <Text style={styles.h1}>Hello! Welcome back!</Text>
    <Text style={styles.h3}>You've been missed!</Text>
    </View>

    <View style={styles.midcontainer}>

    <View>
    <Text style={styles.label}>Email</Text>
    <TextInput 
    placeholder="Enter your email"
    value={email.value}
    mode="outlined"
    onChangeText={(text)=>setEmail(text)}
    style={styles.input}></TextInput>
      </View>
      <View>
    <Text style={styles.label}>Password</Text>
    <TextInput 
    placeholder="Enter your password"
    value={password.value}
    mode="outlined"
    onChangeText={(text)=>setPassword(text)}
    style={styles.input}
    secureTextEntry

    ></TextInput>
    </View>

    <Button style={styles.btn} color="#90C888" labelStyle={{ color: "white"}}  mode="contained" onPress={handleSignIn}>Login</Button>

     <Text style={styles.label}> ────────  or Login with  ──────── </Text>

    <View style={styles.hcontainer}>
    <TouchableOpacity style={styles.touchable} onPress={()=>{onGoogleButtonPress()}}>
    <Image style={styles.icon} source={require('../assets/google.png')}/>
    <Text style={{fontWeight:"bold",color:"black",}}>Google</Text>
    </TouchableOpacity>
    </View>

  

    <View style={styles.row}>
    <Text style={{marginBottom:10,color:"black"}}> Don't have an Account? </Text>
    <Text style={{fontWeight:"bold",color:"#90C888"}} onPress={() => navigation.navigate('SignUp')}>
    Sign Up
    </Text>
    </View>

    
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 60,
    padding: 20,
    // backgroundColor:"red",
    
 
  },

  midcontainer:{
    justifyContent:"center",
    alignItems:"center"
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign:"left",
    marginBottom:10,
    color:"black",
   
  },

  h3: {
    color:"grey",
    marginBottom:30,
    color:"black",

  
  },

  label: {
   fontSize: 16,
   marginBottom:10,
   color:"black",

  },

  input: {
    height:50,
    marginBottom:10,
    width:300
   
  },

  btn:{
    marginTop:20,
    width:300,
    marginBottom:40,

  },


  touchable:{
    flexDirection:"row",
    justifyContent:"center",
    borderWidth:1,
    alignItems:"center",
    width:150,
    height:35,
    borderRadius:10,
    borderColor:"#90C888",
  },

  icon:{
    height:25,
    width:25,
    marginRight:6

  },

  hcontainer:{
    marginTop:20,
    justifyContent:"center",
    marginBottom:30
  },
  row:{
    flexDirection:"row",
  }
});

