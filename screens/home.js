import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
  Alert,
} from 'react-native';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import ViewRecipe from './ViewRecipe';
import WaterIntake from './WaterIntake';
import Bmi from './Bmi';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Avatar} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../components/context';




const Stack = createNativeStackNavigator();
const Home2 = ({navigation, route}) => {

  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ViewRecipe" component={ViewRecipe} />
      <Stack.Screen name="WaterIntake" component={WaterIntake} />
      <Stack.Screen name="Bmi" component={Bmi} />
    </Stack.Navigator>
  );
};

const Home = ({navigation, route}) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [recipes, setRecipes] = useState([]); // Initial empty array of users
  const { signOut } = React.useContext(AuthContext);
  useEffect(() => {
    LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);
      setTimeout(() => {
        auth().onAuthStateChanged(user => {
        })
      }, 1500);
 


  }, []);

  useFocusEffect(
    React.useCallback(() => {
      firestore()
        .collection('Recipe')
        .onSnapshot(querySnapshot => {
          const recipes = [];

          querySnapshot.forEach(documentSnapshot => {
            recipes.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setRecipes(recipes);
          setLoading(false);
        });
    }, []),
  );
  return (
    <View style={styles.container}>
      <ScrollView style={{color: 'white'}}>
          <Button
           style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf:"flex-end"
          }} color="#90C888" labelStyle={{ color: "white"}}  mode="contained" onPress={()=>{
            if(auth().currentUser.displayName!==null){
              Alert.alert("You are logged out via google")
              console.log("user logged out via google")

            GoogleSignin.signOut();
           
          }
            else{

              auth().signOut().catch((err) => console.log(err));
              Alert.alert("You are logged out")
              console.log("user logged out")
            
            
            }
            signOut()

          }}>
              Logout
           
          </Button>
       
        <Text
          style={{
            fontSize: 24,
            color: 'rgb(144,200,136)',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          Hello User,
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: 'black',
            textAlign: 'center',
          }}>
          Find, track and eat healthy food
        </Text>
        <Text
          style={{
            fontSize: 24,
            marginTop: 40,
            color: 'black',
            marginLeft: 20,
            fontWeight: 'bold',
          }}>
          Track your Progress
        </Text>
        <View style={styles.items}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {' '}
            Body mass{'\n'} Index
          </Text>
          <TouchableOpacity
            style={styles.btns}
            onPress={() => navigation.navigate('Bmi')}>
            <Text
              style={{
                textAlign: 'center',
                color: '#9e9bc7',
                fontWeight: 'bold',
              }}>
              View Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.items}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {' '}
            Daily Water{'\n'} Intake
          </Text>
          <TouchableOpacity
            style={styles.btns}
            onPress={() => navigation.navigate('WaterIntake')}>
            <Text
              style={{
                color: '#9e9bc7',
                fontWeight: 'bold',
              }}>
              View Now
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 24,
            marginTop: 40,
            color: 'black',
            marginLeft: 20,
            fontWeight: 'bold',
          }}>
          What's new in recipes?
        </Text>

        <ScrollView>
          {recipes.map(items => (
            <TouchableOpacity
              style={styles.touchable}
              onPress={() =>
                navigation.navigate('ViewRecipe', {recipeId: items.key})
              }>
              <View style={styles.column}>
                <Text style={{letterSpacing: 2}}>CATEGORY</Text>
                <Text style={styles.title}>{items.recipeName}</Text>
              </View>
              <Avatar.Image
                style={{}}
                size={90}
                source={{uri:items.imageUrl}}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30,
    padding: 8,
  },

  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  items: {
    backgroundColor: '#9e9bc7',
    marginHorizontal: 40,
    marginTop: 40,
    height: 100,
    padding: 20,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent:"space-around",
  },
  btns: {
    backgroundColor: 'white',
    marginLeft: 100,
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
  },
  column: {
    width: 150,
  },
  touchable: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginHorizontal: 40,
    borderRadius: 10,
    backgroundColor: '#FFF7F1',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginTop: 5,
  },
});

export default Home2;
