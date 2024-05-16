import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../../App';
import { TouchableOpacity } from 'react-native';
import { ConfirmButton, Container, ContentBottom, DivBottom, DivBottomContent, DivTop, DivTopContent, TextTopDash, TopContentTextCPF, TopContentTextName, UserPicture } from './dashboard-screen.styles';
const logoWhite = require('../../assets/logos/rubbankWhite.png');
import IconFeather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { TextButton } from '../../login/login-screen.styles';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { LoadingSpinner } from '../../Loading/loadingScreen';


interface DashboardPerfilScreenProps {
  navigation: NavigationProp<RootStackParamList, 'DashboardPerfil'>;
}

export default function DashboardPerfilScreen({navigation}: DashboardPerfilScreenProps) {
  const userData = useSelector((state: ReduxState)=> state.user);
  const [loading, setLoading] = useState(false);
  const [infoUser, setInfoUser] = useState({
    usuario_nome: '',
    usuario_cpf: '',
    token: '',
  })
  useEffect(() => {fetchUserData()}, [])

  const fetchUserData = async () => {
    console.log('chamou')
    setLoading(true)
    try{
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/usuario`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if(!res.ok){
        throw new Error('Erro ao buscar usuario')
      }
      setLoading(false)
      setInfoUser((await res.json()))
    }catch(err){
      setLoading(false)
      console.log(err);
      console.log('Erro ao buscar saldo')
      navigation.navigate('Login')
    }
  }

  return (
    <ScreenBase>
      <LoadingSpinner visible={loading}/>
      <Container >
        <DivTop>
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}><IconFeather name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
          <TextTopDash>Perfil</TextTopDash>
        </DivTop>
        <DivBottom>
          <DivTopContent>
            <UserPicture></UserPicture>
            <TopContentTextName>{infoUser.usuario_nome}</TopContentTextName>
            <TopContentTextCPF>CPF: {infoUser.usuario_cpf}</TopContentTextCPF>
          </DivTopContent>
          <ConfirmButton onPress={() => navigation.navigate('DashboardDadosBanc')} ><TextButton cor="#000">VER DADOS BANCÁRIOS</TextButton></ConfirmButton>
          <DivBottomContent>
            <ContentBottom onPress={() => navigation.navigate('AlterarSenhaApp')}>
              <TopContentTextName>Alterar senha do App</TopContentTextName>
              <IconFeather name="chevron-right" size={24} color="#000" />
            </ContentBottom>
            <ContentBottom>
              <TopContentTextName>Alterar senha transacional</TopContentTextName>
              <IconFeather name="chevron-right" size={24} color="#000" />
            </ContentBottom>
            <ContentBottom>
              <TopContentTextName>Alterar endereço</TopContentTextName>
              <IconFeather name="chevron-right" size={24} color="#000" />
            </ContentBottom>
          </DivBottomContent>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}