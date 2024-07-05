import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../config/Config';
import { onValue, ref, remove, set, update, get, child } from "firebase/database";
import Informacion from '../components/Informacion';

export default function EditarScreen() {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [lista, setLista] = useState([])

  // Función para actualizar un registro
  const editarRegistro = () => {
    if (id) {
      update(ref(db, 'Productos/' + id), {
        name: nombre,
        cant: cantidad,
        price: precio,
        descripcion: descripcion
      })
      .then(() => {
        Alert.alert('Mensaje', 'Se editó exitosamente!!');
        limpiarCampos();
      })
      .catch((error) => {
        console.error('Error al editar producto: ', error);
      });
    } else {
      Alert.alert('Error', 'Para editar un producto, debes ingresar un ID válido.');
    }
  };

  const cargardatos = (item: any) => {
    setId(item.key);
    setNombre(item.name);
    setCantidad(item.cant);
    setPrecio(item.price);
    setDescripcion(item.descripcion);
  }

  // Función para eliminar un registro
  const eliminarRegistro = () => {
    if (id) {
      Alert.alert(
        'Confirmar eliminación',
        '¿Estás seguro de eliminar este producto?',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Eliminar',
            onPress: async () => {
              try {
                await remove(ref(db, 'Productos/' + id));
                Alert.alert('Mensaje', 'Producto eliminado correctamente');
                limpiarCampos();
              } catch (error) {
                console.error('Error al eliminar producto: ', error);
              }
            }
          }
        ]
      );
    } else {
      Alert.alert('Error', 'Para eliminar un producto, debes ingresar un ID válido.');
    }
  };

  // Función para limpiar los campos después de operaciones
  const limpiarCampos = () => {
    setId('');
    setNombre('');
    setCantidad('');
    setPrecio('');
    setDescripcion('');
  };

  //////////////LEER///////////////////
  function leer() {
    const starCountRef = ref(db, 'Productos/');  //linea ruta para leer datos
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      // console.log(data);

      //CAMBIO DE FORMATO DE LOS DATOS
      const listaTemp: any = Object.keys(data).map((key) => ({
        key, ...data[key]
      }))

      // console.log(listaTemp);
      setLista(listaTemp)
    });
  }

  useEffect(() => {
    leer()
  }, [])

  type Productos = {
    key: string
    name: string
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Producto</Text>
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
        title="Guardar"
        onPress={editarRegistro}
        color="blue"
      />
      <FlatList
        data={lista}
        renderItem={({ item }: { item: Productos }) =>
          <View>
            <Informacion data={item}/>
            <View style={styles.buttonContainer}>
              <Button
                title="Editar"
                onPress={() => cargardatos(item)}
                color="green"
              />
              <Button
                title="Eliminar"
                onPress={eliminarRegistro}
                color="red"
              />
            </View>
          </View>
        }
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
