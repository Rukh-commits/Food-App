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
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const WaterIntake = ({route, navigation}) => {
  let d = new Date();
  d = d.toDateString();
  const [waterIntake, setWaterIntake] = useState(0);
  const [waterLog, setWaterLog] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true on component mount

  const addWaterIntake = () => {
    try {
      if (waterIntake < 0 || waterIntake > 20) {
        alert('Invalid value for water Intake');
      } else {
        firestore()
          .collection('Water')
          .add({
            userId:auth().currentUser.uid,
            waterIntake: waterIntake,
            date: d,
          })
          .then(() => {
            console.log('Water Log Updated');
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);
    try {
      firestore()
        .collection('Water')
        .where('userId', '==', auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size <= 0) {
            alert('No data found');
          } else {
            const waterLog = [];

            querySnapshot.forEach(documentSnapshot => {
              waterLog.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });

            setWaterLog(waterLog);
            console.log(waterLog);
            setLoading(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <ScrollView>
      <Image
        style={{
          height: 150,
          width: 200,
          marginHorizontal: 110,
        }}
        source={require('../assets/waterIntake.png')}
      />
      <Text
        style={{
          fontSize: 24,
          color: '#9e9bc7',
          textAlign: 'center',
          marginVertical: 30,
          marginHorizontal: 5,
        }}>
        Your body needs water!
      </Text>
      <View style={styles.items}>
        <TextInput
          style={{fontSize: 24, backgroundColor: 'white', marginVertical: 30}}
          onChangeText={text => setWaterIntake(text)}
          keyboardType="numeric"
          label="Glasses of water"
        />
      </View>
      <Button
        onPress={() => {
          navigation.navigate('Home');
          addWaterIntake();
        }}
        labelStyle={{fontSize: 24}}
        mode="contained"
        style={{width: 200, marginLeft: 120, marginVertical: 5}}
        color="rgb(144,200,136)">
        Submit
      </Button>
      <View>
        <Text
          style={{
            fontSize: 24,
            color: '#9e9bc7',
            textAlign: 'center',
            marginVertical: 30,
            marginHorizontal: 5,
          }}>
          Water Log
        </Text>
        <ScrollView>
          {waterLog.map(items => (
            <View
              style={{
                width: 400,
                justifyContent: 'center',
                flexDirection: 'row',
                height: 100,
                padding: 10,
                margin: 10,
                borderWidth: 2,
                borderRadius: 10,
              }}>
              <Text style={styles.waterLog}>
                {items.waterIntake} glasses on
              </Text>
              <Text style={styles.waterLog}>{items.date}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  items: {
    backgroundColor: '#9e9bc7',
    marginHorizontal: 40,
    marginBottom: 25,
    justifyContent: 'center',
    height: 180,
    padding: 20,
    borderRadius: 10,
  },
  waterLog: {
    marginHorizontal: 10,
    fontSize: 22,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default WaterIntake;
