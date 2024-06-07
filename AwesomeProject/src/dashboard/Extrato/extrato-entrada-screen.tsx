import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { Animated, FlatList, Modal, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

const logoPurple = require('../../assets/logos/logoPurple.png');
const logoWhite = require('../assets/logos/rubbankWhite.png');
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlockTrans, BlockTransDay, ButtonNext, Container, CountInMiddle, DivBottom, DivBttContent, DivBttTop, DivBttTopButton, DivButtonNext, DivSaldo, DivTextTrans, DivTextValor, DivTop, DivTopContent, LogoTrans, PutOnTop, TextButtonDivBtt, TextSaldo, TextTopDash, TextTopDashExtrato } from './extrato-screen-styles';
import { set, transform } from 'lodash';
import Icon from '@react-native-vector-icons/material-icons';
import { Span } from '../alterar/alterar-screen.styles';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { TransDetalheScreen } from '../../AvisoModel/transDetalheModal';
import { LoadingSpinner } from '../../Loading/loadingScreen';
import { Share } from 'react-native';
import { setFiltroField } from '../../redux/filtroSlice';


interface ExtratoScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Extrato'>;
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

export default function ExtratoScreen({navigation}: ExtratoScreenProps) {

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
  const [contar, setContar] = useState(1)

  const dispatch = useDispatch()


  const nextPage = async (valor: any) => {
    const newPage = Number(filtroData.page) + 1;
    if(valor == 'mais'){
      setLoading(true)
      dispatch((setFiltroField({field: 'page', value: newPage.toString()})))
      try{
        await fetchUserData()
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
    };
  }

  const onShare = async () => {
    const result = await Share.share({
      message: 'Comprovante de transferência\n\nRemetente: '+transDetalheInfo?.usuId_remetente+'\nDestinatário: '+transDetalheInfo?.usuId_destinatario+'\nValor transferido: R$'+transDetalheInfo?.trans_valor+'\nMétodo: '+transDetalheInfo?.trans_metodo+'\nData da transferência: '+transDetalheInfo?.createdAt+'\n\nComprovante gerado pelo aplicativo RubBank',
    })
  }


  const fetchUserData = async () => {
    setLoading(true)
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
      setLoading(false)
      console.log(err);
      console.log('Erro ao buscar saldo')
      navigation.navigate('Login')
    }
    try{
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/conta`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      })
      if(!res.ok){
        throw new Error('Erro ao buscar conta')
      }
      setContaBanc((await res.json()).contaBanc_id)
    }catch(err){
      setLoading(false)
      console.log(err);
      console.log('Erro ao buscar saldo')
      navigation.navigate('Login')
    }
    try{
      if(filtroData.page === '2'){
        console.log('entrou')
        setContar(0);
        console.log(contar)
      }
      setContar(contar + 1)
      console.log(contar)
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/transferencia/entrada/?${filtroData.ordem != '' ? '&ordem='+filtroData.ordem : ''}${filtroData.dataFinal != '' ? '&dataFinal='+filtroData.dataFinal : ''}${filtroData.dataInicial != '' ? '&dataInicial='+filtroData.dataInicial : ''}${filtroData.dias != '' ? '&dias='+filtroData.dias : ''}${contar != 1 ? '&page='+filtroData.page : ''}`,{
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
      setLoading(false)
      const data = await res.json()
      setTransInfo(prevTransInfo => [...prevTransInfo, ...data.trans])
      setNumPagFlat(data.numPags)
      console.log(data)
      setFlag(true) 
    }catch(err){
      setLoading(false)
      setFlag(false)
      console.log(err)
      console.log('Erro ao buscar saldo')
      setMessageTrans('Erro ao buscar transferencia')
      navigation.navigate('Login')
    }
  }

  const fetchTransDetalhe = async (trans_id: any) => {
    setLoading(true)
    console.log(trans_id)
    try{
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/transferencia/detalhado/${trans_id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      console.log(res)
      if(!res.ok){
        setLoading(false)
        throw new Error('Erro ao buscar transferencia detalhada')
      }
      setTransDetalheInfo((await res.json()))
      setTransDetalhe(!transDetalhe)
      console.log(transDetalheInfo)
      setFlag(true)
      setLoading(false)
    }catch(err){
      setFlag(false)
      console.log(err)
      console.log('Erro ao buscar transferencia detalhada')
      setMessageTrans('Erro ao buscar transferencia')
    }

  }
  useEffect(() => {
    setTransInfo([])
    console.log('carregando')
    dispatch((setFiltroField({field: 'page', value: '2'})))
    // setContar(0)
    fetchUserData()
    console.log('chamouuseeffect')
  }, [filtroData.dataFinal, filtroData.dataInicial, filtroData.dias, filtroData.ordem])

  const numeroFormatado = Number(saldoConta).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <ScreenBase>
    <LoadingSpinner visible={loading}/>
      <Modal
      transparent={true}
      visible={transDetalhe}
      onRequestClose={() => setTransDetalhe(!transDetalhe)}
      animationType='slide'
      >
        <TransDetalheScreen
        onShare={onShare}
        onClose={() => setTransDetalhe(false)}
        rem={transDetalheInfo?.usuId_remetente ?? 0}
        des={transDetalheInfo?.usuId_destinatario ?? 0}
        val={transDetalheInfo?.trans_valor ?? 0}
        desc={transDetalheInfo?.trans_descricao ?? ''}
        sta={transDetalheInfo?.trans_status ?? ''}
        met={transDetalheInfo?.trans_metodo ?? ''}
        dt={transDetalheInfo?.createdAt ? new Date(transDetalheInfo.createdAt).toLocaleDateString('pt-BR') : ''}
        />
      </Modal>
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
            <DivBttTopButton onPress={() => navigation.navigate('Extrato')}><TextButtonDivBtt>Tudo</TextButtonDivBtt></DivBttTopButton>
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
                    <BlockTrans onPress={() => fetchTransDetalhe(item.trans_id)} >
                      <PutOnTop>
                        <LogoTrans source={logoPurple} />
                        <DivTextTrans>
                          <TextTopDashExtrato size='16px' color='#000'><Span>Transferência Entre Contas</Span></TextTopDashExtrato>
                          <TextTopDashExtrato size='12px' color='#aaabab'>{item.trans_status}</TextTopDashExtrato>
                          <TextTopDashExtrato size='12px' color='#aaabab'>{new Date(item.createdAt).toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</TextTopDashExtrato>
                        </DivTextTrans>
                      </PutOnTop>
                      <DivTextValor>
                        <TextTopDashExtrato size='16px' color={ Number(contaBanc) == item.usuId_remetente ? '#ff0000' : '#029D29'}><Span>R$ {item.trans_valor.toFixed(2).replace('.',',')}</Span></TextTopDashExtrato>
                      </DivTextValor>
                    </BlockTrans>
                    {/* {index === transInfo.length - 1 ? 
                    <DivButtonNext>
                      <ButtonNext disabled={filtroData.page === '' || filtroData.page === '1' ? true : false} backColor={filtroData.page === '' || filtroData.page === '1' ? '#6b79e5a6' : '#6B7AE5'} onPress={() => {nextPage('menos')}}>
                        <TextButtonDivBtt fontSize='16px'>
                          <IconFeather name='chevron-left' size={24} color='#fff' />
                        </TextButtonDivBtt>
                      </ButtonNext>
                      <CountInMiddle>
                        <TextTopDash color='#000'>
                          {Number(filtroData.page)}/{numPagFlat}
                        </TextTopDash>
                      </CountInMiddle>
                      <ButtonNext disabled={filtroData.page == numPagFlat} backColor={filtroData.page == numPagFlat ? '#6b79e5a6' : ' #6B7AE5'} onPress={() => {nextPage('mais')}}>
                        <TextButtonDivBtt fontSize='16px'>
                          <IconFeather name='chevron-right' size={24} color='#fff' />
                        </TextButtonDivBtt>
                      </ButtonNext>
                    </DivButtonNext> : null} */}
                  </BlockTransDay>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
                stickyHeaderIndices={[]}
                onEndReached={() => {nextPage('mais')}}
                onEndReachedThreshold={0.5}
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