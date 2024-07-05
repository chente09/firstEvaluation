import { StyleSheet, Text, View, FlatList, Alert, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { db } from '../config/Config';
import { onValue, ref } from "firebase/database";
import Informacion from '../components/Informacion';

export default function RegistrosScreen() {
  const [lista, setLista] = useState([]);

  // Función para leer datos de Firebase
  const leer = () => {
    const starCountRef = ref(db, 'Productos/');  // Ruta para leer datos
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      // Cambio de formato de los datos
      const listaTemp: any = Object.keys(data).map((key) => ({
        key, ...data[key]
      }));

      setLista(listaTemp);
    });
  };

  useEffect(() => {
    leer();
  }, []);

  type Producto = {
    key: string;
    name: string;
    cant: number;
    price: number;
    descripcion: string;
  };

  const mostrarInformacion = (item: Producto) => {
    Alert.alert(
      'Información del Producto',
      `Nombre: ${item.name}\nCantidad: ${item.cant}\nPrecio: ${item.price}\nDescripción: ${item.descripcion}`
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lista}
        renderItem={({ item }: { item: Producto }) =>
          <View style={styles.itemContainer}>
            <Informacion data={item} />
            <Button
              title="Ver Información"
              onPress={() => mostrarInformacion(item)}
              color="blue"
            />
          </View>
        }
        keyExtractor={(item) => item.key}
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
  itemContainer: {
    marginBottom: 20,
  },
});
