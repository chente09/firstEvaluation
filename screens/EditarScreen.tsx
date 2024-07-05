import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../config/Config';
import { onValue, ref, remove, set, update, get, child } from "firebase/database";

export default function EditarScreen() {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [lista, setlista] = useState([])

  // Función para cargar datos del registro por ID
  const cargarDatosRegistro = async () => {
    if (id) {
      try {
        const snapshot = await get(child(ref(db), `Productos/${id}`));
        if (snapshot.exists()) {
          const { name, cant, price, description } = snapshot.val();
          setNombre(name);
          setCantidad(cant);
          setPrecio(price);
          setDescripcion(description);
        } else {
          Alert.alert('Error', 'No se encontró ningún registro con ese ID.');
          limpiarCampos();
        }
      } catch (error) {
        console.error('Error al cargar datos del registro: ', error);
      }
    } else {
      Alert.alert('Error', 'Ingresa un ID válido para cargar los datos del registro.');
    }
  };

  // Función para guardar o actualizar un registro
  const guardarOActualizarRegistro = () => {
    try {
      if (id) {
        update(ref(db, 'Productos/' + id), {
          name: nombre,
          cant: cantidad,
          price: precio,
          description: descripcion
        });
        Alert.alert('Mensaje', 'Producto actualizado correctamente');
      } else {
        set(ref(db, 'Productos'), {
          name: nombre,
          cant: cantidad,
          price: precio,
          description: descripcion
        });
        Alert.alert('Mensaje', 'Producto almacenado correctamente');
      }
    } catch (error) {
      console.error('Error al guardar o actualizar producto: ', error);
    }

    limpiarCampos();
  };

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
  
  //Leer
  function leer(){
    const starCountRef = ref(db, 'Productos/');  //linea ruta para leer datos
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    // console.log(data);
  
    //CAMBIO DE FORMATO DE LOS DATOS
    const listaTemp:any =Object.keys(data).map((id)=>({
      key: id, ...data[id]
    }))
  
    // console.log(listaTemp);
    setlista(listaTemp)
    
  });
  }
  
  useEffect(() => {
    leer()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Id"
        value={id}
        onChangeText={setId}
      />
      <Button
        title="Cargar Datos"
        onPress={cargarDatosRegistro}
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
      <View style={styles.buttonContainer}>
        <Button
          title="Guardar/Actualizar"
          onPress={guardarOActualizarRegistro}
        />
        <Button
          title="Eliminar"
          onPress={eliminarRegistro}
          color="red"
        />
      </View>
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
