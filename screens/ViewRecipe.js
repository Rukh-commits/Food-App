import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TextInput, Button} from 'react-native-paper';
import UpdateRecipe from './UpdateRecipe';

const Stack = createNativeStackNavigator();

const ViewRecipe = ({navigation, route}) => {
  const {recipeId} = route.params;
  const [recipeName, setRecipeName] = useState('');
  const [category, setCategory] = useState('');
  const [proteins, setProteins] = useState(0);
  const [calories, setCalories] = useState(0);
  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [ing, setIng] = useState([]);
  const [directions, setDirections] = useState('');
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const [ingredients, setIngredients] = useState('');

  useEffect(() => {
    LogBox.ignoreLogs(['source.uri should not be an empty string']);
    firestore()
      .collection('Recipe')
      .doc(recipeId)
      .onSnapshot(documentSnapshot => {
        setRecipeName(documentSnapshot.get('recipeName'));
        setCategory(documentSnapshot.get('category'));
        setProteins(documentSnapshot.get('proteins'));
        setCalories(documentSnapshot.get('calories'));
        setFats(documentSnapshot.get('fats'));
        setCarbs(documentSnapshot.get('carbs'));
        setIng(documentSnapshot.get('ingredients'));
        setIngredients(ing.join('\n'));
        setDirections(documentSnapshot.get('directions'));
        setRating(documentSnapshot.get('rating'));
        setImageUrl(documentSnapshot.get('imageUrl'));
      });
  });

  const addRating = () => {
    try {
      firestore()
        .collection('Recipe')
        .doc(recipeId)
        .update({
          rating: rating + 1,
        })
        .then(() => {
          console.log('User updated!');
          alert("Thank you for your response!");
        });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecipe = () => {
    try {
      firestore()
        .collection('Recipe')
        .doc(recipeId)
        .delete()
        .then(() => {
          console.log('User deleted!');
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={{
            fontSize: 24,
            color: 'rgb(144,200,136)',
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          {recipeName}
        </Text>
        <Image
          style={{
            height: 140,
            width: 200,
            marginHorizontal: 110,
            marginVertical: 20,
            borderRadius: 30,
          }}
          source={{uri: imageUrl}}
        />
        <View style={styles.nutr}>
          <Text style={styles.nutrText}>
            Protein {'\n'}
            {proteins}
          </Text>
          <Text style={styles.nutrText}>
            Calories {'\n'}
            {calories}
          </Text>
          <Text style={styles.nutrText}>
            Fat {'\n'}
            {fats}
          </Text>
          <Text style={styles.nutrText}>
            Carbs {'\n'}
            {carbs}
          </Text>
        </View>
        <View style={styles.midContainer}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            marginTop:30,
          }}>Directions
        </Text>
        <Text style={styles.description}>{directions}</Text>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            marginTop:30,
          }}>Ingredients
        </Text>
        <ScrollView>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'left',
              lineHeight:40,
              marginTop: 10,
              alignSelf:"flex-start",
              width:400,
              backgroundColor: '#FFF8EF',
              paddingHorizontal:20,
              color: '#F28A55',
              
            }}>
            {ingredients}
          </Text>
        </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            margin: 20,
            justifyContent: 'center',
            margin: 20,
          }}>
            <View style={styles.btnpane}>
          <Button
            icon="thumb-up"
            labelStyle={{fontSize: 18,color:"white"}}
            onPress={() => addRating()}
            mode="contained"
            style={{
            marginTop:10,
            width:100,
            alignSelf:"flex-end",
            marginBottom:40,}}
            color="rgb(144,200,136)">
            Like
          </Button>
          <Button
            icon="delete"
            labelStyle={{fontSize: 18,color:"white"}}
            onPress={() => {deleteRecipe();alert("Recipe Deleted"),navigation.goBack();}}
            mode="contained"
            style={{
            marginTop:10,
            width:140,
            alignSelf:"flex-end",
            marginBottom:40,}}
            color="rgb(144,200,136)">
            Delete
          </Button>
          </View>
          
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop:40,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  nutr: {
    flexDirection: 'row',
    backgroundColor: '#FFF8EF',
    justifyContent: 'center',
  },
  nutrText: {
    color: '#F28A55',
    textAlign: 'center',
    margin: 15,
    fontSize: 18,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'justify',
    color: 'grey',
    lineHeight: 25,
  },
  midContainer:{
    justifyContent:"center",
    padding:20,
  },
  btnpane:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:260,
  }
});

export default ViewRecipe;
