import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { BlockInput, BlocksOfInput, Container, DivButtonConfirm, DivButtonConfirmSenhaTrans, DivContent, DivInput, DivInputScroll, DivOfInputs, ErrorMessage, InputTransSenha, LinkToInfoModal, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './alterar-screen.styles';
import { ConfirmButton, DivInputLogin, InputLoginSenha, TextButton } from '../../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';
import { ModalSenhaAppScreen } from '../../AvisoModel/senhaAppModel';
import { Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { setsenhaAppField } from '../../redux/senhaAppSlice';
import { DivBottom, TextTopDash, DivTop, MainTextTopDash } from '../perfil/dashboard-screen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WarningScreen } from '../../AvisoModel/erroModel';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import lodash from 'lodash';
import { setSenhaTransField } from '../../redux/senhaTransSlice';
import { DivSenhaTrans, InputCadastro } from '../Transferencia/transferencia-screen-styles';
import { ModalSucessScreen } from '../../AvisoModel/sucessModal';


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
  const [sucessModal, setSucessModal] = useState(false);
  const dispatch = useDispatch();

  const handleFormEdit = (event: any, valor: any) => {
    dispatch((setSenhaTransField({field: valor, value: event})))
    setFormData({
      ...formData,
      [valor]: event
    })
    console.log(formData)
  }

  const handleForm = async () => {
    console.log('chamou')
    setLoading(true)
    try{
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/banco/alterar/senhaTransacional`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      const r = (await res.json());
      console.log(res)
      console.log(r)
      console.log('chegou')
      if(!res.ok){
        console.log('erro ao alterar')
        if(r.message === undefined){
          console.log('entrou nesse if')
          setAlertMessage((r.error[0].mensagem + '\n' +r.error[1].mensagem))
          console.log(alertMessage)
        }else{
          console.log('entrou nesse else')
          setAlertMessage(r.message)
          console.log(alertMessage)
        }
        throw new Error('Erro ao alterar senha')
      }
      setSucessModal(true)
      
    }catch(err){
      console.log(err);
      setShowWarning(true)
    }finally{
      setLoading(false)
    }
  }


// LÓGICA SENHA TRANS
const [formData, setFormData] = useState({
  contaBanc_senhatransacao: '',
  contaBanc_senhatransacaonova: '',
  contaBanc_senhatransacaonovaconfirm: ''
})

const [senhaAtual, setSenhaAtual] = useState(['', '', '', '']);
const [novaSenha, setNovaSenha] = useState(['', '', '', '']);
const [confirmSenha, setConfirmSenha] = useState(['', '', '', '']);

const inputSenhaAtual = useRef<(TextInput | null)[]>([])
const inputNovaSenha = useRef<(TextInput | null)[]>([])
const inputConfirmSenha = useRef<(TextInput | null)[]>([])

const handleChangeTextSenhaAtual = (text: string, index: number) => {
  if (text !== '' && index < senhaAtual.length) {
    const newSenhaAtual = [...senhaAtual];
    newSenhaAtual[index] = text;
    setSenhaAtual(newSenhaAtual);
    inputSenhaAtual.current[index + 1]?.focus();
    if (index === 3) {
      const senhaAtual = newSenhaAtual.join('');
      handleFormEdit(senhaAtual, 'contaBanc_senhatransacao')
      console.log(senhaAtual)
    }
  }else{
    const newSenhaAtual = [...senhaAtual];
    newSenhaAtual[index] = text;
    setSenhaAtual(newSenhaAtual);
    inputSenhaAtual.current[index - 1]?.focus();
  }
}
const handleChangeTextNovaSenha = (text: string, index: number) => {
  if (text !== '' && text !== ' ' && index < novaSenha.length) {
    const newNovaSenha = [...novaSenha];
    newNovaSenha[index] = text;
    setNovaSenha(newNovaSenha);
    inputNovaSenha.current[index + 1]?.focus();
    if (index === 3) {
      const novaSenha = newNovaSenha.join('');
      handleFormEdit(novaSenha, 'contaBanc_senhatransacaonova')
      console.log(novaSenha)
    }
  }else{
    const newNovaSenha = [...novaSenha];
    newNovaSenha[index] = text;
    setNovaSenha(newNovaSenha);
    inputNovaSenha.current[index - 1]?.focus();
  }
}
const handleChangeTextConfirmSenha = (text: string, index: number) => {
  if (text !== '' && index < confirmSenha.length) {
    const newConfirmSenha = [...confirmSenha];
    newConfirmSenha[index] = text;
    setConfirmSenha(newConfirmSenha);
    inputConfirmSenha.current[index + 1]?.focus();
    if (index === 3) {
      const confirmSenha = newConfirmSenha.join('');
      handleFormEdit(confirmSenha, 'contaBanc_senhatransacaonovaconfirm')
      console.log(confirmSenha)
    }
  }else{
    const newConfirmSenha = [...confirmSenha];
    newConfirmSenha[index] = text;
    setConfirmSenha(newConfirmSenha);
    inputConfirmSenha.current[index - 1]?.focus();
  }
}

// FIM LÓGICA SENHA TRANS


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
      <Modal
      visible={sucessModal}
      animationType='slide'
      onRequestClose={() => navigation.navigate('DashboardPerfil')}>
        <ModalSucessScreen navigation={() => navigation.navigate('DashboardPerfil')} message='Alteração realizada' message2='Você redefiniu sua senha com sucesso!'/>
      </Modal>
      <Container>
        <DivTop>
          <TouchableOpacity onPress={() => navigation.navigate('DashboardPerfil')}><IconFeather name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
          <MainTextTopDash>Alterar senha transacional</MainTextTopDash>
          <TouchableOpacity><IconFeather name="help-circle" size={24} color="#fff" /></TouchableOpacity>
        </DivTop>
        <DivBottom>
        <TextTitle>Digite qual será sua senha para realizar transações</TextTitle>
          <DivInput>
            <LinkToInfoModal onPress={() => setAvisoModal(true)}><TextInputCad><IconFeather name='info' size={12} color={'#000'} /> <Span decoration='underline'>Como criar uma senha segura</Span></TextInputCad></LinkToInfoModal>
            <BlockInput>
              <TextInputCad>Digite sua <Span>senha atual</Span>:</TextInputCad>
              <DivSenhaTrans>
                  {senhaAtual.map((value, index) => (
                    <InputCadastro
                    fontSize='40px'
                    key={index}
                    ref={(ref) => (inputSenhaAtual.current[index] = ref)}
                    maxLength={1}
                    keyboardType='numeric'
                    value={value}
                    secureTextEntry
                    onChangeText={(text) => {handleChangeTextSenhaAtual(text.replace(/[^0-9/s]/g, ''), index)}}
                    />
                  ))}
                </DivSenhaTrans>
            </BlockInput>
            <BlockInput>
              <TextInputCad>Digite sua <Span>senha nova</Span>:</TextInputCad>
              <DivSenhaTrans>
                  {novaSenha.map((value, index) => (
                    <InputCadastro
                    fontSize='40px'
                    key={index}
                    ref={(ref) => (inputNovaSenha.current[index] = ref)}
                    maxLength={1}
                    keyboardType='numeric'
                    value={value}
                    secureTextEntry
                    onChangeText={(text) => handleChangeTextNovaSenha(text.replace(/[^0-9/s]/g, ''), index)}
                    />
                  ))}
                </DivSenhaTrans>
            </BlockInput>
            <BlockInput>
              <TextInputCad>Confirme sua <Span>nova senha</Span>:</TextInputCad>
              <DivSenhaTrans>
                  {confirmSenha.map((value, index) => (
                    <InputCadastro
                    fontSize='40px'
                    key={index}
                    ref={(ref) => (inputConfirmSenha.current[index] = ref)}
                    maxLength={1}
                    keyboardType='numeric'
                    value={value}
                    secureTextEntry
                    onChangeText={(text) => handleChangeTextConfirmSenha(text.replace(/[^0-9/s]/g, ''), index)}
                    />
                  ))}
                </DivSenhaTrans>
            </BlockInput>
          </DivInput>
          <DivButtonConfirmSenhaTrans>
            <ConfirmButton onPress={handleForm} cor=''><TextButton cor="#fff">CONFIRMAR</TextButton></ConfirmButton>
          </DivButtonConfirmSenhaTrans>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}
