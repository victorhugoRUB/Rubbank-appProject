import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/dashboard-screen-base';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { AltDivBottom, BlockOptions, BlockOptionsBottom, Container, DivBalance, DivBottom, DivOptions, DivTop, GenericDiv, Logo, SeuSaldo, TextBlockBottom, TextSaldo } from './dashboard-screen.styles';
const logoWhite = require('../assets/logos/rubbankWhite.png');
const logo = require('../assets/logos/rubbank.png');
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { ReduxState } from '../redux/store';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { displayNotification } from '../notificacao/notificacao';
import analytics, { firebase } from '@react-native-firebase/analytics';
import { logEvent } from '../firebase/firebase';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads' 
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface DashboardScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Dashboard'>;
}

export default function DashboardScreen({navigation}: DashboardScreenProps) {

  const [showBalance, setShowBalance] = useState(false);
  const [saldoConta, setSaldoConta] = useState('');
  const filtroData = useSelector((state: ReduxState)=> state.filtro);

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

  const numeroFormatado = Number(saldoConta).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ScreenBase>
      <Container >
        <DivTop>
          <DivOptions>  
            <Logo source={logoWhite} />
            <BlockOptions>
              <TouchableOpacity><IconFeather name="log-out" size={24} color='#fff' onPress={() => navigation.navigate('Login')} /></TouchableOpacity>
              <TouchableOpacity><IconFeather name="help-circle" size={24} color='#fff'/></TouchableOpacity>
              <TouchableOpacity><IconFeather name="menu" size={24} color='#fff' /></TouchableOpacity>
            </BlockOptions>
          </DivOptions>
          <DivBalance>
            <SeuSaldo>
              <TextSaldo fontSize='16px'>Seu saldo</TextSaldo>
              <TextSaldo fontSize='24px'>{showBalance ? 'R$'+numeroFormatado : '_____________________'}</TextSaldo>
            </SeuSaldo>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}><IconFeather name={showBalance ? 'eye' : 'eye-off'} size={24} color={'#fff'}></IconFeather></TouchableOpacity>
          </DivBalance>
        </DivTop>
        <AltDivBottom style={{backgroundColor: isDarkMode ? Colors.dark : '#fff'}}>
          <GenericDiv style={{backgroundColor: isDarkMode ? Colors.dark : '#fff'}}>
            <BlockOptionsBottom onPress={() => navigation.navigate('TransferenciaCPF')} style={{backgroundColor: isDarkMode ? Colors.darker : '#fff'}}>
              <IconEntypo name="swap" size={24} color={isDarkMode ? '#fff' : '#000'}/>
              <TextBlockBottom style={{color: isDarkMode ? '#fff' : '#000'}}>Transferir</TextBlockBottom>
            </BlockOptionsBottom>
            <BlockOptionsBottom onPress={() => navigation.navigate('Extrato')}>
              <IconEntypo name="text-document" size={24} color="#000" />
              <TextBlockBottom>Extrato</TextBlockBottom>
            </BlockOptionsBottom>
            <BlockOptionsBottom onPress={() => navigation.navigate('DashboardPerfil')}>
              <IconOcticons name="person" size={24} color="#000" />
              <TextBlockBottom>Perfil</TextBlockBottom>
            </BlockOptionsBottom>
            <BlockOptionsBottom disabled onPress={() => displayNotification(1)}>
              <IconMaterialIcons name="pix" size={24} color="#000" />
              <TextBlockBottom>PIX (em breve)</TextBlockBottom>
            </BlockOptionsBottom>
          </GenericDiv>
          <BannerAd
          unitId="ca-app-pub-3940256099942544/2934735716"
          size={BannerAdSize.BANNER}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
          onAdFailedToLoad={(error) => {
              console.error('Advert failed to load: ', error);
          }}
          />
        </AltDivBottom>
      </Container>
    </ScreenBase>
  );
}
