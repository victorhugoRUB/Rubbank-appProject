import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, BlocksOfInput, Container, DivButtonConfirm, DivContent, DivInput, InputCadastro, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLoginSenha, TextButton } from '../login/login-screen.styles';


interface OnboardingEndScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingEnd'>;
}

export default function OnboardingEndScreen({navigation}: OnboardingEndScreenProps) {
  const [loading, setLoading] = useState(false);
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
            />
          </BlockInput>
          <BlockInput>
            <TextInputCad>Endereço*</TextInputCad>
            <InputLoginSenha
            placeholder='Digite seu endereço'
            placeholderTextColor='#aaabab'
            />
          </BlockInput>
          <BlocksOfInput>
            <BlockInput width='46%'>
              <TextInputCad>Número*</TextInputCad>
              <InputLoginSenha
              placeholder='Número residência'
              placeholderTextColor='#aaabab'
              />
            </BlockInput>
            <BlockInput width='46%'>
              <TextInputCad>Complemento*</TextInputCad>
              <InputLoginSenha
              placeholder='Digite seu CPF'
              placeholderTextColor='#aaabab'
              />
            </BlockInput>
          </BlocksOfInput>
          <BlockInput>
            <TextInputCad>Bairro*</TextInputCad>
            <InputLoginSenha
            placeholder='(dd/mm/aaaa)'
            placeholderTextColor='#aaabab'
            />
          </BlockInput>
          <BlocksOfInput>
            <BlockInput width='46%'>
              <TextInputCad>Cidade*</TextInputCad>
              <InputLoginSenha
              placeholder='(dd/mm/aaaa)'
              placeholderTextColor='#aaabab'
              />
            </BlockInput>
            <BlockInput width='46%'>
              <TextInputCad>UF*</TextInputCad>
              <InputLoginSenha
              placeholder='(dd/mm/aaaa)'
              placeholderTextColor='#aaabab'
              />
            </BlockInput>
          </BlocksOfInput>
          </DivInput>
        <DivButtonConfirm>
          <ConfirmButton onPress={() => navigation.navigate('OnboardingSenhaApp')} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}
