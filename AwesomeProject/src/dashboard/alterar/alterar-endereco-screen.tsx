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
import { DivBottom, TextTopDash, DivTop, MainTextTopDash, NewDivBottom } from '../perfil/dashboard-screen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WarningScreen } from '../../AvisoModel/erroModel';
import { ModalSucessScreen } from '../../AvisoModel/sucessModal';
import { LoadingSpinner } from '../../Loading/loadingScreen';


interface AlterarEnderecoScreenProps {
  navigation: NavigationProp<RootStackParamList, 'AlterarEndereco'>;
}

export default function AlterarEnderecoScreen({navigation}: AlterarEnderecoScreenProps) {
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
  const endData = useSelector((state: ReduxState) => state.end);

  const dispatch = useDispatch();

  useEffect(() => {
    setFormData({
      end_cep: endData.end_cep, 
      end_rua: endData.end_rua,
      end_num: endData.end_num,
      end_complem: endData.end_complem,
      end_bairro: endData.end_bairro,
      end_cidade: endData.end_cidade,
      end_uf: endData.end_uf
    })
    setEndCEP({
      end_cep: endData.end_cep, 
      end_rua: endData.end_rua,
      end_num: endData.end_num,
      end_complem: endData.end_complem,
      end_bairro: endData.end_bairro,
      end_cidade: endData.end_cidade,
      end_uf: endData.end_uf
    })
    if(formData.end_cep !== ''){
      setButtonState(true)
    }
  }, [endData])

  const [formData, setFormData] = useState({
    end_cep: endData.end_cep, 
    end_rua: endData.end_rua,
    end_num: endData.end_num,
    end_complem: endData.end_complem,
    end_bairro: endData.end_bairro,
    end_cidade: endData.end_cidade,
    end_uf: endData.end_uf
  })

  const [endCEP, setEndCEP] = useState({
    end_cep: endData.end_cep, 
    end_rua: endData.end_rua,
    end_num: endData.end_num,
    end_complem: endData.end_complem,
    end_bairro: endData.end_bairro,
    end_cidade: endData.end_cidade,
    end_uf: endData.end_uf
  })

  const handleFormEdit = (event: any, valor: any) => {
    dispatch((setsenhaAppField({field: valor, value: event})))
    setFormData({
      ...formData,
      [valor]: event
    })
    console.log(formData)
  }

  const checkCEP = (e: any) => {
    const cep = e.replace(/\D/g, '');
    setButtonState(false)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(async data => {
      setLoading(true)
      if(data.erro){
        setShowWarning(true)
        setAlertMessage('CEP não encontrado')
        console.log('CEP não encontrado')
        setLoading(false)
        return
      }else{
        setButtonState(true)
        await AsyncStorage.setItem('CEP', JSON.stringify(data))
        console.log(data)
        console.log('XXXXXXXXXX', endData)
        handleEnd()
        setLoading(false)
      }
    })
  }

  const handleEnd = async () => {
    const end = await AsyncStorage.getItem('CEP')
    const parseEnd = JSON.parse(end || '')
    console.log(parseEnd)
    setEndCEP({
      ...endCEP,
      end_cep: parseEnd.cep,
      end_rua: parseEnd.logradouro,
      end_bairro: parseEnd.bairro,
      end_cidade: parseEnd.localidade,
      end_uf: parseEnd.uf
    })
    setFormData({
      ...formData,
      end_cep: parseEnd.cep,
      end_rua: parseEnd.logradouro,
      end_bairro: parseEnd.bairro,
      end_cidade: parseEnd.localidade,
      end_uf: parseEnd.uf
    })
    console.log(formData)
  }
  
  const handleForm = async () => {
    console.log('chamou')
    setLoading(true)
    try{
      const token = await AsyncStorage.getItem('token')
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/banco/alterar/endereco/${endData.end_id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      const r = await res.json()
      console.log(res)
      console.log(r)
      if(!res.ok){
        setAlertMessage(r.message)  
        setShowWarning(true)
        setLoading(false)
        throw new Error('Erro ao alterar endereço')
      }
      setSucessModal(true)
      console.log('chegou no sucess modal')
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }

  }

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
        <ModalSucessScreen navigation={() => navigation.navigate('DashboardPerfil')} message='Alteração realizada' message2='Você redefiniu seu endereço com sucesso!'/>
      </Modal>
      <Container>
        <DivTop>
          <TouchableOpacity onPress={() => navigation.navigate('ListarEndereco')}><IconFeather name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
          <MainTextTopDash>Alterar endereço</MainTextTopDash>
          <TouchableOpacity><IconFeather name="help-circle" size={24} color="#fff" /></TouchableOpacity>
        </DivTop>
        <NewDivBottom>
        <DivInput>
            <BlockInput>
              <TextInputCad>CEP*</TextInputCad>
              <InputCadastro
              type='zip-code'
              placeholder='XXXXX-XXX'
              placeholderTextColor='#aaabab'
              value={formData.end_cep}
              onChangeText={(e) => {
                checkCEP(e)  
                handleFormEdit(e, 'end_cep')
              }}
              />
            </BlockInput>
            <BlockInput>
              <TextInputCad>Endereço*</TextInputCad>
              <InputLoginSenha
              placeholder='Digite seu endereço'
              placeholderTextColor='#aaabab'
              value={formData.end_rua}
              onChangeText={(e) => handleFormEdit(e, 'end_rua')}
              editable={endCEP.end_rua === ''} 
              />
            </BlockInput>
            <BlocksOfInput>
              <BlockInput width='46%'>
                <TextInputCad>Número*</TextInputCad>
                <InputLoginSenha
                placeholder='Número residência'
                placeholderTextColor='#aaabab'
                value={formData.end_num}
                onChangeText={(e) => handleFormEdit(e, 'end_num')}
                editable={true} 
                />
              </BlockInput>
              <BlockInput width='46%'>
                <TextInputCad>Complemento*</TextInputCad>
                <InputLoginSenha
                placeholder='Complemento'
                placeholderTextColor='#aaabab'
                value={formData.end_complem}
                onChangeText={(e) => handleFormEdit(e, 'end_complem')}
                editable={true} 
                />
              </BlockInput>
            </BlocksOfInput>
            <BlockInput>
              <TextInputCad>Bairro*</TextInputCad>
              <InputLoginSenha
              placeholder='Seu bairro'
              placeholderTextColor='#aaabab'
              value={formData.end_bairro}
              onChangeText={(e) => handleFormEdit(e, 'end_bairro')}
              editable={endCEP.end_rua === ''} 
              />
            </BlockInput>
            <BlocksOfInput>
              <BlockInput width='46%'>
                <TextInputCad>Cidade*</TextInputCad>
                <InputLoginSenha
                placeholder='Sua cidade'
                placeholderTextColor='#aaabab'
                value={formData.end_cidade}
                onChangeText={(e) => handleFormEdit(e, 'end_cidade')}
                editable={formData.end_cidade === ''} 
                />
              </BlockInput>
              <BlockInput width='46%'>
                <TextInputCad>UF*</TextInputCad>
                <InputLoginSenha
                placeholder='Seu estado'
                placeholderTextColor='#aaabab'
                value={formData.end_uf}
                onChangeText={(e) => handleFormEdit(e, 'end_uf')}
                editable={formData.end_uf === ''} 
                />
              </BlockInput>
            </BlocksOfInput>
          </DivInput>
          <DivButtonConfirm>
            <ConfirmButton style={!buttonState || (borderRedATUAL === '#FF0000' || borderRedNOVA === '#FF0000' || borderRedCONFIRM === '#FF0000') ? {backgroundColor: '#6b79e578' }: {}} disabled={!buttonState} onPress={handleForm} cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
          </DivButtonConfirm>
        </NewDivBottom>
      </Container>
    </ScreenBase>
  );
}
