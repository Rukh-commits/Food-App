import React, {useState} from 'react';
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
import UpdateRecipe from './UpdateRecipe';

const AddRecipe = ({navigation, route}) => {
  const [userId, setUserId] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [proteins, setProteins] = useState(0);
  const [calories, setCalories] = useState(0);
  const [fats, setFats] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [ing, setIng] = useState([]);
  const [directions, setDirections] = useState('');
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  let d = new Date();
  d = d.toDateString();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Pakistani', value: 'Pakistani'},
    {label: 'Chinese', value: 'Chinese'},
    {label: 'Other', value: 'Other'},
  ]);

  const addRecipe = () => {
    try {
      firestore()
        .collection('Recipe')
        .add({
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
          imageUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-jvWfj4AT7mo6H_vQB2rd56iMv_ZQ2kKaD7h1ItmquHhSJRnpPHbumliU9FwzUcMGMEs&usqp=CAU',
        })
        .then(() => {
          console.log('Recipe Added');
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          color: 'rgb(144,200,136)',
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Add your Recipe
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
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <ScrollView style={{backgroundColor: 'white'}}>
        <TextInput
          style={styles.textInp}
          label="Recipe Name"
          onChangeText={text => setRecipeName(text)}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            style={styles.textInp3}
            keyboardType="numeric"
            label="Proteins"
            onChangeText={text => setProteins(text)}
          />
          <TextInput
            style={styles.textInp3}
            keyboardType="numeric"
            label="Calories"
            onChangeText={text => setCalories(text)}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            style={styles.textInp3}
            keyboardType="numeric"
            label="Fats"
            onChangeText={text => setFats(text)}
          />
          <TextInput
            style={styles.textInp3}
            keyboardType="numeric"
            label="Carbs"
            onChangeText={text => setCarbs(text)}
          />
        </View>
        <TextInput
          style={styles.textInp}
          label="Ingredients (, seperated)"
          onChangeText={text => {
            const arr = text.split(',');
            setIng(arr);
          }}
        />
        <TextInput
          style={styles.textInp2}
          label="Directions"
          onChangeText={text => setDirections(text)}
        />
        <Button
          labelStyle={{fontSize: 24}}
          onPress={() => addRecipe()}
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

export default AddRecipe;
