import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'


export default function ApiScreen() {
  const API_MUSICA= 'https://jritsqmet.github.io/web-api/musica.json'
  const [musica, setMusica] = useState([]);

  useEffect(() => {
    fetch(API_MUSICA)
    .then(response => response.json())
    .then(datos => setMusica(datos))
    .catch(error => console.log(error)) 

    console.log(musica);
  }, []);

  type Musica ={
    title:string,
    album:string,
    artist:string,
    description:string,
    media:{cover_image:string}
}


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Música</Text>
      <FlatList
        data={musica}
        renderItem={({item}:{item:Musica})=>
          <View style={styles.view} >
            <Text>Tiulo:{item.album}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
  },
  item:{
      backgroundColor: '#a24b11f7',
      margin:10,
      // flexDirection:'row'
  },
  img:{
      height:80,
      width:80,
      resizeMode:'contain'
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  view:{
    marginRight:40,
    marginHorizontal:10
  }
})