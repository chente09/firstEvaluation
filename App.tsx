import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import Navegacion from './navigation/MainNavigator';
import ApiFailScreen from './screens/ApiFailScreen';

export default function App() {
  return (
    <Navegacion/>
    // <ApiFailScreen/>
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
