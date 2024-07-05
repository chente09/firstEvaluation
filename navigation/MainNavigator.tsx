import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListaScreen from '../screens/ListaScreen';
import RegistrosScreen from '../screens/RegistrosScreen';
import EditarScreen from '../screens/EditarScreen';
import ApiScreen from '../screens/ApiScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="BottomTab" component={MyTabs} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator()
function MyTabs(){
    return(
        <Tab.Navigator >
            <Tab.Screen name="Lista" component={ListaScreen} options={{headerShown:false}} />
            <Tab.Screen name="Registros" component={RegistrosScreen} options={{headerShown:false}}/>
            <Tab.Screen name="Editar" component={EditarScreen} options={{headerShown:false}}/>
            <Tab.Screen name="Api" component={ApiScreen} options={{headerShown:false}}/>
        </Tab.Navigator>
    )
}

export default function Navegacion(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}