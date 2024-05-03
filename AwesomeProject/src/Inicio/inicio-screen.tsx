import type {NavigationProp} from '@react-navigation/native';
import React from 'react';
import type {RootStackParamList} from '../../App';
import {Button, Container, DivMain, DivText, Logo, TextButton, TextTop} from './inicio-screen.styles';
import {ScreenBase} from '../components/screen-base/screen-base';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
const logoRubbank = require('../assets/logos/rubbank.png');
const logoRubbankWhite = require('../assets/logos/rubbankWhite.png');

interface InicioScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Inicio'>;
}

export default function InicioScreen({navigation}: InicioScreenProps) {
  const [text, setText] = React.useState('');

  const isDarkMode = useColorScheme() === 'dark';
  const colorChange = {
    color: isDarkMode ? Colors.lighter : Colors.darker
  };
  return (
    <ScreenBase>
      <Container >
        <Logo source={isDarkMode ? logoRubbankWhite : logoRubbank}/>
        <DivMain>
          <DivText>
            <TextTop fontWeight="700" style={colorChange}>Bem-vindo a RubBank!</TextTop>
            <TextTop fontWeight="400" style={colorChange}>Sua conta digital, sem burocracia.</TextTop>
          </DivText>
          <Button onPress={() => navigation.navigate('Login')}><TextButton>COMEÇAR</TextButton></Button>
        </DivMain>
      </Container>
    </ScreenBase>
  );
}
