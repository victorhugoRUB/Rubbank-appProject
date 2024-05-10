import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, BlocksOfInput, Container, DivButtonConfirm, DivContent, DivInput, ErrorMessage, InputCadastro, LinkToInfoModal, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLoginSenha, TextButton } from '../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';
import { ModalSenhaAppScreen } from '../AvisoModel/senhaAppModel';
import { Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSenhaTransField } from '../redux/senhaTransSlice';

interface OnboardingSenhaTransScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingSenhaTrans'>;
}

export default function OnboardingSenhaTransScreen({navigation}: OnboardingSenhaTransScreenProps) {
  const [loading, setLoading] = useState(false);
  const [avisoModal, setAvisoModal] = useState(false);
  const [borderRed, setBorderRed] = useState('#000000');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageConfirm, setErrorMessageConfirm] = useState('');
  const [buttonState, setButtonState ] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    contaBanc_senhatransacao: '',
    confirmSenha: ''
  })

  const handleFormEdit = (event: any, valor: any) => {
    dispatch((setSenhaTransField({field: valor, value: event})))
    setFormData({
      ...formData,
      [valor]: event
    })
    console.log(formData)
  }

  useEffect(() => {
    if(formData.contaBanc_senhatransacao === '' || formData.confirmSenha === ''){
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
          <TextTitle>Digite qual será sua senha para efetuar transações</TextTitle>
          <DivInput>
            <LinkToInfoModal onPress={() => setAvisoModal(true)}><TextInputCad><IconFeather name='info' size={12} color={'#000'} /> <Span decoration='underline'>Senha numérica de 4 dígitos</Span></TextInputCad></LinkToInfoModal>
            <BlockInput>
              <TextInputCad>Digite sua <Span>senha</Span>:</TextInputCad>
              <InputCadastro
              value={formData.contaBanc_senhatransacao}
              onChangeText={(e) => {
                if(/^\d{4}$/.test(e)){
                  setBorderRed('#000000')
                  handleFormEdit(e, 'contaBanc_senhatransacao')
                  setErrorMessage('')
                }else{
                  setBorderRed('#FF0000')
                  handleFormEdit(e, 'contaBanc_senhatransacao')
                  setErrorMessage('Sua senha deve conter 4 dígitos apenas números e não pode ser seguidos, por exemplo: 1234 ou 1111.')
                }
              }}
              type='only-numbers'
              style={{borderColor: borderRed}}
              secureTextEntry/>
              {borderRed === '#FF0000' ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
            </BlockInput>
            <BlockInput>
              <TextInputCad>Confirme sua <Span>senha</Span>:</TextInputCad>
              <InputCadastro
              value={formData.confirmSenha}
              onChangeText={(e) => {
                if(e === formData.contaBanc_senhatransacao){
                  setBorderRed('#000000')
                  handleFormEdit(e, 'confirmSenha')
                  setErrorMessageConfirm('')
                }else{
                  setBorderRed('#FF0000')
                  handleFormEdit(e, 'confirmSenha')
                  setErrorMessageConfirm('Sua senha deve ser igual a anterior')
                }
              }}
              type='only-numbers'
              style={{borderColor: borderRed}}
              secureTextEntry/> 
              {borderRed === '#FF0000' ? <ErrorMessage>{errorMessageConfirm}</ErrorMessage> : null}
            </BlockInput>
          </DivInput>
        <DivButtonConfirm>
          <ConfirmButton onPress={() => navigation.navigate('OnboardingFinalTabel')} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}
