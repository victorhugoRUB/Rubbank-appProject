import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { Animated, TouchableOpacity, useColorScheme } from 'react-native';

const logoWhite = require('../assets/logos/rubbankWhite.png');
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, DivBottom, DivBttContent, DivBttTop, DivBttTopButton, DivSaldo, DivTop, DivTopContent, TextButtonDivBtt, TextSaldo } from './extrato-screen-styles';
import { TextTopDash } from '../perfil/dashboard-screen.styles';
import { transform } from 'lodash';
import Icon from '@react-native-vector-icons/material-icons';


interface ExtratoScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Extrato'>;
}

export default function ExtratoScreen({navigation}: ExtratoScreenProps) {

  const [showBalance, setShowBalance] = useState(false);
  const [saldoConta, setSaldoConta] = useState('');
  useEffect(() => {fetchUserData()}, [])

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
  }

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
            <IconMaterial name="piggy-bank-outline" size={50} color="#aaabab" style={{transform: [{scaleX: -1}]}} />
            <TextButtonDivBtt fontSize='18px' color='#383838'>Você ainda não possui lançamentos.</TextButtonDivBtt>
          </DivBttContent>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}
