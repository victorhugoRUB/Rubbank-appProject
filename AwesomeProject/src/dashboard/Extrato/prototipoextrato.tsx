import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { Animated, FlatList, Text, TouchableOpacity, useColorScheme } from 'react-native';

const logoPurple = require('../../assets/logos/logoPurple.png');
const logoWhite = require('../assets/logos/rubbankWhite.png');
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlockTransDay, TextTopDashExtrato, Container, DivBottom, DivBttContent, DivBttTop, DivBttTopButton, DivSaldo, DivTop, DivTopContent, TextButtonDivBtt, TextSaldo, BlockTrans, DivTextTrans, DivTextValor, LogoTrans, PutOnTop } from './extrato-screen-styles';
import { Span } from '../alterar/alterar-screen.styles';
import { TextTopDash } from '../perfil/dashboard-screen.styles';


interface PrototipoScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Prototipo'>;
}

interface TransInfo {
  usuId_remetente: number,
  usuId_destinatario: number,
  trans_valor: number,
  trans_descricao: string,
  trans_status: string,
  trans_metodo: string
}

export default function PrototipoScreen({navigation}: PrototipoScreenProps) {

  const [showBalance, setShowBalance] = useState(false);
  const [messageTrans , setMessageTrans] = useState('');
  const [saldoConta, setSaldoConta] = useState('');
  const [transInfo, setTransInfo] = useState<TransInfo[]>([])
  const [flag , setFlag] = useState(false)



  const numeroFormatado = Number(saldoConta).toFixed(2).replace('.',',')

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
            <DivBttTopButton><TextButtonDivBtt>Tudo</TextButtonDivBtt></DivBttTopButton>
            <DivBttTopButton><TextButtonDivBtt>Entrada</TextButtonDivBtt></DivBttTopButton>
            <DivBttTopButton><TextButtonDivBtt>Saída</TextButtonDivBtt></DivBttTopButton>
          </DivBttTop>
          <DivBttContent>
            <BlockTransDay>
              <TextTopDashExtrato size='18px' color='#000' >Hoje</TextTopDashExtrato>
              <BlockTrans>
                <PutOnTop>
                  <LogoTrans source={logoPurple} />
                  <DivTextTrans>
                    <TextTopDashExtrato size='16px' color='#000'><Span>Transferência Entre Contas</Span></TextTopDashExtrato>
                    <TextTopDashExtrato size='12px' color='#aaabab'>Confirmada</TextTopDashExtrato>
                    <TextTopDashExtrato size='12px' color='#aaabab'>16:58</TextTopDashExtrato>
                  </DivTextTrans>
                </PutOnTop>
                <DivTextValor>
                  <TextTopDashExtrato size='16px' color='#029D29'><Span>R$ 8,24</Span></TextTopDashExtrato>
                </DivTextValor>
              </BlockTrans>
            </BlockTransDay>
          </DivBttContent>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}


{/* {transInfo.map((item) => (
  <Text key={item.trans_valor}>{item.trans_valor}</Text>
))} */}