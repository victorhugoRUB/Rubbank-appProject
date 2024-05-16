import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, Container, DivButtonConfirm, DivInput, ErrorMessage, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLogin, InputLoginSenha, TextButton } from '../login/login-screen.styles';
import { CalendarScreen } from '../AvisoModel/calendarModel';
import { Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../redux/store';
import { setUserField } from '../redux/userSlice';

interface OnboardingScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingDadosPessoais'>;
}

export default function OnboardingScreen({navigation}: OnboardingScreenProps) {
  const [loading, setLoading] = useState(false);
  const [borderRedNOME, setBorderRedNOME] = useState('#000000');
  const [borderRedEMAIL, setBorderRedEMAIL] = useState('#000000');
  const [borderRedTEL, setBorderRedTEL] = useState('#000000');
  const [borderRedCPF, setBorderRedCPF] = useState('#000000');
  const [borderRedDTNASC, setBorderRedDTNASC] = useState('#000000');
  const [openCalendar, setOpenCalendar] = useState(false);
  const [buttonState, setButtonState] = useState(false);
  const [errorMessageNome, setErrorMessageNome] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessageTel, setErrorMessageTel] = useState('');
  const [errorMessageCPF, setErrorMessageCPF] = useState('');
  const [errorMessageDtNasc, setErrorMessageDtNasc] = useState('');

  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    usuario_nome: '',
    usuario_email: '',
    usuario_tel: '',
    usuario_cpf: '',
    usuario_dtNascimento: ''
  })

  const handleDateSelected = (date: string) => {
    dispatch(setUserField({field: 'usuario_dtNascimento', value: date}))
    setFormData({
      ...formData,
      usuario_dtNascimento: date
    })
  }

  const handleFormEdit = (event: any, valor: any) => {
    dispatch((setUserField({field: valor, value: event})))
    setFormData({
      ...formData,
      [valor]: event
    })
  }

  useEffect(() => {
    const controlButtonState = () => {
      if(formData.usuario_nome === '' || formData.usuario_email === '' || formData.usuario_tel === '' || formData.usuario_cpf === '' || formData.usuario_dtNascimento === ''){
        setButtonState(false)
        return;
      }else{
        setButtonState(true)
      }
    }
    controlButtonState();
  }, [formData])


  const handleForm = async (event: any) => {
    try {
      event.preventDefault()
      setLoading(true)
    }catch(err){
      console.log(err)
    }

  }
  return (
    <ScreenBase>
      <Container>
        <Modal visible={openCalendar} transparent onRequestClose={()=> setOpenCalendar(false)}>
          <CalendarScreen
          onClose={() => setOpenCalendar(false)}
          onSelectedDate={handleDateSelected}
          />
        </Modal>
        <TopBar><TopBarBluePart width='25%'/></TopBar>
        <TextTitle>Preencha abaixo com seus dados pessoais.</TextTitle>
        <DivInput>
          <BlockInput>
            <TextInputCad>Nome Completo*</TextInputCad>
            <InputLoginSenha
            placeholder='Digite seu nome completo'
            placeholderTextColor='#aaabab'
            value={formData.usuario_nome}
            onChangeText={(e) => {
              if (/^[A-Z][a-z].* [A-Z][a-z].*/.test(e)) {
                setBorderRedNOME('#000000');
                handleFormEdit(e, 'usuario_nome');
                setErrorMessageNome('');
              } else {
                setBorderRedNOME('#FF0000');
                handleFormEdit(e, 'usuario_nome');
                setErrorMessageNome('Formato de nome correto: "Nome Sobrenome"');
              }
            }}
            style={{borderColor: borderRedNOME}}
            />
            {borderRedNOME === '#FF0000' ? <ErrorMessage>{errorMessageNome}</ErrorMessage> : null}
          </BlockInput>
          <BlockInput>
            <TextInputCad>Email*</TextInputCad>
            <InputLoginSenha
            placeholder='Digite seu email'
            placeholderTextColor='#aaabab'
            value={formData.usuario_email}
            onChangeText={(e) => {
              if (/^[A-Za-z][A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[a-zA-Z.]+$/.test(e)) {
                setBorderRedEMAIL('#000000');
                handleFormEdit(e, 'usuario_email');
                setErrorMessageEmail('');
              } else {
                setBorderRedEMAIL('#FF0000');
                handleFormEdit(e, 'usuario_email');
                setErrorMessageEmail('Seu email deve conter "@" e " . " Ex: rubbank@hotmail.com');
              }
            }}
            style={{borderColor: borderRedEMAIL}}
            />
            {borderRedEMAIL === '#FF0000' ? <ErrorMessage>{errorMessageEmail}</ErrorMessage> : null}

          </BlockInput>
          <BlockInput>
            <TextInputCad>Telefone*</TextInputCad>
            <InputLogin
            placeholder='(DDD) xxxxx-xxxx'
            placeholderTextColor='#aaabab'
            value={formData.usuario_tel}
            onChangeText={(e) => {
              if (/^\(\d{2}\) \d{5}-\d{4}$/.test(e)) {
                setBorderRedTEL('#000000');
                handleFormEdit(e.replace(/[()-\s]/g, ''), 'usuario_tel');
                setErrorMessageTel('');
              } else {
                setBorderRedTEL('#FF0000');
                handleFormEdit(e.replace(/[()-\s]/g, ''), 'usuario_tel');
                setErrorMessageTel('Deve ser um número válido. Ex: (11) 99999-9999');
              }
            }}
            type='cel-phone'
            style={{borderColor: borderRedTEL}}
            />
            {borderRedTEL === '#FF0000' ? <ErrorMessage>{errorMessageTel}</ErrorMessage> : null}

          </BlockInput>
          <BlockInput>
            <TextInputCad>CPF*</TextInputCad>
            <InputLogin
            placeholder='Digite seu CPF'
            placeholderTextColor='#aaabab'
            value={formData.usuario_cpf}
            onChangeText={(e) => {
              if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(e)) {
                setBorderRedCPF('#000000');
                handleFormEdit(e.replace(/[.-]/g, ''), 'usuario_cpf');
                setErrorMessageCPF('');
              } else {
                setBorderRedCPF('#FF0000');
                handleFormEdit(e.replace(/[.-]/g, ''), 'usuario_cpf');
                setErrorMessageCPF('Deve ser um CPF válido');
              }
            }}
            type='cpf'
            style={{borderColor: borderRedCPF}}
            />
            {borderRedCPF === '#FF0000' ? <ErrorMessage>{errorMessageCPF}</ErrorMessage> : null}
          </BlockInput>
          <BlockInput>
            <TextInputCad>Data de nascimento*</TextInputCad>
            <InputLoginSenha
            placeholder='aaaa-mm-dd'
            placeholderTextColor='#aaabab'
            value={formData.usuario_dtNascimento}
            onChangeText={(e) => {
              if (/^[0-9+]{13,14}$/.test(e)) {
                setBorderRedDTNASC('#000000');
                handleFormEdit(e, 'usuario_dtNascimento');
                setErrorMessageEmail('');
              } else {
                setBorderRedDTNASC('#FF0000');
                handleFormEdit(e, 'usuario_dtNascimento');
                setErrorMessageTel('Deve ser uma data de nascimento válido');
              }
            }}
            onFocus={() => setOpenCalendar(true)}
            style={{borderColor: borderRedDTNASC}}
            />
            {borderRedDTNASC === '#FF0000' ? <ErrorMessage>{errorMessageTel}</ErrorMessage> : null}

          </BlockInput>
        </DivInput>
        <DivButtonConfirm>
          <ConfirmButton style={!buttonState || (borderRedNOME === '#FF0000' || borderRedEMAIL === '#FF0000' || borderRedTEL === '#FF0000' || borderRedCPF === '#FF0000' || borderRedDTNASC === '#FF0000') ? {backgroundColor: '#6b79e578' }: {}} disabled={!buttonState || (borderRedNOME === '#FF0000' || borderRedEMAIL === '#FF0000' || borderRedTEL === '#FF0000' || borderRedCPF === '#FF0000' || borderRedDTNASC === '#FF0000')} onPress={() => navigation.navigate('OnboardingCEP')} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}