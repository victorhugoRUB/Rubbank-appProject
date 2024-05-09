import React, { useState, useRef } from 'react'
import type {NavigationProp} from '@react-navigation/native';
import type {RootStackParamList} from '../../App';
import {ConfirmButton, Container, DivInputLogin, DivLogin, DivText, EyePasswordIcon, InputLogin, InputLoginSenha, Logo, TextBottom, TextButton, TextLinks, TextTop, TitleInput} from './login-screen.styles';
import {ScreenBase} from '../components/screen-base/screen-base';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View, useColorScheme } from 'react-native';
import { WarningScreen } from '../AvisoModel/erroModel';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LoadingSpinner } from '../Loading/loadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
const logoRubbank = require('../assets/logos/rubbank.png');
const logoRubbankWhite = require('../assets/logos/rubbankWhite.png');
const eyeIconOpen = require('../assets/Icons/eyeIconPsswrdOpened.png');
const eyeIconClose = require('../assets/Icons/eyeIconPsswrdClosed.png');

interface LoginScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Login'>;
}

export default function LoginScreen({navigation}: LoginScreenProps) {

  const [inputBorderColor, setInputBorderColor] = useState('#000000');
  const [errorMessage, setErrorMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    usuario_cpf: '',
    usuario_senha: '' 
  })

  // let value = event;
  // if (valor === 'usuario_cpf') {
  //   value = event.replace(/\D/g, ''); // Remove all non-digit characters
  // }

  const handleFormEdit = (event: any, valor: any) => { 
    setFormData({
      ...formData,
      [valor]: event
    })
    console.log(formData)
  }

  const handleForm = async (event: any) => {
    try {
      event.preventDefault()
      if(formData.usuario_cpf === '' || formData.usuario_senha === ''){
        setInputBorderColor('#FF0000');
        setErrorMessage('Por favor, preencha todos os campos');
        return;
      }
      setInputBorderColor('#000000');
      setErrorMessage('');
      setLoading(true)
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/usuario/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if(!res.ok){
        const AlertMessage = await res.json();
        setAlertMessage(AlertMessage.message)
        setShowWarning(true)
        throw new Error('Erro ao logar')
      }
      const r = await res.json()
      if(r.token){
        console.log(r.token)
        await AsyncStorage.setItem('token', r.token)
        navigation.navigate('Dashboard')
      }
      setLoading(false)
      const json = await res.json()
      console.log(res)
      console.log(json)
    }catch(err) {
      console.log(err)
      setLoading(false)
    }
  }

  const isDarkMode = useColorScheme() === 'dark';
  const colorChangetoWhite = {
    color: isDarkMode ? Colors.lighter : Colors.darker
  };

  return (
    <ScreenBase>
        <Container>
            <Modal visible={showWarning} transparent={true} animationType='slide' onRequestClose={()=> setShowWarning(false)} onTouchStart={() => setShowWarning(false)}>
              <TouchableWithoutFeedback onPress={()=> setShowWarning(false)}>
                <WarningScreen 
                onClose={() => setShowWarning(false)}
                warnMessage= {alertMessage}
                />
              </TouchableWithoutFeedback>
            </Modal>
          <Logo source={isDarkMode ? logoRubbankWhite : logoRubbank}/>
            <DivText>
              <TextTop style={colorChangetoWhite}>Olá,</TextTop> 
              <TextBottom style={colorChangetoWhite}>Para acessar digite seu documento e senha:</TextBottom>
            </DivText>
            <DivLogin>
              <TitleInput style={colorChangetoWhite}>CPF</TitleInput>
              <InputLogin 
                placeholder="Insira seu CPF aqui" 
                placeholderTextColor='#aaabab'
                value={formData.usuario_cpf}
                onChangeText={(e) => {handleFormEdit(e.replace(/[.-]/g, ''), 'usuario_cpf')}} 
                style={{ borderColor: inputBorderColor, backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, color: isDarkMode ? Colors.lighter : Colors.darker, borderBottomColor: isDarkMode ? Colors.lighter : Colors.darker, borderBottomWidth: 1}} 
                type={'cpf'}
                />
              <TitleInput style={colorChangetoWhite}>Senha</TitleInput>
              <InputLoginSenha 
                placeholder="Insira sua senha" 
                placeholderTextColor='#aaabab'
                value={formData.usuario_senha} 
                onChangeText={(e) => {handleFormEdit(e, 'usuario_senha')}} 
                style={{ borderColor: inputBorderColor, backgroundColor: isDarkMode ? Colors.darker : Colors.lighter, color: isDarkMode ? Colors.lighter : Colors.darker}} 
                secureTextEntry={!showPassword}
                />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}><EyePasswordIcon source={showPassword ? eyeIconOpen : eyeIconClose} style={{   position: 'absolute', right: 20, top: -43, bottom: 12,  backgroundColor: isDarkMode ? Colors.lighter: Colors.transparent }}/></TouchableOpacity>
              {errorMessage !== '' ? <TextBottom style={colorChangetoWhite}>{errorMessage}</TextBottom> : null}
              <TextLinks>Esqueceu a sua senha?</TextLinks>
            </DivLogin>
            <LoadingSpinner visible={loading}/>
            <DivInputLogin>
              <ConfirmButton onPress={handleForm} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
              <ConfirmButton onPress={() => navigation.navigate('OnboardingDadosPessoais')} accessibilityLabel="Criar uma nova conta" cor='#ffffff0'><TextLinks>Criar uma nova conta</TextLinks></ConfirmButton>
            </DivInputLogin>
        </Container>
    </ScreenBase>
  );
}
