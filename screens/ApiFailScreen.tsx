import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function ApiFailScreen() {
  const API_MUSICA = 'https://jritsqmet.github.io/web-api/musica.json';
  const [musica, setMusica] = useState([]);

  useEffect(() => {
    fetch(API_MUSICA)
      .then(response => response.json())
      .then(datos => {
        console.log('Datos de la API:', datos);  // Log para verificar los datos
        setMusica(datos);
      })
      .catch(error => {
        console.log('Error al cargar los datos:', error);
      });
  }, []);

  type Musica = {
    title: string;
    album: string;
    artist: string;
    description: string;
    media: { cover_image: string };
  };

  const mostrarInformacion = (item: Musica) => {
    Alert.alert(
      'Información de la Música',
      `Título: ${item.title}\nÁlbum: ${item.album}\nArtista: ${item.artist}\nDescripción: ${item.description}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Música</Text>
      <FlatList
        data={musica}
        renderItem={({ item }: { item: Musica }) =>
          <TouchableOpacity style={styles.item} onPress={() => mostrarInformacion(item)}>
            <Image source={{ uri: item.media.cover_image }} style={styles.img} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Título: {item.title}</Text>
              <Text style={styles.text}>Álbum: {item.album}</Text>
              <Text style={styles.text}>Artista: {item.artist}</Text>
            </View>
          </TouchableOpacity>
        }
        keyExtractor={(item) => item.title}  // Asegúrate de que cada título sea único
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 80,
    width: 80,
    resizeMode: 'contain',
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
});