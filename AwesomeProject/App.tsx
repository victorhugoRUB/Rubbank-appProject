import { NavigationContainer, NavigationContainerRef, useNavigation, useRoute } from '@react-navigation/native';
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
import DashboardPerfilScreen from './src/dashboard/perfil/dashboardPerfil-screen';
import DashboardDadosBancScreen from './src/dashboard/perfil/dashboardDadosBanc-screen';
import AlterarSenhaAppScreen from './src/dashboard/alterar/alterar-SenhaApp-screen';
import AlterarSenhaTransScreen from './src/dashboard/alterar/alterar-SenhaTrans-screen';
import ExtratoScreen from './src/dashboard/Extrato/extrato-screen';
import FiltroScreen from './src/dashboard/Extrato/filtro-screen';
import PrototipoScreen from './src/dashboard/Extrato/prototipoextrato';
import ExtratoEntradaScreen from './src/dashboard/Extrato/extrato-entrada-screen';
import ExtratoSaidaScreen from './src/dashboard/Extrato/extrato-saida-screen';
import TransferenciaCPFScreen from './src/dashboard/Transferencia/transferenciaCPF-screen';
import TransferenciaNumContaScreen from './src/dashboard/Transferencia/transferenciaNumConta-screen';
import TransferenciaValorDescScreen from './src/dashboard/Transferencia/transferenciaValorDesc-screen';
import TransferenciaSenhaScreen from './src/dashboard/Transferencia/transferenciaSenha-screen';
import AlterarEnderecoScreen from './src/dashboard/alterar/alterar-endereco-screen';
import ListarEnderecoScreen from './src/dashboard/alterar/listar-endereco-screen';
import { useFocusEffect } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { useEffect } from 'react';
import { firebase, logScreenView } from '@react-native-firebase/analytics';

export interface RootStackParamList {
  Inicio: undefined;
  Login: undefined;
  Dashboard: undefined;
  DashboardPerfil: undefined;
  DashboardDadosBanc: undefined;
  TransferenciaCPF: undefined;
  TransferenciaNumConta: undefined;
  TransferenciaValorDesc: undefined;
  TransferenciaSenha: undefined;
  AlterarSenhaApp: undefined;
  AlterarSenhaTrans: undefined;
  AlterarEndereco: undefined;
  ListarEndereco: undefined;
  Extrato: undefined;
  ExtratoEntrada: undefined;
  ExtratoSaida: undefined;
  Filtro: undefined;
  OnboardingDadosPessoais: undefined;
  OnboardingCEP: undefined;
  OnboardingEnd: undefined;
  OnboardingSenhaApp: undefined;
  OnboardingSenhaTrans: undefined;
  OnboardingFinalTabel: undefined;
  Prototipo: undefined;
}

const Stack = createNativeStackNavigator();


function App() {
  const routeNameRef: any = React.useRef();
  const navigationRef: any = React.useRef();
  return (
    <Provider store={store}>
      <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        console.log('onReady')
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        console.log('onStateChange')
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          console.log(previousRouteName + ' ' + currentRouteName)
          await firebase .analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: 'NavigationContainer',
          });
          await firebase .analytics().logEvent('screen_view', {
            screen_name: currentRouteName,
            screen_class: 'NavigationContainer',
          })
        }
        routeNameRef.current = currentRouteName;
      }}

      >
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen
            name="Prototipo"
            component={PrototipoScreen}
            options={{ headerShown: false }}
          />
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
            name="DashboardPerfil"
            component={DashboardPerfilScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DashboardDadosBanc"
            component={DashboardDadosBancScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TransferenciaCPF"
            component={TransferenciaCPFScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TransferenciaNumConta"
            component={TransferenciaNumContaScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TransferenciaValorDesc"
            component={TransferenciaValorDescScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TransferenciaSenha"
            component={TransferenciaSenhaScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AlterarSenhaApp"
            component={AlterarSenhaAppScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AlterarSenhaTrans"
            component={AlterarSenhaTransScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AlterarEndereco"
            component={AlterarEnderecoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ListarEndereco"
            component={ListarEnderecoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Extrato"
            component={ExtratoScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExtratoEntrada"
            component={ExtratoEntradaScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExtratoSaida"
            component={ExtratoSaidaScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Filtro"
            component={FiltroScreen}
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
