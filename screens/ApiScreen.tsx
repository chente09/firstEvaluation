import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function ApiScreen() {
  const API_FUTURAMA='https://api.sampleapis.com/futurama/characters'
  const [data, setdata] = useState([])

  useEffect(() => {
    fetch(API_FUTURAMA)
    .then(response => response.json())
    .then(datos => setdata(datos))
    .catch(error => console.log(error))
    
    console.log(data);
  }, [])

  type Personaje ={
    name: {first:string, last:string},
    species: string,
    images: {main:string},
    age:number,
    homePlanet: string,
    occupation: string
  }


  return (
    <View>
    <Text style={{fontSize:20, textAlign:'center'}}>Lista</Text>
    <FlatList 
      data={ data }
      renderItem={({item}:{item: Personaje})=>
        <View style={styles.item}>
          <View style={styles.view}>
            <Text>Nombre: {item.name.first}{item.name.last}</Text>
            <Text>Especie: {item.species}</Text>
            <Text>Edad: {item.age}</Text>
            <Text>Planeta: {item.homePlanet}</Text>
            <Text>Ocupación: {item.occupation}</Text>
            </View>
            <Image 
            src={item.images.main}
            style={styles.img}
            />
        </View>
      }
    />
  </View>
  );
}

const styles = StyleSheet.create({
  item:{
    backgroundColor:'#666',
    margin:5,
    flexDirection:'row',
    
  },
  img:{
    height:'80%',
    width:'40%',
    resizeMode:'contain'
  },
  view:{
    marginRight:40,
    marginHorizontal:10
  }
})
