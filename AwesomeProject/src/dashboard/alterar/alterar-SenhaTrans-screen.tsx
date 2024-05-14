import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { BlockInput, BlocksOfInput, Container, DivButtonConfirm, DivContent, DivInput, DivOfInputs, ErrorMessage, InputCadastro, InputTransSenha, LinkToInfoModal, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './alterar-screen.styles';
import { ConfirmButton, DivInputLogin, InputLoginSenha, TextButton } from '../../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';
import { ModalSenhaAppScreen } from '../../AvisoModel/senhaAppModel';
import { Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { setsenhaAppField } from '../../redux/senhaAppSlice';
import { DivBottom, TextTopDash, DivTop } from '../perfil/dashboard-screen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WarningScreen } from '../../AvisoModel/erroModel';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import lodash from 'lodash';
import { setSenhaTransField } from '../../redux/senhaTransSlice';


interface AlterarSenhaTransScreenProps {
  navigation: NavigationProp<RootStackParamList, 'AlterarSenhaTrans'>;
}

export default function AlterarSenhaTransScreen({navigation}: AlterarSenhaTransScreenProps) {
  const [loading, setLoading] = useState(false);
  const [avisoModal, setAvisoModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [borderRed, setBorderRed] = useState('#000000');
  const [errorMessageAtual, setErrorMessageAtual] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageConfirm, setErrorMessageConfirm] = useState('');
  const [buttonState, setButtonState ] = useState(false);
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState({
    usuario_senha: ['', '', '', ''],
    usuario_senhanova: ['', '', '', ''],
    usuario_senhanovaconfirm: ['', '', '', '']
  });
  const [formData, setFormData] = useState({
    usuario_senha: '',
    usuario_senhanova: '',
    usuario_senhanovaconfirm: ''
  })

  useEffect(() => {
    setFormData({
      usuario_senha: inputValues.usuario_senha.join(''),
      usuario_senhanova: inputValues.usuario_senhanova.join(''),
      usuario_senhanovaconfirm: inputValues.usuario_senhanovaconfirm.join('')
    })
    
  }, [inputValues])




  const handleFormEdit = (event: any, valor: any) => {
    dispatch((setSenhaTransField({field: valor, value: event})))
    setFormData({
      ...formData,
      [valor]: event
    })
    console.log(formData)
  }

  
  const [contaInfo, setContaInfo] = useState({
    usuario_senha: '',
  })

  const handleForm = async () => {
    console.log('chamou')
    setLoading(true)
    try{
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/banco/alterar/senhaApp`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      console.log(res)
      
      console.log('chegou')
      if(!res.ok){
        console.log('erro ao alterar')
        const AlertMessage = (await res.json());
        if(contaInfo.usuario_senha !== formData.usuario_senha){
          console.log('entrou no if')
          setAlertMessage(AlertMessage.message)
          setShowWarning(true)
          return
        }
      }
      setLoading(false)
    }catch(err){
      setLoading(false)
      console.log(err);
      console.log('Erro ao buscar usuário')
    }
  }

  // const inputRefs = useRef<Array<TextInput | null>>([]);
  // const handleInputChange = (field: string, index: number, value: string) => {
  //   setInputValues(prevInputValues => ({
  //     ...prevInputValues,
  //     [field]: [
  //       ...prevInputValues[field as keyof typeof prevInputValues].slice(0, index),
  //       value,
  //       ...prevInputValues[field as keyof typeof prevInputValues].slice(index + 1) 
  //     ]
  //   }));
  //   console.log(inputValues)
  //   console.log(index)
  //   if (value !== '') {
  //     if (index < inputValues[field as keyof typeof inputValues].length - 1) {

  //       const nextInput = inputRefs.current[index + 1];
  //       if (nextInput) {
  //         nextInput.focus();
  //       }
  //     }
  //   } else {
  //     if (index > 0) {
  //       field === 'usuario_senhanova' ? index+=4 : index+=0
  //       const previousInput = inputRefs.current[index - 1];
  //       if (previousInput) {
  //         previousInput.focus();
  //       }
  //     }
  //   }
  // };


  return (
    <ScreenBase>
      <Modal
      visible={avisoModal}
      animationType='slide'
      onRequestClose={() => setAvisoModal(false)}
      >
        <ModalSenhaAppScreen onClose={() => setAvisoModal(false)}/>
      </Modal>
      <Modal
      visible={showWarning}
      transparent={true}
      animationType='slide'
      onRequestClose={()=> setShowWarning(false)}>
        <TouchableWithoutFeedback onPress={()=> setShowWarning(false)}>
          <WarningScreen
          onClose={() => setShowWarning(false)}
          warnMessage= {alertMessage}
          />
        </TouchableWithoutFeedback>
      </Modal>
      <Container >
        <DivTop>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}><IconFeather name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
          <TextTopDash>Alterar senha transacional</TextTopDash>
        </DivTop>
        <DivBottom>
        <TextTitle>Digite qual será sua senha para realizar transações</TextTitle>
          <DivInput>
            <LinkToInfoModal onPress={() => setAvisoModal(true)}><TextInputCad><IconFeather name='info' size={12} color={'#000'} /> <Span decoration='underline'>Como criar uma senha segura</Span></TextInputCad></LinkToInfoModal>
            <BlockInput>
              <TextInputCad>Digite sua <Span>senha atual</Span>:</TextInputCad>
              <DivOfInputs>
                {[...Array(4)].map((_, index) => (
                  <InputTransSenha 
                  key={index}
                  maxLength={1}
                  value={inputValues.usuario_senha[index]}
                  ref={(ref) => {}}
                  />
                ))}
              </DivOfInputs>
              {borderRed === '#FF0000' ? <ErrorMessage>{errorMessageAtual}</ErrorMessage> : null}
            </BlockInput>
            <BlockInput>
              <TextInputCad>Digite sua <Span>nova senha</Span>:</TextInputCad>
              <DivOfInputs>
                {[...Array(4)].map((_, index) => (
                  <InputTransSenha 
                  key={index} 
                  maxLength={1}
                  value={inputValues.usuario_senhanova[index]}
                  />
                ))}
              </DivOfInputs>
              {borderRed === '#FF0000' ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
            </BlockInput>
            <BlockInput>
              <TextInputCad>Digite sua <Span>senha</Span>:</TextInputCad>
              <DivOfInputs>
                {[...Array(4)].map((_, index) => (
                  <InputTransSenha 
                  key={index} 
                  maxLength={1}
                  value={inputValues.usuario_senhanovaconfirm[index]}
                  />
                ))}
              </DivOfInputs>
              {borderRed === '#FF0000' ? <ErrorMessage>{errorMessageConfirm}</ErrorMessage> : null}
            </BlockInput>
          </DivInput>
          <DivButtonConfirm>
            <ConfirmButton onPress={handleForm} cor=''><TextButton cor="#fff">CONFIRMAR</TextButton></ConfirmButton>
          </DivButtonConfirm>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}
