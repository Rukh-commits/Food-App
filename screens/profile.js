import React from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Profile = ({navigation, route}) => {
  return (
    <View>
      <Text>Screen 2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});

export default Profile;
