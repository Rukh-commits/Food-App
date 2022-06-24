import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet,TouchableOpacity,Image,Alert } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
//import{getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
//import { initializeApp } from 'firebase/app';
//import {firebaseConfig} from '../firebase';



import auth from '@react-native-firebase/auth'


export default function SignUp({ route, navigation }) {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  //const app = initializeApp(firebaseConfig);
  //const auth=getAuth(app);
  
  const handleCreateAccount=()=>{
    auth().createUserWithEmailAndPassword(email,password)
    .then((userCredential)=>{
      console.log('Account created')
      const user=userCredential.user;
      console.log(user)
      Alert.alert("Your account has been created.")
    })
    .catch(error=>{
      console.log(error)
      Alert.alert(error)
    })
  }

  return (
    <View style={styles.container}>
    <Text style={styles.h1}>Create Account</Text>
    <Text style={styles.h3}>Connect with your Friends Today!</Text>

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

    <Button style={styles.btn} color="#90C888" labelStyle={{ color: "white"}}  mode="contained" onPress={handleCreateAccount}>Sign Up</Button>



    <View style={styles.row}>
    <Text style={{marginBottom:10, color:"black"}}>Already Have An Account? </Text>
    <Text
    style={{fontWeight:"bold",color:"#90C888"}}
    onPress={() => navigation.navigate('Login')}>
    Log In
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
    marginTop:100,
    alignItems:"center"
 
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



