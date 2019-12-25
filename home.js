import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';


export default function Home({ navigation }) {



const pressHandler = () =>  {
navigation.navigate('ReviewDetails')
}

  return (
    <View>
      <Text >Home Screen</Text>
  <Button title= 'g to review details now kamel' onPress={pressHandler} />
    </View>
  );
}