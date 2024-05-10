import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../../App';
import { TouchableOpacity } from 'react-native';
import { BancContItem, BancContItemSpcfc, BancContent, ConfirmButton, Container, ContentBottom, DivBottom, DivBottomContent, DivButton, DivTop, DivTopContent, TextCopy, TextTopDash, TitleTextData, TopContentTextCPF, TopContentTextName, UserPicture } from './dashboard-screen.styles';
const logoWhite = require('../../assets/logos/rubbankWhite.png');
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { TextButton } from '../../login/login-screen.styles';
import { Span } from '../../onboarding/onboarding-screen.styles';
import { LoadingSpinner } from '../../Loading/loadingScreen';


interface DashboardDadosBancScreenProps {
  navigation: NavigationProp<RootStackParamList, 'DashboardDadosBanc'>;
}

export default function DashboardDadosBancScreen({navigation}: DashboardDadosBancScreenProps) {
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [contaInfo, setContaInfo] = useState({
    usuario_nome: '',
    usuario_email: '',
    usuario_senha: '',
    usuario_tel: '',
    usuario_cpf: '',
    usuario_dtNascimento: '',
    conta:[{
      contaBanc_agencia: '', 
      contaBanc_conta: '',
      contaBanc_senhatransacao: '',
      contaBanc_tipo: '',
      contaBanc_saldo: '',
      contaBanc_status: '',
    }]
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
        throw new Error('Erro ao buscar saldo')
      }
      setLoading(false)
      setContaInfo((await res.json()))
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
          <TouchableOpacity onPress={() => navigation.navigate('DashboardPerfil')}><IconFeather name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
          <TextTopDash>Dados Bancários</TextTopDash>
        </DivTop>
        <DivBottom>
          <TopContentTextName align='flex-start'>Use os dados abaixo para fazer um <Span>TED para a Conta RubBank.</Span></TopContentTextName>
          <BancContent>
            <BancContItem>
              <BancContItemSpcfc>
                <TitleTextData>Agência</TitleTextData>
                <TopContentTextName>{contaInfo.conta[0].contaBanc_agencia}</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem>
              <BancContItemSpcfc>
                <TitleTextData>Conta</TitleTextData>
                <TopContentTextName>{contaInfo.conta[0].contaBanc_conta}</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem>
              <BancContItemSpcfc>
                <TitleTextData>CPF</TitleTextData>
                <TopContentTextName>{contaInfo.usuario_cpf}</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem>
              <BancContItemSpcfc>
                <TitleTextData>Favorecido</TitleTextData>
                <TopContentTextName>{contaInfo.usuario_nome}</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem>
              <BancContItemSpcfc>
                <TitleTextData>Instituição</TitleTextData>
                <TopContentTextName>Rubbank</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem>
              <BancContItemSpcfc>
                <TitleTextData>Tipo</TitleTextData>
                <TopContentTextName>{contaInfo.conta[0].contaBanc_tipo}</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem>
              <BancContItemSpcfc>
                <TitleTextData>Método</TitleTextData>
                <TopContentTextName>TED ou DOC</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
          </BancContent>
          <DivButton>
            <ConfirmButton><TextButton cor='#000'>COMPARTILHAR DADOS</TextButton></ConfirmButton>
          </DivButton>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}
