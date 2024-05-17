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
import { BlockTrans, BlockTransDay, ButtonNext, Container, CountInMiddle, DivBottom, DivBttContent, DivBttTop, DivBttTopButton, DivButtonNext, DivSaldo, DivTextTrans, DivTextValor, DivTop, DivTopContent, LogoTrans, PutOnTop, TextButtonDivBtt, TextSaldo, TextTopDash, TextTopDashExtrato } from './extrato-screen-styles';
import { set, transform } from 'lodash';
import Icon from '@react-native-vector-icons/material-icons';
import { Span } from '../alterar/alterar-screen.styles';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { TransDetalheScreen } from '../../AvisoModel/transDetalheModal';
import { LoadingSpinner } from '../../Loading/loadingScreen';
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
  const [isEffect, setIsEffect] = useState(true)


  const dispatch = useDispatch();

  const resetDataPage = () => {
    dispatch((setFiltroField({field: 'page', value: '1'})))
  }

  const nextPage = async (valor: any) => {
    const newPage = Number(filtroData.page) + 1;
    const lastPage = Number(filtroData.page) - 1;
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
    if(valor == 'menos'){
      setLoading(true)
      dispatch((setFiltroField({field: 'page', value: lastPage.toString()})))
      try{
        await fetchUserData()
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
    }
  }

  // const nextPage = async (valor: any) => {
  //   console.log(valor)
  //   if(valor === 'mais'){
  //     const somar = Number(filtroData.page) + 1;
  //     dispatch((setFiltroField({field: 'page', value: somar.toString()})))
  //     await fetchUserData()
  //   }else{
  //     const subtrair = Number(filtroData.page) - 1;
  //     dispatch((setFiltroField({field: 'page', value: subtrair.toString()})))
  //     await fetchUserData()
  //   }
  // }
  //? COMPARTILHAR COMPROVANTE

  const generatePDF = async () => {
    const htmlContent = `
    <html>
      <body>
        <h1>Comprovante de transferência</h1>
        <p>Remetente: ${transDetalheInfo?.usuId_remetente}</p>
        <p>Destinatário: ${transDetalheInfo?.usuId_destinatario}</p>
        <p>Valor transferido: R$ ${transDetalheInfo?.trans_valor}</p>
        <p>Método: ${transDetalheInfo?.trans_metodo}</p>
        <p>Data da transferência: ${transDetalheInfo?.createdAt}</p>
      </body>
    </html>
    `;
    return htmlContent;
  }
  
  const MyPDFComponent = () => {
    const [pdfUri, setPdfUri] = React.useState('');

    const generateAndSharePDF = async () => {
      try{
        const htmlContent = await generatePDF();
        const blob = new Blob([htmlContent], {type: 'text/html', lastModified: Date.now()});
        const url = URL.createObjectURL(blob);
        setPdfUri
      }catch(err){
        console.log(err)
      }
    }
  }


  const onShare = async () => {
    const result = await Share.share({
      message: 'Comprovante de transferência\n\nRemetente: '+transDetalheInfo?.usuId_remetente+'\nDestinatário: '+transDetalheInfo?.usuId_destinatario+'\nValor transferido: R$'+transDetalheInfo?.trans_valor+'\nMétodo: '+transDetalheInfo?.trans_metodo+'\nData da transferência: '+transDetalheInfo?.createdAt+'\n\nComprovante gerado pelo aplicativo RubBank',
    })
  }

  //? FIM COMPARTILHAR COMPROVANTE


  const fetchUserData = async () => {
    setLoading(true)
    console.log('chamou')
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

      const contaRes = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/conta`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      })
      if(!contaRes.ok){
        throw new Error('Erro ao buscar conta')
      }
      setContaBanc((await contaRes.json()).contaBanc_id)
      console.log(contaBanc) 

      const transRes = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/transferencia/?${filtroData.ordem != '' ? '&ordem='+filtroData.ordem : ''}${filtroData.dataFinal != '' ? '&dataFinal='+filtroData.dataFinal : ''}${filtroData.dataInicial != '' ? '&dataInicial='+filtroData.dataInicial : ''}${filtroData.dias != '' ? '&dias='+filtroData.dias : ''}${filtroData.page != '' ? '&page='+filtroData.page : ''}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      console.log(transRes) 
      if(!transRes.ok){
        setMessageTrans('Erro ao buscar transferencia')
        return
      }
      const data = await transRes.json()
      setTransInfo(data.trans)
      setNumPagFlat(data.numPags)
      setFlag(true)
      setLoading(false)
    }catch(err){
      setFlag(false)
      setLoading(false)
      console.log(err)
      console.log('Erro ao buscar saldo')
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

  const testFunction = async () => {
    return transInfo
  }
  useEffect(() => {fetchUserData()}, [])
  useEffect(() => {resetDataPage()}, [])
  useEffect(() => 
    {if(isEffect){
      setIsEffect(false)
    }else{
      fetchUserData()
    }}, [transInfo])


  const numeroFormatado = Number(saldoConta).toFixed(2).replace('.',',')

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
            <DivBttTopButton onPress={() => navigation.navigate('Extrato')} width='3px'><TextButtonDivBtt>Tudo</TextButtonDivBtt></DivBttTopButton>
            <DivBttTopButton onPress={() => navigation.navigate('ExtratoEntrada')}><TextButtonDivBtt>Entrada</TextButtonDivBtt></DivBttTopButton>
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
                    {index === transInfo.length - 1 ? 
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
                      <ButtonNext disabled={filtroData.page == numPagFlat} backColor={filtroData.page == numPagFlat ? '#6b79e5a6' : ' #6B7AE5'} onPress={() => {nextPage('mais'), testFunction}}>
                        <TextButtonDivBtt fontSize='16px'>
                          <IconFeather name='chevron-right' size={24} color='#fff' />
                        </TextButtonDivBtt>
                      </ButtonNext>
                    </DivButtonNext> : null}
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