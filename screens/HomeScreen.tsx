import { Button, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

export default function HomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={{ uri: "https://i.pinimg.com/564x/73/b0/31/73b0311d64455fffea1b7d3b696c92bb.jpg" }}
      style={styles.container}
    >
      <Text style={styles.txt}>Vicente Nenger</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("BottomTab")}
      >
        <Text style={styles.buttonText}>INGRESAR</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#397789f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    backgroundColor: '#727f83f7',
    height: 50,
    width: '80%',
    margin: 10,
    fontSize: 28,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  button: {
    backgroundColor: '#db0a0a9c',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 20,
    cursor:'pointer'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
