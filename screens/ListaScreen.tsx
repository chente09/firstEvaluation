import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { db } from '../config/Config'
import { onValue, ref, remove, set, update } from "firebase/database";

export default function ListaScreen() {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');


  function guardarUsuario(id:string, nombre: string, cantidad:string, precio:string, descripcion:string) {
  
    try {
      set(ref(db, 'Productos/' + id), {
        name: nombre,
        cant: cantidad,
        price : precio,
        description: descripcion
      });
      Alert.alert('Mensaje', 'Producto Almacenado')
  
    } catch (error) {
      console.log(error);
    }
  
    setId('')
    setNombre('')
    setCantidad('')
    setPrecio('')
    setDescripcion('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Id"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={cantidad}
        onChangeText={setCantidad}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={precio}
        onChangeText={setPrecio}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />
      <Button
        title="Agregar"
        onPress={() => guardarUsuario(id, nombre, cantidad, precio, descripcion)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
