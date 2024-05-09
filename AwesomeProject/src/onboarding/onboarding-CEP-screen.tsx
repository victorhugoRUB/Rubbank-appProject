import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, Container, DivButtonConfirm, DivContent, DivInput, ErrorMessage, InputCadastro, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLoginSenha, TextButton } from '../login/login-screen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingSpinner } from '../Loading/loadingScreen';

interface OnboardingCEPScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingCEP'>;
}

export default function OnboardingCEPScreen({navigation}: OnboardingCEPScreenProps) {
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [borderRed, setBorderRed] = useState('#000000');
  const [errorMessageCEP, setErrorMessageCEP] = useState('');

  const [formData, setFormData] = useState({
    end_cep: ''
  })

  const handleFormEdit = (event: any, valor: any) => {
    setFormData({
      ...formData,
      [valor]: event
    })
    console.log(formData)
  }
  

  useEffect(() => {
    const controlButtonState = () => {
      if(formData.end_cep === ''){
        setButtonState(false)
      }
    }
    controlButtonState()
  }, [])

  const checkCEP = (e: any) => {
    const cep = e.replace(/\D/g, '');
    setButtonState(false)
    console.log(cep)
    // setLoading(true)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(async data => {
      setLoading(true)
      if(data.erro){
        setBorderRed('#FF0000')
        setErrorMessageCEP('CEP não encontrado')
        console.log('CEP não encontrado')
        setLoading(false)
        return
      }else{
        setButtonState(true)
        setBorderRed('#000000')
        await AsyncStorage.setItem('CEP', JSON.stringify(data))
        console.log(data)
        setLoading(false)
      }
    })
  }

  return (
    <ScreenBase>
      <Container>
        <LoadingSpinner visible={loading}/>
        <TopBar><TopBarBluePart width='50%'/></TopBar>
        <DivContent>
          <TextTitle>Agora informe o seu endereço. Qual é o seu <Span>CEP</Span>?</TextTitle>
          <DivInput>
            <BlockInput>
              <InputCadastro
              placeholder='XXXXX-XXX'
              placeholderTextColor='#aaabab'
              value={formData.end_cep}
              onChangeText={(e) => {
                checkCEP(e)
                handleFormEdit(e, 'end_cep')}}
              type='zip-code'
              style={{borderColor: borderRed}}
              />
              {borderRed === '#FF0000' ? <ErrorMessage>{errorMessageCEP}</ErrorMessage> : null}
            </BlockInput>
          </DivInput>
        </DivContent>
        <DivButtonConfirm>
          <ConfirmButton disabled={!buttonState} style={!buttonState ? {backgroundColor: '#6B7AE578'} : {}} onPress={() => navigation.navigate('OnboardingEnd')} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}
