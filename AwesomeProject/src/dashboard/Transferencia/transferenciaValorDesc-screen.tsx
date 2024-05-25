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
import { BlockTrans, BlockTransDay, ButtonNext, Container, CountInMiddle, DivBottom, DivBottomScroll, DivBttContent, DivBttTop, DivBttTopButton, DivButtonNext, DivContentInput, DivInputTrans, DivSaldo, DivTextTrans, DivTextValor, DivTop, DivTopContent, InputToWrite, InputToWriteMask, LogoTrans, PutOnTop, TextButtonDivBtt, TextSaldo, TextTopDash, TextTopDashExtrato } from './transferencia-screen-styles';
import { set, size, transform } from 'lodash';
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

interface TransferenciaValorDescScreenProps {
  navigation: NavigationProp<RootStackParamList, 'TransferenciaValorDesc'>;
}

export default function TransferenciaValorDescScreen({navigation}: TransferenciaValorDescScreenProps) {

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
  const TransData = useSelector((state: ReduxState)=> state.dadosTrans);
  const [showWarning, setShowWarning] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    usuario_remetente: TransData.usuario_remetente,
    usuario_cpf: TransData.usuario_cpf,
    usuario_destinatario: TransData.usuario_destinatario,
    contaBanc_nome: TransData.contaBanc_nome,
    contaBanc_agencia: TransData.contaBanc_agencia,
    contaBanc_conta: TransData.contaBanc_conta,
    trans_descricao: TransData.trans_descricao,
    trans_valor: TransData.trans_valor,
  })

  const handleFormEdit = (event: any, valor: any) => {
    dispatch(setDadosTransField({field: valor, value: event}))
    setFormData({
      ...formData,
      [valor]: event
    })
    console.log(formData)
    console.log(TransData)
  }

  const handleInfo = async () => {
    setLoading(true)
    console.log('entrousaldo')
    try{ 
      const token = await AsyncStorage.getItem('token');
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
      console.log(saldoConta)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  const handleForm = async (event: any) => {
    console.log('entrou valida saldo')
    setLoading(true)
    const token = await AsyncStorage.getItem('token');
    try{
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/conta/saldo/validar`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const r = await res.json()
      console.log(res.ok)
      console.log(r)
      if(!res.ok){
        setAlertMessage(r.message)
        setShowWarning(true)
        throw new Error('Erro ao buscar dados bancários')
      }
      navigation.navigate('TransferenciaSenha')
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(() => {handleInfo()}, [])
  
  const numeroFormatado = Number(saldoConta).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <ScreenBase>
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
        <DivBottomScroll>
          <DivBttContent>
            <DivContentInput>
              <DivInputTrans>
                <TitleInput>Enviado de</TitleInput>
                <TextButtonDivBtt fontSize='18px'>{formData.usuario_remetente}</TextButtonDivBtt>
              </DivInputTrans>
              <DivInputTrans>
                <TitleInput>CPF</TitleInput>
                <TextButtonDivBtt fontSize='18px'>{formData.usuario_cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}</TextButtonDivBtt>
              </DivInputTrans>
              <DivInputTrans>
                <TitleInput>Nome</TitleInput>
                <TextButtonDivBtt fontSize='18px'>{formData.usuario_destinatario}</TextButtonDivBtt>
              </DivInputTrans>
              <DivInputTrans>
                <TitleInput>Banco</TitleInput>
                <TextButtonDivBtt fontSize='18px'>{formData.contaBanc_nome}</TextButtonDivBtt>
              </DivInputTrans>
              <DivInputTrans>
                <TitleInput>Agência</TitleInput>
                <TextButtonDivBtt fontSize='18px'>{formData.contaBanc_agencia}</TextButtonDivBtt>
              </DivInputTrans>
              <DivInputTrans>
                <TitleInput>Conta</TitleInput>
                <TextButtonDivBtt fontSize='18px'>{formData.contaBanc_conta}</TextButtonDivBtt>
              </DivInputTrans>
              <DivInputTrans gap='20px'>
                <TitleInput>Descrição</TitleInput>
                <InputToWrite
                placeholder='Insira uma descrição ou alguma mensagem que deseja enviar.'
                value={formData.trans_descricao}
                onChangeText={(e) => {handleFormEdit(e, 'trans_descricao')}}
                multiline={true}
                numberOfLines={4}
                />
              </DivInputTrans>
              <DivInputTrans gap='20px'>
                <TitleInput>Valor do pagamento</TitleInput>
                <InputToWriteMask
                placeholder=''
                type='money'
                options={
                  {
                    unit: '',
                  }
                }
                value={formData.trans_valor.toString()}
                onChangeText={(e) => {handleFormEdit((e.replace(/,/g, '.').replace(/\.(?=.*\..*$)/g, '')), 'trans_valor')}}
                multiline={true}
                numberOfLines={4}
                />
              </DivInputTrans>
            </DivContentInput>            
            <DivInputTrans padding='50px 0'>
              <ConfirmButton onPress={handleForm} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONTINUAR</TextButton></ConfirmButton>
            </DivInputTrans>
          </DivBttContent>
        </DivBottomScroll>
      </Container>
    </ScreenBase>
  );
}


{/* {transInfo.map((item) => (
  <Text key={item.trans_valor}>{item.trans_valor}</Text>
))} */}