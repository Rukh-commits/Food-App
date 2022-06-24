import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';



const UpdateRecipe = ({navigation, route}) => {
  const {recipeId} = route.params;
  const [userId, setUserId] = useState('');
  const [category, setCategory] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [proteins, setProteins] = useState(0);
  const [calories, setCalories] = useState(0);
  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [ing, setIng] = useState([]);
  const [ingr, setIngr] = useState([]);
  const [directions, setDirections] = useState('');
  const [rating, setRating] = useState(0);

  let d = new Date();
  d = d.toDateString();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Pakistani', value: 'Pakistani'},
    {label: 'Chinese', value: 'Chinese'},
    {label: 'Other', value: 'Other'},
  ]);

  const updateRecipeFunc = () => {
    try {
      if (auth().currentUser.uid == userId) {
        firestore()
          .collection('Recipe')
          .doc(recipeId)
          .update({
            userId: auth().currentUser.uid,
            recipeName: recipeName,
            category: value,
            proteins: parseInt(proteins),
            calories: parseInt(calories),
            fats: parseInt(fats),
            carbs: parseInt(carbs),
            ingredients: ing,
            directions: directions,
            rating: rating,
            date: d,
          })
          .then(() => {
            alert('User Updated');
          });
      } else {
        alert("You don't have permissions to edit this recipe!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = () => {
    firestore()
      .collection('Recipe')
      .doc(recipeId)
      .onSnapshot(documentSnapshot => {
        setUserId(documentSnapshot.get('userId'));
        setRecipeName(documentSnapshot.get('recipeName'));
        setCategory(documentSnapshot.get('category'));
        setDirections(documentSnapshot.get('directions'));
        setRating(documentSnapshot.get('rating'));
        console.log(carbs + '' + calories + '' + fats);
      });
  };

  return (
    <View style={styles.container}>
      <Text
        onPress={() => getData()}
        style={{
          fontSize: 24,
          color: 'rgb(144,200,136)',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Update your Recipe
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: 'black',
          marginTop: 20,
          marginHorizontal: 20,
        }}>
        Select Category
      </Text>
      <DropDownPicker
        style={styles.dd}
        open={open}
        value={category}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <ScrollView style={{backgroundColor: 'white'}}>
        <TextInput
          style={styles.textInp}
          label="Recipe Name"
          value={recipeName}
          onChangeText={text => setRecipeName(text)}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            style={styles.textInp3}
            keyboardType="numeric"
            label="Proteins"
            value={proteins}
            onChangeText={text => setProteins(text)}
          />
          <TextInput
            style={styles.textInp3}
            keyboardType="numeric"
            label="Calories"
            value={calories}
            onChangeText={text => setCalories(text)}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            style={styles.textInp3}
            keyboardType="numeric"
            label="Fats"
            value={fats}
            onChangeText={text => setFats(text)}
          />
          <TextInput
            style={styles.textInp3}
            keyboardType="numeric"
            value={carbs}
            label="Carbs"
            onChangeText={text => setCarbs(text)}
          />
        </View>
        <TextInput
          style={styles.textInp}
          label="Ingredients (, seperated)"
          value={ingr}
          onChangeText={text => {
            const arr = text.split(',');
            setIng(arr);
          }}
        />
        <TextInput
          style={styles.textInp2}
          label="Directions"
          value={directions}
          onChangeText={text => setDirections(text)}
        />
        <Button
          labelStyle={{fontSize: 24}}
          onPress={() => {
            updateRecipeFunc();
            navigation.navigate('ViewRecipe', {recipeId: recipeId});
          }}
          mode="contained"
          style={{width: 200, marginHorizontal: 80}}
          color="rgb(144,200,136)">
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  dd: {
    height: 60,
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 5,
    fontSize: 16,
    width: 325,
  },
  textInp: {
    height: 50,
    fontSize: 20,
    margin: 20,
  },
  textInp2: {
    fontSize: 20,
    height: 50,
    margin: 20,
  },
  textInp3: {
    fontSize: 20,
    width: 150,
    margin: 20,
  },
});

export default UpdateRecipe;
