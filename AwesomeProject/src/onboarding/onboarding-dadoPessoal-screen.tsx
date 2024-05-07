import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, Container, DivButtonConfirm, DivInput, InputCadastro, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLoginSenha, TextButton } from '../login/login-screen.styles';


interface OnboardingScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingDadosPessoais'>;
}

export default function OnboardingScreen({navigation}: OnboardingScreenProps) {
  const [loading, setLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   nome: '',
  //   email: '',
  //   cpf: '',
  //   dataNascimento: '',
  //   senha: ''
  // })
  return (
    <ScreenBase>
      <Container>
        <TopBar><TopBarBluePart width='25%'/></TopBar>
        <TextTitle>Preencha abaixo com seus dados pessoais.</TextTitle>
        <DivInput>
          <BlockInput>
            <TextInputCad>Nome Completo*</TextInputCad>
            <InputLoginSenha
            placeholder='Digite seu nome completo'
            placeholderTextColor='#aaabab'
            />
          </BlockInput>
          <BlockInput>
            <TextInputCad>Email*</TextInputCad>
            <InputLoginSenha
            placeholder='Digite seu email'
            placeholderTextColor='#aaabab'
            />
          </BlockInput>
          <BlockInput>
            <TextInputCad>Telefone*</TextInputCad>
            <InputLoginSenha
            placeholder='(DDD)xxxxx-xxxx'
            placeholderTextColor='#aaabab'
            />
          </BlockInput>
          <BlockInput>
            <TextInputCad>CPF*</TextInputCad>
            <InputLoginSenha
            placeholder='Digite seu CPF'
            placeholderTextColor='#aaabab'
            />
          </BlockInput>
          <BlockInput>
            <TextInputCad>Data de nascimento*</TextInputCad>
            <InputLoginSenha
            placeholder='(dd/mm/aaaa)'
            placeholderTextColor='#aaabab'
            />
          </BlockInput>
        </DivInput>
        <DivButtonConfirm>
          <ConfirmButton onPress={() => navigation.navigate('OnboardingCEP')} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}
