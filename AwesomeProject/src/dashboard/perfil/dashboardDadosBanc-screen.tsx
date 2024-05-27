import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RootStackParamList } from '../../../App';
import { TouchableOpacity } from 'react-native';
import { BancContItem, BancContItemSpcfc, BancContent, ConfirmButton, Container, ContentBottom, DivBottom, DivBottomContent, DivButton, DivTop, DivTopContent, MainTextTopDash, NewDivBottom, TextCopy, TextTopDash, TitleTextData, TopContentTextCPF, TopContentTextName, UserPicture } from './dashboard-screen.styles';
const logoWhite = require('../../assets/logos/rubbankWhite.png');
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { TextButton } from '../../login/login-screen.styles';
import { Span } from '../../onboarding/onboarding-screen.styles';
import { LoadingSpinner } from '../../Loading/loadingScreen';
import Clipboard from '@react-native-clipboard/clipboard'
import { DivButtonConfirm } from '../alterar/alterar-screen.styles';

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
          <MainTextTopDash>Dados Bancários</MainTextTopDash>
          <TouchableOpacity><IconFeather name="help-circle" size={24} color="#fff" /></TouchableOpacity>
        </DivTop>
        <NewDivBottom>
          <BancContent>
          <TopContentTextName align='flex-start'>Use os dados abaixo para fazer um <Span>TED para a Conta RubBank.</Span></TopContentTextName>
            <BancContItem onPress={() => Clipboard.setString('333')}>
              <BancContItemSpcfc>
                <TitleTextData>Agência</TitleTextData>
                <TopContentTextName>{contaInfo.conta[0].contaBanc_agencia}</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem onPress={() => Clipboard.setString(contaInfo.conta[0].contaBanc_conta)}>
              <BancContItemSpcfc>
                <TitleTextData>Conta</TitleTextData>
                <TopContentTextName>{contaInfo.conta[0].contaBanc_conta}</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem onPress={() => Clipboard.setString(contaInfo.usuario_cpf)}>
              <BancContItemSpcfc>
                <TitleTextData>CPF</TitleTextData>
                <TopContentTextName>{contaInfo.usuario_cpf}</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem onPress={() => Clipboard.setString(contaInfo.usuario_nome)}>
              <BancContItemSpcfc>
                <TitleTextData>Favorecido</TitleTextData>
                <TopContentTextName>{contaInfo.usuario_nome}</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem onPress={() => Clipboard.setString('Rubbank')}>
              <BancContItemSpcfc>
                <TitleTextData>Instituição</TitleTextData>
                <TopContentTextName>Rubbank</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem onPress={() => Clipboard.setString(contaInfo.conta[0].contaBanc_tipo)}>
              <BancContItemSpcfc>
                <TitleTextData>Tipo</TitleTextData>
                <TopContentTextName>{contaInfo.conta[0].contaBanc_tipo}</TopContentTextName>
              </BancContItemSpcfc>
              <BancContItemSpcfc>
                <IconAntDesign name="copy1" size={24} color="#000" />
                <TextCopy>Copiar</TextCopy>
              </BancContItemSpcfc>
            </BancContItem>
            <BancContItem onPress={() => Clipboard.setString('TED ou DOC')}>
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
          <DivButtonConfirm>
            <ConfirmButton onPress={() => Clipboard.setString('Agência: 333 \nConta: '+ contaInfo.conta[0].contaBanc_conta + '\nCPF:' + contaInfo.usuario_cpf + '\nFavorecido: ' + contaInfo.usuario_nome + '\nInstituição: Rubbank\nTipo: ' + contaInfo.conta[0].contaBanc_tipo + '\nMétodo: TED ou DOC')}><TextButton cor='#000'>COMPARTILHAR DADOS</TextButton></ConfirmButton>
          </DivButtonConfirm>
        </NewDivBottom>
      </Container>
    </ScreenBase>
  );
}
