import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import LoginScreen from './src/login/login-screen';
import InicioScreen from './src/Inicio/inicio-screen';
import DashboardScreen from './src/dashboard/dashboard-screen';
import OnboardingScreen from './src/onboarding/onboarding-dadoPessoal-screen';
import OnboardingCEPScreen from './src/onboarding/onboarding-CEP-screen';
import OnboardingEndScreen from './src/onboarding/onboarding-End-screen';
import OnboardingSenhaAppScreen from './src/onboarding/onboarding-SenhaApp-screen';
import OnboardingSenhaTransScreen from './src/onboarding/onboarding-SenhaTrans-screen';
import OnboardingFinalTabelScreen from './src/onboarding/onboarding-finalTabel-screen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createNativeStackNavigator();

export interface RootStackParamList {
  Inicio: undefined;
  Login: undefined;
  Dashboard: undefined;
  OnboardingDadosPessoais: undefined;
  OnboardingCEP: undefined;
  OnboardingEnd: undefined;
  OnboardingSenhaApp: undefined;
  OnboardingSenhaTrans: undefined;
  OnboardingFinalTabel: undefined;
}

function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="OnboardingDadosPessoais">
          <Stack.Screen
            name="Inicio"
            component={InicioScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingDadosPessoais"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingCEP"
            component={OnboardingCEPScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingEnd"
            component={OnboardingEndScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingSenhaApp"
            component={OnboardingSenhaAppScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingSenhaTrans"
            component={OnboardingSenhaTransScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OnboardingFinalTabel"
            component={OnboardingFinalTabelScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
