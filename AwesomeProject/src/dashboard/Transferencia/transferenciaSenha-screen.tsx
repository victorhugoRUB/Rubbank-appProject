import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { Animated, FlatList, Modal, Share, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import PDF from 'react-native-pdf';

const logoPurple = require('../../assets/logos/logoPurple.png');
const logoWhite = require('../assets/logos/rubbankWhite.png');
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlockTrans, BlockTransDay, ButtonNext, Container, CountInMiddle, DivBottom, DivBottomScroll, DivBttContent, DivBttTop, DivBttTopButton, DivButtonNext, DivContentInput, DivInputTrans, DivSaldo, DivSenhaTrans, DivTextTrans, DivTextValor, DivTop, DivTopContent, InputCadastro, InputToWrite, InputToWriteMask, LogoTrans, PutOnTop, TextButtonDivBtt, TextSaldo, TextTopDash, TextTopDashExtrato } from './transferencia-screen-styles';
import { set, size, transform } from 'lodash';
import Icon from '@react-native-vector-icons/material-icons';
import { InputTransSenha, Span } from '../alterar/alterar-screen.styles';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { TransDetalheScreen } from '../../AvisoModel/transDetalheModal';
import { LoadingSpinner } from '../../Loading/loadingScreen';
import { setFiltroField } from '../../redux/filtroSlice';
import { ConfirmButton, InputLogin, TextButton, TitleInput } from '../../login/login-screen.styles';
import { setDadosTransField } from '../../redux/dadosTransSlice';
import { TextInput } from 'react-native';
import { WarningScreen } from '../../AvisoModel/erroModel';
import { ModalSucessScreen } from '../../AvisoModel/sucessModal';
import { ModalTransSucessScreen } from '../../AvisoModel/sucessTransModal';
import { WarningSenhaTransScreen } from '../../AvisoModel/erroSenhaTransModal';

interface TransferenciaSenhaScreenProps {
  navigation: NavigationProp<RootStackParamList, 'TransferenciaSenha'>;
}

export default function TransferenciaSenhaScreen({navigation}: TransferenciaSenhaScreenProps) {

  const [showBalance, setShowBalance] = useState(false);
  const [messageTrans , setMessageTrans] = useState('');
  const [saldoConta, setSaldoConta] = useState('');
  const [contaBanc, setContaBanc] = useState('')
  const [botaoAtivo, setBotaoAtivo] = useState(false)
  const [flag , setFlag] = useState(false)
  const [transDetalhe, setTransDetalhe] = useState(false)
  const [numPagFlat, setNumPagFlat] = useState(0)
  const filtroData = useSelector((state: ReduxState)=> state.filtro);
  const [loading, setLoading] = useState(false);
  const [isEffect, setIsEffect] = useState(true)
  const [showWarning, setShowWarning] = useState(false)
  const [mainAlertMessage, setMainAlertMessage] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [sucessModal, setSucessModal] = useState(false)
  const TransData = useSelector((state: ReduxState)=> state.dadosTrans);

  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    usuId_destinatario: TransData.usuario_cpf,
    trans_valor: Number(TransData.trans_valor),
    trans_descricao: TransData.trans_descricao,
    trans_metodo: 'TED',
    contaBanc_senhatransacao: TransData.contaBanc_senhatransacao
  })

  const handleFormEdit = (event: any, valor: any) => {
    dispatch(setDadosTransField({field: valor, value: event}))
    setFormData((prevFormData) => ({
      ...prevFormData,
      [valor]: event
    }))
    console.log(formData)
    console.log(TransData)
  }

  const handleInfo = async () => {
    setLoading(true)
    console.log('entrousaldo')
    try{ 
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/conta/saldo`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
      })
      if(!res.ok){
        throw new Error('Erro ao buscar saldo')
      }
      setSaldoConta((await res.json()).contaBanc_saldo)
      console.log(saldoConta)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  const handleForm = async (event: any) => {
    setLoading(true)
    const token = await AsyncStorage.getItem('token');
    try{
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/conta/senhaTrans/validar/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const r = await res.json()
      console.log(r)
      if(!res.ok){
        console.log(r)
        setMainAlertMessage(r.message)
        setAlertMessage(r.message2)
        setShowWarning(true)
        throw new Error('Erro na senha de transferencia')
      }
      
    }catch(err){
      console.log(err)
      setLoading(false)
      return
    }
    try{
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/transferencia/create/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const r = await res.json()
      console.log(res)
      console.log(r)
      if(!res.ok){
        console.log(r)
        setAlertMessage(r)
        console.log(alertMessage)
        setShowWarning(true)
        throw new Error('Erro na senha de transferencia')
      }
      setSucessModal(true)
    }catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleInfo();
        formData
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
  
    fetchData();
  
  }, []);
  const numeroFormatado = Number(saldoConta).toFixed(2).replace('.',',')

  // LÓGICA SENHA TRANS

  const [values, setValues] = useState(['', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([])

  const handleChangeText = (text: string, index: number) => {
    if (text !== '' && index < values.length) {
      const newValues = [...values];
      newValues[index] = text;
      setValues(newValues);
      inputs.current[index + 1]?.focus();
      if (index === 3) {
        const senhaTrans = newValues.join('');
        handleFormEdit(senhaTrans, 'contaBanc_senhatransacao')
      }
    }else{
      const newValues = [...values];
      newValues[index] = text;
      setValues(newValues);
      inputs.current[index - 1]?.focus();
    }
  }
  // FIM LÓGICA SENHA TRANS

  return (
    <ScreenBase>
      <Modal
      visible={showWarning}
      transparent
      animationType='slide'
      onRequestClose={()=> setShowWarning(false)}
      >
        <WarningSenhaTransScreen
        onClose={() => setShowWarning(!showWarning)}
        navigation={() => navigation.navigate('Dashboard')}
        mainWarnMessage={mainAlertMessage}
        warnMessage={alertMessage}
        />
      </Modal>
      <Modal
      visible={sucessModal}
      transparent
      animationType='slide'
      onRequestClose={()=> navigation.navigate('Dashboard')}
      >
        <ModalTransSucessScreen
        navigation={() => navigation.navigate('Extrato')}
        message='Sua transferência foi enviada com sucesso!'
        message2=''
        />
      </Modal>
    <LoadingSpinner visible={loading}/>
      <Container>
        <DivTop>
          <DivTopContent>
            <TouchableOpacity onPress={() => navigation.navigate('TransferenciaCPF')}><IconFeather name="arrow-left" size={26} color="#fff" /></TouchableOpacity>
            <TextTopDash>Transferência</TextTopDash>
          </DivTopContent>
          <DivTopContent>
            <TextSaldo fontSize='16px' textAlign='start' >Saldo disponível</TextSaldo>
            <DivSaldo>
              <TextSaldo fontSize='24px' textAlign='right'>{showBalance ? 'R$'+numeroFormatado : '_____________'}</TextSaldo>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}><IconFeather name={showBalance ? 'eye' : 'eye-off'} size={24} color="#fff"></IconFeather></TouchableOpacity>
            </DivSaldo>
          </DivTopContent> 
        </DivTop>
        <DivBottom>
          <DivBttContent>
            <DivContentInput>
              <DivInputTrans padding='50px 0'>
                <TextButtonDivBtt fontSize='18px'>Confirme sua senha do cartão atual</TextButtonDivBtt>
                <DivSenhaTrans>
                  {values.map((value, index) => (
                    <InputCadastro
                    fontSize='40px'
                    key={index}
                    ref={(ref) => (inputs.current[index] = ref)}
                    maxLength={1}
                    keyboardType='numeric'
                    secureTextEntry
                    onChangeText={(text) => handleChangeText(text, index)}
                    />
                  ))}
                </DivSenhaTrans>
              </DivInputTrans>
            </DivContentInput>            
            <DivInputTrans padding='20px 0'>
              <ConfirmButton onPress={handleForm} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONTINUAR</TextButton></ConfirmButton>
            </DivInputTrans>
          </DivBttContent>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}


{/* {transInfo.map((item) => (
  <Text key={item.trans_valor}>{item.trans_valor}</Text>
))} */}