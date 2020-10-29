import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Food from '../Food.js'
export default function () {
    let sandwich = Food('./logo.png', 'sandwich', '20 min')
  const [people, setPeople] = useState([
      sandwich
  ]);

  return (
    <View style={styles.container}>

      <FlatList 
        numColumns={2}
        keyExtractor={(item) => item.id} 
        data={people} 
        renderItem={( {item} ) => ( 
          <Text style={styles.item}>{item.name}</Text>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
  },
});