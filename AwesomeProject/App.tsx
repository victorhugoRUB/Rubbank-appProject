import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import HomeScreen from './src/login/login-screen';
import TodoList from './src/todo-list/todo-list';
import LoginScreen from './src/login/login-screen';
import InicioScreen from './src/Inicio/inicio-screen';
import { Platform } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

export interface RootStackParamList {
  Inicio: undefined;
  Login: undefined;
  TodoList: undefined;
}

function App() {

  // React.useEffect(() => {
  //   if(Platform.OS === 'android') {
  //     SplashScreen.hide();
  //   }
  // }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
      <Stack.Screen
          name="Inicio"
          component={InicioScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="TodoList"
          component={TodoList}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
