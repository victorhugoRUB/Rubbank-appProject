import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, BlocksOfInput, Container, DivButtonConfirm, DivContent, DivInput, InputCadastro, LinkToInfoModal, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLoginSenha, TextButton } from '../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';
import { ModalSenhaAppScreen } from '../AvisoModel/senhaAppModel';
import { Modal } from 'react-native';

interface OnboardingSenhaAppScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingSenhaApp'>;
}

export default function OnboardingSenhaAppScreen({navigation}: OnboardingSenhaAppScreenProps) {
  const [loading, setLoading] = useState(false);
  const [avisoModal, setAvisoModal] = useState(false);
  return (
    <ScreenBase>
      <Modal
      visible={avisoModal}
      animationType='slide'
      onRequestClose={() => setAvisoModal(false)}
      >
        <ModalSenhaAppScreen onClose={() => setAvisoModal(false)}/>
      </Modal>
      <Container>
        <TopBar><TopBarBluePart width='75%'/></TopBar>
          <TextTitle>Digite qual será sua senha para entrar no aplicativo</TextTitle>
          <DivInput>
            <LinkToInfoModal onPress={() => setAvisoModal(true)}><TextInputCad><IconFeather name='info' size={12} color={'#000'} /> <Span decoration='underline'>Como criar uma senha segura</Span></TextInputCad></LinkToInfoModal>
            <BlockInput>
              <TextInputCad>Digite sua <Span>senha</Span>:</TextInputCad>
              <InputCadastro secureTextEntry/>
            </BlockInput>
            <BlockInput>
              <TextInputCad>Confirme sua <Span>senha</Span>:</TextInputCad>
              <InputCadastro secureTextEntry/> 
              {/* TODO */}
            </BlockInput>
          </DivInput>
        <DivButtonConfirm>
          <ConfirmButton onPress={() => navigation.navigate('OnboardingSenhaApp')} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}
