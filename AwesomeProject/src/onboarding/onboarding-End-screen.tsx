import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, BlocksOfInput, Container, DivButtonConfirm, DivContent, DivInput, InputCadastro, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLogin, InputLoginSenha, TextButton } from '../login/login-screen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setEndField } from '../redux/endSlice';
import { ReduxState } from '../redux/store';


interface OnboardingEndScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingEnd'>;
}

export default function OnboardingEndScreen({navigation}: OnboardingEndScreenProps) {
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState(false);

  const dispatch = useDispatch();
  const endData = useSelector((state: ReduxState)=> state.end);


  const [formData, setFormData] = useState({
    end_cep: '',
    end_rua: '',
    end_num: '',
    end_complem: '',
    end_bairro: '',
    end_cidade: '',
    end_uf: ''
  })

  const handleFormEdit = (event: any, valor: any) => {
    dispatch((setEndField({field: valor, value: event})))
    setFormData({
      ...formData,
      [valor]: event
    })
  }

  useEffect(() => {
    setLoading(true)
    handleGetCEP()
    setLoading(false)
  }, [])

  useEffect(() => {
    if(formData.end_num === ''){
      setButtonState(false)
      return
    }else{
      setButtonState(true)
    }
  }, [formData])
  const handleGetCEP = async () => {
    const CEP = await AsyncStorage.getItem('CEP')
    const parseCEP = JSON.parse(CEP || '')
    console.log(parseCEP)
    setFormData({
      ...formData,
      end_cep: parseCEP.cep,
      end_rua: parseCEP.logradouro,
      end_bairro: parseCEP.bairro,
      end_cidade: parseCEP.localidade,
      end_uf: parseCEP.uf
    })
    dispatch((setEndField({field: 'end_cep', value: parseCEP.cep})))
    dispatch((setEndField({field: 'end_rua', value: parseCEP.logradouro})))
    dispatch((setEndField({field: 'end_bairro', value: parseCEP.bairro})))
    dispatch((setEndField({field: 'end_cidade', value: parseCEP.localidade})))
    dispatch((setEndField({field: 'end_uf', value: parseCEP.uf})))
  }

  return (
    <ScreenBase>
      <Container>
        <TopBar><TopBarBluePart width='50%'/></TopBar>
          <TextTitle>Preencha o <Span>número</Span> e o <Span>complemento</Span>.</TextTitle>
          <DivInput>
            <BlockInput>
              <TextInputCad>CEP*</TextInputCad>
              <InputLoginSenha
              placeholder='XXXXX-XXX'
              placeholderTextColor='#aaabab'
              value={formData.end_cep}
              onChangeText={(e) => handleFormEdit(e, 'end_cep')}
              editable={formData.end_cep === ''} 
              />
            </BlockInput>
            <BlockInput>
              <TextInputCad>Endereço*</TextInputCad>
              <InputLoginSenha
              placeholder='Digite seu endereço'
              placeholderTextColor='#aaabab'
              value={formData.end_rua}
              onChangeText={(e) => handleFormEdit(e, 'end_rua')}
              editable={formData.end_rua === ''} 
              />
            </BlockInput>
            <BlocksOfInput>
              <BlockInput width='46%'>
                <TextInputCad>Número*</TextInputCad>
                <InputLoginSenha
                placeholder='Número residência'
                placeholderTextColor='#aaabab'
                value={formData.end_num}
                onChangeText={(e) => handleFormEdit(e, 'end_num')}
                editable={true} 
                />
              </BlockInput>
              <BlockInput width='46%'>
                <TextInputCad>Complemento*</TextInputCad>
                <InputLoginSenha
                placeholder='Complemento'
                placeholderTextColor='#aaabab'
                value={formData.end_complem}
                onChangeText={(e) => handleFormEdit(e, 'end_complem')}
                editable={true} 
                />
              </BlockInput>
            </BlocksOfInput>
            <BlockInput>
              <TextInputCad>Bairro*</TextInputCad>
              <InputLoginSenha
              placeholder='Seu bairro'
              placeholderTextColor='#aaabab'
              value={formData.end_bairro}
              onChangeText={(e) => handleFormEdit(e, 'end_bairro')}
              editable={formData.end_bairro === ''} 
              />
            </BlockInput>
            <BlocksOfInput>
              <BlockInput width='46%'>
                <TextInputCad>Cidade*</TextInputCad>
                <InputLoginSenha
                placeholder='Sua cidade'
                placeholderTextColor='#aaabab'
                value={formData.end_cidade}
                onChangeText={(e) => handleFormEdit(e, 'end_cidade')}
                editable={formData.end_cidade === ''} 
                />
              </BlockInput>
              <BlockInput width='46%'>
                <TextInputCad>UF*</TextInputCad>
                <InputLoginSenha
                placeholder='Seu estado'
                placeholderTextColor='#aaabab'
                value={formData.end_uf}
                onChangeText={(e) => handleFormEdit(e, 'end_uf')}
                editable={formData.end_uf === ''} 
                />
              </BlockInput>
            </BlocksOfInput>
          </DivInput>
        <DivButtonConfirm>
          <ConfirmButton disabled={!buttonState} style={!buttonState ? {backgroundColor: '#6b79e578'}: {}} onPress={() => navigation.navigate('OnboardingSenhaApp')} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}
