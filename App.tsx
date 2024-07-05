import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import Navegacion from './navigation/MainNavigator';

export default function App() {
  return (
    <Navegacion/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
