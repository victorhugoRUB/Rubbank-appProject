import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, BlocksOfInput, Container, DivButtonConfirm, DivContent, DivInput, ErrorMessage, InputCadastro, LinkToInfoModal, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLoginSenha, TextButton } from '../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';
import { ModalSenhaAppScreen } from '../AvisoModel/senhaAppModel';
import { Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setsenhaAppField } from '../redux/senhaAppSlice';
import { ReduxState } from '../redux/store';

interface OnboardingSenhaAppScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingSenhaApp'>;
}

export default function OnboardingSenhaAppScreen({navigation}: OnboardingSenhaAppScreenProps) {
  const [loading, setLoading] = useState(false);
  const [avisoModal, setAvisoModal] = useState(false);
  const [borderRed, setBorderRed] = useState('#000000');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageConfirm, setErrorMessageConfirm] = useState('');
  const [buttonState, setButtonState ] = useState(false);
  const dispatch = useDispatch();
  const endData = useSelector((state: ReduxState)=> state.end);


  const [formData, setFormData] = useState({
    usuario_senha: '',
    confirmSenha: ''
  })

  const handleFormEdit = (event: any, valor: any) => {
    dispatch((setsenhaAppField({field: valor, value: event})))
    setFormData({
      ...formData,
      [valor]: event
    })
    console.log(endData)
  }

  useEffect(() => {
    if(formData.usuario_senha === '' || formData.confirmSenha === ''){
      setButtonState(false)
      return
    }else{
      setButtonState(true)
    }
  }, [formData])


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
              <InputLoginSenha
              value={formData.usuario_senha}
              onChangeText={(e) => {
                if(/^(?=.*[_!@#$%&?'*+\/=?`{|}()~^.,-])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(e)){
                  setBorderRed('#000000')
                  handleFormEdit(e, 'usuario_senha')
                  setErrorMessage('')
                }else{
                  setBorderRed('#FF0000')
                  handleFormEdit(e, 'usuario_senha')
                  setErrorMessage('Sua senha deve conter no mínimo 8 caracteres, sendo eles: uma letra maiúscula, uma letra minúscula, um número e um caractere especial')
                }
              }}
              style={{borderColor: borderRed}}
              secureTextEntry/>
              {borderRed === '#FF0000' ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
            </BlockInput>
            <BlockInput>
              <TextInputCad>Confirme sua <Span>senha</Span>:</TextInputCad>
              <InputLoginSenha
              value={formData.confirmSenha}
              onChangeText={(e) => {
                if(e === formData.usuario_senha){
                  setBorderRed('#000000')
                  handleFormEdit(e, 'confirmSenha')
                  setErrorMessageConfirm('')
                }else{
                  setBorderRed('#FF0000')
                  handleFormEdit(e, 'confirmSenha')
                  setErrorMessageConfirm('Sua senha deve ser igual a anterior')
                }
              }}
              style={{borderColor: borderRed}}
              secureTextEntry/> 
              {borderRed === '#FF0000' ? <ErrorMessage>{errorMessageConfirm}</ErrorMessage> : null}
            </BlockInput>
          </DivInput>
        <DivButtonConfirm>
          <ConfirmButton disabled={!buttonState || borderRed === '#FF0000'} style={!buttonState || borderRed === '#FF0000' ? {backgroundColor: '#6b79e578'}: {}} onPress={() => navigation.navigate('OnboardingSenhaTrans')} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}
