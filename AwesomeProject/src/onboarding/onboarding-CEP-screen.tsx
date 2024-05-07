import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, Container, DivButtonConfirm, DivContent, DivInput, InputCadastro, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLoginSenha, TextButton } from '../login/login-screen.styles';


interface OnboardingCEPScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingCEP'>;
}

export default function OnboardingCEPScreen({navigation}: OnboardingCEPScreenProps) {
  const [loading, setLoading] = useState(false);
  return (
    <ScreenBase>
      <Container>
        <TopBar><TopBarBluePart width='50%'/></TopBar>
        <DivContent>
          <TextTitle>Agora informe o seu endereço. Qual é o seu <Span>CEP</Span>?</TextTitle>
          <DivInput>
            <BlockInput>
              <InputCadastro
              placeholder='XXXXX-XXX'
              placeholderTextColor='#aaabab'
              />
            </BlockInput>
          </DivInput>
        </DivContent>
        <DivButtonConfirm>
          <ConfirmButton onPress={() => navigation.navigate('OnboardingEnd')} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}
