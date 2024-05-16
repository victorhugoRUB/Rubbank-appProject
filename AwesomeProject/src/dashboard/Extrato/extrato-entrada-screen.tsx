import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { Animated, FlatList, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

const logoPurple = require('../../assets/logos/logoPurple.png');
const logoWhite = require('../assets/logos/rubbankWhite.png');
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlockTrans, BlockTransDay, Container, DivBottom, DivBttContent, DivBttTop, DivBttTopButton, DivSaldo, DivTextTrans, DivTextValor, DivTop, DivTopContent, LogoTrans, PutOnTop, TextButtonDivBtt, TextSaldo, TextTopDashExtrato } from './extrato-screen-styles';
import { transform } from 'lodash';
import Icon from '@react-native-vector-icons/material-icons';
import { Span } from '../alterar/alterar-screen.styles';
import { TextTopDash } from '../perfil/dashboard-screen.styles';


interface ExtratoEntradaScreenProps {
  navigation: NavigationProp<RootStackParamList, 'ExtratoEntrada'>;
}

interface TransInfo {
  usuId_remetente: number,
  usuId_destinatario: number,
  trans_valor: number,
  trans_descricao: string,
  trans_status: string,
  trans_metodo: string
  createdAt: string
}

export default function ExtratoEntradaScreen({navigation}: ExtratoEntradaScreenProps) {

  const [showBalance, setShowBalance] = useState(false);
  const [messageTrans , setMessageTrans] = useState('');
  const [saldoConta, setSaldoConta] = useState('');
  const [botaoAtivo, setBotaoAtivo] = useState(false)
  const [transInfo, setTransInfo] = useState<TransInfo[]>([])
  const [flag , setFlag] = useState(false)

  const fetchUserData = async () => {
    console.log('chamou')
    try{
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/conta/saldo`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if(!res.ok){
        throw new Error('Erro ao buscar saldo')
      }
      setSaldoConta((await res.json()).contaBanc_saldo)
    }catch(err){
      console.log(err);
      console.log('Erro ao buscar saldo')
      navigation.navigate('Login')
    }
    try{
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/transferencia/entrada/?ordem=asc`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(res)
      if(!res.ok){
        throw new Error('Erro ao buscar transferencia')
      }
      
      setTransInfo((await res.json()))
      setFlag(true)
      console.log(transInfo)
    }catch(err){
      setFlag(false)
      console.log(err);
      console.log('Erro ao buscar saldo')
      setMessageTrans('Erro ao buscar transferencia')
      navigation.navigate('Login')
    }
  }

  useEffect(() => {fetchUserData()}, [])

  const numeroFormatado = Number(transInfo).toFixed(2).replace('.',',')

  return (
    <ScreenBase>
      <Container>
        <DivTop>
          <DivTopContent>
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}><IconFeather name="arrow-left" size={26} color="#fff" /></TouchableOpacity>
            <TextTopDash>Extrato</TextTopDash>
            <TouchableOpacity onPress={() => navigation.navigate('Filtro')}><IconFeather name="filter" size={28} color="#fff" /></TouchableOpacity>
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
          <DivBttTop>
          <DivBttTopButton onPress={() => navigation.navigate('Extrato')} ><TextButtonDivBtt>Tudo</TextButtonDivBtt></DivBttTopButton>
            <DivBttTopButton onPress={() => navigation.navigate('ExtratoEntrada')} width='3px'><TextButtonDivBtt>Entrada</TextButtonDivBtt></DivBttTopButton>
            <DivBttTopButton onPress={() => navigation.navigate('ExtratoSaida')}><TextButtonDivBtt>Saída</TextButtonDivBtt></DivBttTopButton>
          </DivBttTop>
          <DivBttContent>
            {flag ?
              <>
                <FlatList
                data={transInfo}
                renderItem={({item, index}) => {
                  const renderHeader = () => {
                    if (index === 0 || new Date(item.createdAt).getDate() !== new Date(transInfo[index - 1].createdAt).getDate()) {
                      return (
                        <TextTopDashExtrato size='18px' color='#000'>
                          {new Date(item.createdAt).getDate()} de {new Date(item.createdAt).toLocaleString('pt-BR', { month: 'long' }).charAt(0).toUpperCase() + new Date(item.createdAt).toLocaleString('pt-BR', { month: 'long' }).slice(1)}
                        </TextTopDashExtrato>
                      );
                    }
                    return null;
                  };
                  return(
                  <BlockTransDay>
                    {renderHeader()}
                    <BlockTrans>
                      <PutOnTop>
                        <LogoTrans source={logoPurple} />
                        <DivTextTrans>
                          <TextTopDashExtrato size='16px' color='#000'><Span>Transferência Entre Contas</Span></TextTopDashExtrato>
                          <TextTopDashExtrato size='12px' color='#aaabab'>{item.trans_status}</TextTopDashExtrato>
                          <TextTopDashExtrato size='12px' color='#aaabab'>{new Date(item.createdAt).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</TextTopDashExtrato>
                        </DivTextTrans>
                      </PutOnTop>
                      <DivTextValor>
                        <TextTopDashExtrato size='16px' color='#029D29'><Span>R$ {item.trans_valor.toFixed(2).replace('.',',')}</Span></TextTopDashExtrato>
                      </DivTextValor>
                    </BlockTrans>
                  </BlockTransDay>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
                stickyHeaderIndices={[]}
                />
              </>
            : <><IconMaterial name="piggy-bank-outline" size={50} color="#aaabab" style={{ transform: [{ scaleX: -1 }] }} /><TextButtonDivBtt fontSize='18px' color='#383838'>{messageTrans === '' ? "Você ainda não possui lançamentos." : messageTrans}</TextButtonDivBtt></>}
          </DivBttContent>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}


{/* {transInfo.map((item) => (
  <Text key={item.trans_valor}>{item.trans_valor}</Text>
))} */}