import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { BlockInput, BlocksOfInput, Container, DivButtonConfirm, DivContent, DivInput, ErrorMessage, InputCadastro, LinkToInfoModal, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './alterar-screen.styles';
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
import { ModalSucessScreen } from '../../AvisoModel/sucessModal';
import { LoadingSpinner } from '../../Loading/loadingScreen';


interface AlterarSenhaAppScreenProps {
  navigation: NavigationProp<RootStackParamList, 'AlterarSenhaApp'>;
}

export default function AlterarSenhaAppScreen({navigation}: AlterarSenhaAppScreenProps) {
  const [loading, setLoading] = useState(false);
  const [avisoModal, setAvisoModal] = useState(false);
  const [sucessModal, setSucessModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [borderRedATUAL, setBorderRedATUAL] = useState('#000000');
  const [borderRedNOVA, setBorderRedNOVA] = useState('#000000');
  const [borderRedCONFIRM, setBorderRedCONFIRM] = useState('#000000');
  const [errorMessageAtual, setErrorMessageAtual] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageConfirm, setErrorMessageConfirm] = useState('');
  const [buttonState, setButtonState ] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    usuario_senha: '',
    usuario_senhanova: '',
    usuario_senhanovaconfirm: ''
  })

  const handleFormEdit = (event: any, valor: any) => {
    dispatch((setsenhaAppField({field: valor, value: event})))
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
        const AlertMessage = (await res.json());
        if(contaInfo.usuario_senha !== formData.usuario_senha){
          setAlertMessage(AlertMessage.message)
          setShowWarning(true)
          setLoading(false)
          return
        }
      }
      setSucessModal(true)
      setLoading(false)
    }catch(err){
      setLoading(false)
      console.log(err);
      console.log('Erro ao buscar usuário')
    }
  }
  useEffect(() => {
    if(formData.usuario_senha === '' || formData.usuario_senhanova === '' || formData.usuario_senhanovaconfirm === ''){
      setButtonState(false)
      return
    }else{
      setButtonState(true)
    }
  }, [formData])

  
  return (
    <ScreenBase>
      <LoadingSpinner visible={loading}/>
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
      <Modal
      visible={sucessModal}
      animationType='slide'
      onRequestClose={() => setSucessModal(false)}>
        <ModalSucessScreen navigation={() => navigation.navigate('DashboardPerfil')} message='Alteração realizada' message2='Você redefiniu sua senha com sucesso!'/>
      </Modal>
      <Container>
        <DivTop>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}><IconFeather name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
          <TextTopDash>Alterar senha do App</TextTopDash>
        </DivTop>
        <DivBottom>
        <TextTitle>Digite qual será sua senha para entrar no aplicativo</TextTitle>
          <DivInput>
            <LinkToInfoModal onPress={() => setAvisoModal(true)}><TextInputCad><IconFeather name='info' size={12} color={'#000'} /> <Span decoration='underline'>Como criar uma senha segura</Span></TextInputCad></LinkToInfoModal>
            <BlockInput>
              <TextInputCad>Digite sua <Span>senha atual</Span>:</TextInputCad>
              <InputLoginSenha
              value={formData.usuario_senha}
              onChangeText={(e) => {
                if(/^(?=.*[_!@#$%&?'*+\/=?`{|}()~^.,-])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(e)){
                  setBorderRedATUAL('#000000')
                  handleFormEdit(e, 'usuario_senha')
                  setErrorMessageAtual('')
                }else{
                  setBorderRedATUAL('#FF0000')
                  handleFormEdit(e, 'usuario_senha')
                  setErrorMessageAtual('Deve ser sua senha atual')
                }
              }}
              style={{borderColor: borderRedATUAL}}
              secureTextEntry/>
              {borderRedATUAL === '#FF0000' ? <ErrorMessage>{errorMessageAtual}</ErrorMessage> : null}
            </BlockInput>
            <BlockInput>
              <TextInputCad>Digite sua <Span>nova senha</Span>:</TextInputCad>
              <InputLoginSenha
              value={formData.usuario_senhanova}
              onChangeText={(e) => {
                if(/^(?=.*[_!@#$%&?'*+\/=?`{|}()~^.,-])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(e)){
                  setBorderRedNOVA('#000000')
                  handleFormEdit(e, 'usuario_senhanova')
                  setErrorMessage('')
                }else{
                  setBorderRedNOVA('#FF0000')
                  handleFormEdit(e, 'usuario_senhanova')
                  setErrorMessage('Sua senha deve ser igual a anterior')
                }
              }}
              style={{borderColor: borderRedNOVA}}
              secureTextEntry/> 
              {borderRedNOVA === '#FF0000' ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
            </BlockInput>
            <BlockInput>
              <TextInputCad>Digite sua <Span>senha</Span>:</TextInputCad>
              <InputLoginSenha
              value={formData.usuario_senhanovaconfirm}
              onChangeText={(e) => {
                if(e === formData.usuario_senhanova){
                  setBorderRedCONFIRM('#000000')
                  handleFormEdit(e, 'usuario_senhanovaconfirm')
                  setErrorMessageConfirm('')
                }else{
                  setBorderRedCONFIRM('#FF0000')
                  handleFormEdit(e, 'usuario_senhanovaconfirm')
                  setErrorMessageConfirm('Sua senha deve ser igual a anterior.')
                }
              }}
              style={{borderColor: borderRedCONFIRM}}
              secureTextEntry/>
              {borderRedCONFIRM === '#FF0000' ? <ErrorMessage>{errorMessageConfirm}</ErrorMessage> : null}
            </BlockInput>
          </DivInput>
          <DivButtonConfirm>
            <ConfirmButton style={!buttonState || (borderRedATUAL === '#FF0000' || borderRedNOVA === '#FF0000' || borderRedCONFIRM === '#FF0000') ? {backgroundColor: '#6b79e578' }: {}} disabled={!buttonState || (borderRedATUAL === '#FF0000' || borderRedNOVA === '#FF0000' || borderRedCONFIRM === '#FF0000')} onPress={handleForm} cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
          </DivButtonConfirm>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}
