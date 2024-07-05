import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
  data: {
    key: string;
    name: string;
    cant: number;
    price: number;
    descripcion: string;
  };
};

export default function Informacion({ data }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.name}</Text>
      <Text>Cantidad: {data.cant}</Text>
      <Text>Precio: {data.price}</Text>
      <Text>Descripción: {data.descripcion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
