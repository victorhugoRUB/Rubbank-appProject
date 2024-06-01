import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import { BlockTrans, BlockTransDay, ButtonNext, Container, CountInMiddle, DivBottom, DivBttContent, DivBttTop, DivBttTopButton, DivButtonNext, DivContentInput, DivInputTrans, DivSaldo, DivTextTrans, DivTextValor, DivTop, DivTopContent, LogoTrans, PutOnTop, TextButtonDivBtt, TextSaldo, TextTopDash, TextTopDashExtrato } from './transferencia-screen-styles';
import { set, transform } from 'lodash';
import Icon from '@react-native-vector-icons/material-icons';
import { Span } from '../alterar/alterar-screen.styles';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { TransDetalheScreen } from '../../AvisoModel/transDetalheModal';
import { LoadingSpinner } from '../../Loading/loadingScreen';
import { setFiltroField } from '../../redux/filtroSlice';
import { ConfirmButton, InputLogin, TextButton, TitleInput } from '../../login/login-screen.styles';
import { setDadosTransField } from '../../redux/dadosTransSlice';
import { WarningScreen } from '../../AvisoModel/erroModel';
import { MainTextTopDash, NewDivBottom } from '../perfil/dashboard-screen.styles';
import { logEvent } from '../../firebase/firebase';

interface TransferenciaNumContaScreenProps {
  navigation: NavigationProp<RootStackParamList, 'TransferenciaNumConta'>;
}

interface TransInfo {
  trans_id: number,
  usuId_remetente: number,
  usuId_destinatario: number,
  trans_valor: number,
  trans_descricao: string,
  trans_status: string,
  trans_metodo: string
  createdAt: string
}

export default function TransferenciaNumContaScreen({navigation}: TransferenciaNumContaScreenProps) {
  console.log('AAAAAAAAAAAAAAAAAAA')
  const [showBalance, setShowBalance] = useState(false);
  const [messageTrans , setMessageTrans] = useState('');
  const [saldoConta, setSaldoConta] = useState('');
  const [contaBanc, setContaBanc] = useState('')
  const [botaoAtivo, setBotaoAtivo] = useState(false)
  const [transInfo, setTransInfo] = useState<TransInfo[]>([])
  const [transDetalheInfo, setTransDetalheInfo] = useState<TransInfo>()
  const [flag , setFlag] = useState(false)
  const [transDetalhe, setTransDetalhe] = useState(false)
  const [numPagFlat, setNumPagFlat] = useState(0)
  const filtroData = useSelector((state: ReduxState)=> state.filtro);
  const [loading, setLoading] = useState(false);
  const [isEffect, setIsEffect] = useState(true)
  const [showWarning, setShowWarning] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const dadosTransData = useSelector((state: ReduxState)=> state.dadosTrans);

  const dispatch = useDispatch();

  const[formData, setFormData] = useState({
    contaBanc_agencia: '',
    contaBanc_conta: ''
  })

  const handleFormEdit = (event: any, valor: any) => {
    setFormData({
      ...formData,
      [valor]: event
    })
    console.log(formData)
  }

  const handleInfo = async () => {
    setLoading(true)
    console.log('GET SALDO NUM CONTA')
    const startTime = new Date().getTime()
    const token = await AsyncStorage.getItem('token');
    try{ 
      const saldoRes = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/conta/saldo`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      })
      if(!saldoRes.ok){
        throw new Error('Erro ao buscar saldo')
      }
      setSaldoConta((await saldoRes.json()).contaBanc_saldo)
      dispatch(setDadosTransField({field: 'usuario_remetente', value: ''}))
      dispatch(setDadosTransField({field: 'usuario_cpf', value: ''}))
      dispatch(setDadosTransField({field: 'usuario_destinatario', value: ''}))
      dispatch(setDadosTransField({field: 'contaBanc_agencia', value: ''}))
      dispatch(setDadosTransField({field: 'contaBanc_conta', value: ''}))
      dispatch(setDadosTransField({field: 'trans_descricao', value: ''}))
      dispatch(setDadosTransField({field: 'trans_valor', value: 0}))
      dispatch(setDadosTransField({field: 'contaBanc_senhatransacao', value: ''}))
      console.log(dadosTransData)
    }catch(err){
      console.log(err)
    }finally{
      const endTime = new Date().getTime()
      const time = endTime - startTime
      logEvent('resService_time', time)
      setLoading(false)
    }
  }

  const handleForm = async (event: any) => {
    setLoading(true)
    const startTime = new Date().getTime()
    const token = await AsyncStorage.getItem('token');
    try{
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/usuario/`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${token}`
        }
      })
      const r = await res.json()
      if(!res.ok){
        throw new Error('Erro ao buscar usuário')
      }
      dispatch(setDadosTransField({field: 'usuario_remetente', value: r.usuario_nome}))
    }catch(err){
      console.log(err)
      return
    }      
    try{
      console.log('validar cpf')
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/conta/numConta/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contaBanc_agencia: Number(formData.contaBanc_agencia),
          contaBanc_conta: formData.contaBanc_conta
        })
      }); 
      const r = await res.json()
      console.log(res)
      console.log(r)
      if(!res.ok){
        setAlertMessage(r.message)
        setShowWarning(true)
        throw new Error('Erro ao buscar dados do usuário')
      }
      dispatch(setDadosTransField({field: 'usuario_cpf', value: r.usuario_cpf}))
      dispatch(setDadosTransField({field: 'usuario_destinatario', value: r.usuario_nome}))
      dispatch(setDadosTransField({field: 'contaBanc_agencia', value: r.conta[0].contaBanc_agencia}))
      dispatch(setDadosTransField({field: 'contaBanc_conta', value: r.conta[0].contaBanc_conta}))
      navigation.navigate('TransferenciaValorDesc')
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {console.log('entrou'), handleInfo()}, [])

  const numeroFormatado = Number(saldoConta).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <ScreenBase>
    <LoadingSpinner visible={loading}/>
    <Modal
      visible={showWarning}
      transparent
      animationType='slide'
      onRequestClose={()=> setShowWarning(false)}
      >
        <WarningScreen
        onClose={() => setShowWarning(!showWarning)}
        warnMessage={alertMessage}
        />
      </Modal>
      <Container>
        <DivTop>
          <DivTopContent>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}><IconFeather name="arrow-left" size={26} color="#fff" /></TouchableOpacity>
            <MainTextTopDash>Transferência</MainTextTopDash>
            <TouchableOpacity><IconFeather name="help-circle" size={26} color="#fff" /></TouchableOpacity>
          </DivTopContent>
          <DivTopContent>
            <TextSaldo fontSize='16px' textAlign='start' >Saldo disponível</TextSaldo>
            <DivSaldo>
              <TextSaldo fontSize='24px' textAlign='right'>{showBalance ? 'R$'+numeroFormatado : '_____________'}</TextSaldo>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}><IconFeather name={showBalance ? 'eye' : 'eye-off'} size={24} color="#fff"></IconFeather></TouchableOpacity>
            </DivSaldo>
          </DivTopContent> 
        </DivTop>
        <NewDivBottom>
          <DivBttContent>
            <DivBttTop>
              <DivBttTopButton onPress={() => navigation.navigate('TransferenciaCPF')}><TextButtonDivBtt>CPF</TextButtonDivBtt></DivBttTopButton>
              <DivBttTopButton width='3px'><TextButtonDivBtt>Número da conta</TextButtonDivBtt></DivBttTopButton>
            </DivBttTop>
            <DivContentInput>
              <DivInputTrans>
                <TitleInput>Agência</TitleInput>
                <InputLogin 
                type='only-numbers'
                placeholder='Insira o número da agência'
                value={formData.contaBanc_agencia}
                onChangeText={(e) => handleFormEdit(e, 'contaBanc_agencia')}
                />
              </DivInputTrans>
              <DivInputTrans>
                <TitleInput>Conta</TitleInput>
                <InputLogin 
                type='only-numbers'
                placeholder='Insira o número da conta'
                value={formData.contaBanc_conta}
                onChangeText={(e) => handleFormEdit(e, 'contaBanc_conta')}
                />
              </DivInputTrans>
            </DivContentInput>
          </DivBttContent>
          <DivInputTrans>
            <ConfirmButton onPress={handleForm} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONTINUAR</TextButton></ConfirmButton>
          </DivInputTrans>
        </NewDivBottom>
      </Container>
    </ScreenBase>
  );
}


{/* {transInfo.map((item) => (
  <Text key={item.trans_valor}>{item.trans_valor}</Text>
))} */}