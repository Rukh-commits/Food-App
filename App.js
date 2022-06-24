import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import SignUp from './screens/SignUp'
import Login from './screens/Login'

import Blog from './screens/Blog'

import TabStack from './screens/TabStack';

import auth from '@react-native-firebase/auth';

import { AuthContext } from './components/context';


const Stack = createNativeStackNavigator();




export default function App() {

  const [userToken, setUserToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const authContext = React.useMemo(() => ({
    signIn: (foundUser) => {
      setUserToken(foundUser);
      console.log('user token: ', userToken);
    },
    signOut: () => {
      setUserToken(null);
      console.log("User SignedOut");
    },
    signUp: (CreatedUser) => {
      setUserToken(CreatedUser);
    },
  }), []);

  useEffect(() => {
    setTimeout(() => {
      auth().onAuthStateChanged(user => {
        if (user) {
          setUserToken(user.uid)
          console.log(user)
          console.log("Logged In User:",user.email)
        }
      })
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
    { userToken !== null ?
    (
      <Stack.Navigator>
        <Stack.Screen name="TabStack" component={TabStack} options={{headerShown: false}}/>
        <Stack.Screen name="Blog" component={Blog}/>
      </Stack.Navigator>
    ):
    (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    )
    }
    </NavigationContainer>
    </AuthContext.Provider>

  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },

});