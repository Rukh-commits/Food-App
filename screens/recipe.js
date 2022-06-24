import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {TextInput, Button, Searchbar, Avatar} from 'react-native-paper';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import ViewRecipe from './ViewRecipe';
import AddRecipe from './AddRecipe';
import UpdateRecipe from './UpdateRecipe';

const Stack = createNativeStackNavigator();
const RecipeBook = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="AddRecipe" component={AddRecipe} />
      <Stack.Screen name="ViewRecipe" component={ViewRecipe} />
      <Stack.Screen name="UpdateRecipe" component={UpdateRecipe} />
    </Stack.Navigator>
  );
};

const Recipe = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [recipeId, setRecipeId] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [recipes, setRecipes] = useState([]); // Initial empty array of users
  const [recipes2, setRecipes2] = useState([]); // Initial empty array of users

  const searchRecipe = () => {
    try {
      firestore()
        .collection('Recipe')
        .where('recipeName', '==', searchQuery)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size <= 0) {
            alert('No data found');
          } else {
            const recipes = [];

            querySnapshot.forEach(documentSnapshot => {
              recipes.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });

            setRecipes(recipes);
            setLoading(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      firestore()
        .collection('Recipe')
        .where('rating', '>=', 2)
        .get()
        .then(querySnapshot => {
          const recipes2 = [];

          querySnapshot.forEach(documentSnapshot => {
            recipes2.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setRecipes2(recipes2);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  });
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

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onIconPress={() => searchRecipe()}
          />
          <View style={styles.addBtn}>
            <Button
              labelStyle={{fontSize: 24}}
              style={styles.btn2}
              mode="contained"
              color="#ffffff"
              onPress={() => navigation.navigate('AddRecipe')}>
              +
            </Button>
          </View>
        </View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginLeft: 20,
            color: 'black',
          }}>
          Trending
        </Text>

        <ScrollView horizontal={true}>
          {recipes2.map(items => (
            <View
              style={{
                width: 120,
                height: 150,
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ViewRecipe', {recipeId: items.key})
                }>
                <View style={styles.recipeStyling}>
                  <Avatar.Image
                    style={{}}
                    size={100}
                    source={{
                      uri: items.imageUrl,
                    }}
                  />
                  <Text
                    style={{
                      marginHorizontal: 10,
                      fontSize: 20,
                      color: 'black',
                    }}>
                    {items.recipeName}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginLeft: 20,
            color: 'black',
          }}>
          Recipes
        </Text>
        <ScrollView>
          {recipes.map(items => (
            <TouchableOpacity
              style={styles.touchable}
              onPress={() =>
                navigation.navigate('ViewRecipe', {recipeId: items.key})
              }>
              <View style={styles.column}>
                <Text style={{letterSpacing: 2,color:"black"}}>CATEGORY</Text>
                <Text style={styles.title}>{items.recipeName}</Text>
              </View>
              <Avatar.Image
                style={{}}
                size={70}
                source={{
                  uri: items.imageUrl,
                }}
              />
              <TouchableOpacity
                style={styles.btns}
                onPress={() => navigation.navigate('UpdateRecipe',{recipeId: items.key})}>
                <Text
                 style={{
                textAlign: 'center',
                color: '#9e9bc7',
                fontWeight: 'bold',
                }}>
              Update
              </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    flex: 1,
  },
  inp: {
    justifyContent: 'center',
    width: 200,
    backgroundColor: 'white',
  },
  search: {
    marginVertical: 30,
    borderColor: 'rgb(144,200,136)',
    borderWidth: 3,
    width: 280,
    borderRadius: 10,
    marginLeft: 20,
    flexDirection: 'row',
  },
  addBtn: {
    marginVertical: 30,
    borderRadius: 10,
    marginLeft: 20,
    justifyContent: 'center',
  },
  btn: {
    height: 67,
    justifyContent: 'center',
    fontSize: 30,
  },
  btn2: {
    marginLeft: 10,
    height: 50,
    width: 10,
    justifyContent: 'center',
    backgroundColor: 'rgb(144,200,136)',
    borderRadius: 200,
  },
  txt: {
    fontSize: 20,
    color: 'black',
  },
  recipeStyling: {
    padding: 2,
    alignItems: 'center',
    borderColor: 'rgb(144, 200, 136)',
  },
  touchable: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  btns: {
    backgroundColor: 'white',
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
  },
});

export default RecipeBook;
