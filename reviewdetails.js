import React from 'react';
import { StyleSheet, View, Text,Button } from 'react-native';


export default function ReviewDetails({navigation}) {

      const pressHandler = () =>  {
navigation.navigate('Camera')
}

  return (


    <View>
      <Text>ReviewDetails Screen boolocks</Text>
        <Button title= 'go to camera now' onPress={pressHandler} />
    </View>
  );
}