import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const Bmi = ({route, navigation}) => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState('');

  const calculateBmi = () => {
    if (weight < 0 || height < 0) {
      alert('Invalid input data');
    } else {
      const BMI = (weight / Math.pow(height, 2)) * 10000;

      if (BMI > 24.9) {
        setBmi('Overweight');
      } else {
        setBmi('Healthy');
      }
    }
  };
  return (
    <View>
      <Image
        style={{
          height: 200,
          width: 200,
          marginHorizontal: 110,
          marginTop: 30,
        }}
        source={require('../assets/BmiCal.png')}
      />
      <Text
        style={{
          fontSize: 24,
          color: '#9e9bc7',
          textAlign: 'center',
          marginVertical: 30,
          marginHorizontal: 5,
        }}>
        Find Your BMI
      </Text>
      <View style={styles.items}>
        <TextInput
          style={{fontSize: 24, backgroundColor: 'white', marginVertical: 10}}
          keyboardType="numeric"
          onChangeText={w => setWeight(w)}
          label="Weight in kg"
        />
        <TextInput
          style={{fontSize: 24, backgroundColor: 'white', marginVertical: 10}}
          label="Height in cm"
          onChangeText={h => setHeight(h)}
          keyboardType="numeric"
        />
      </View>
      <Text
        style={{
          fontSize: 24,
          color: '#9e9bc7',
          textAlign: 'center',
          marginVertical: 10,
          marginHorizontal: 5,
        }}>
        {bmi}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Button
          onPress={calculateBmi}
          labelStyle={{fontSize: 18}}
          mode="contained"
          style={{
            width: 120,
            marginLeft: 80,
            marginVertical: 20,
            marginRight: 20,
            justifyContent: 'center',
          }}
          color="rgb(144,200,136)">
          Find
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('Home');
          }}
          labelStyle={{fontSize: 18}}
          mode="contained"
          style={{width: 120, marginVertical: 20, justifyContent: 'center'}}
          color="rgb(144,200,136)">
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    backgroundColor: '#9e9bc7',
    marginHorizontal: 40,
    height: 200,
    padding: 20,
    borderRadius: 10,
  },
});
export default Bmi;
