import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { Modal, TouchableOpacity, useColorScheme } from 'react-native';

const logoWhite = require('../assets/logos/rubbankWhite.png');
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntigoNovoButton, BlockOfDays, Container, DivAntigoNovo, DivBlockDays, DivBottom, DivBttContent, DivBttTop, DivBttTopButton, DivBttTopFiltro, DivOrdem, DivSaldo, DivTextBttFiltro, DivTop, DivTopContent, PeriodoButton, TextButtonDivBtt, TextSaldo, TextLinks, DivData, InputData, DivInputLogin  } from './extrato-screen-styles';
import { TextTopDash } from '../perfil/dashboard-screen.styles';
import { transform } from 'lodash';
import Icon from '@react-native-vector-icons/material-icons';
import { Span } from '../alterar/alterar-screen.styles';
import { ConfirmButton, InputLogin, InputLoginSenha, TextButton} from '../../login/login-screen.styles';
import { CalendarScreen } from '../../AvisoModel/calendarModel';
import { LoadingSpinner } from '../../Loading/loadingScreen';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltroField } from '../../redux/filtroSlice';
import { ReduxState } from '../../redux/store';


interface FiltroScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Filtro'>;
}


export default function FiltroScreen({navigation}: FiltroScreenProps) {

  const [filtroAntigo , setFiltroAntigo] = useState(false);
  const [filtroNovos , setFiltroNovos] = useState(false);
  const [button15, setButton15] = useState(false);
  const [button30, setButton30] = useState(false);
  const [button60, setButton60] = useState(false);
  const [button90, setButton90] = useState(false);
  const [valorDias, setValorDias] = useState(0);
  const [dropDown, setDropDown] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [isInicial, setIsInicial] = useState(false);
  const [loading, setLoading] = useState(false);
  const filtroData = useSelector((state: ReduxState)=> state.filtro);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    dataInicial: '',
    dataFinal: '',
    dias: '',
    ordem: ''
  })
  const handleFormEdit = (event: any, valor: any) => { 
    
    if(dropDown){
      dispatch((setFiltroField({field: 'dias', value: ''})))
      dispatch((setFiltroField({field: 'ordem', value: ''})))
      setFormData({
        ...formData,
        [valor]: event
      })
    }
    if(!dropDown){
      dispatch((setFiltroField({field: 'dataInicial', value: ''})))
      dispatch((setFiltroField({field: 'dataFinal', value: ''})))
      setFormData({
        ...formData,
        [valor]: event
      })
    }
    dispatch((setFiltroField({field: valor, value: event})))
    console.log(formData, 'dfgwgre')
    console.log(filtroData)
  }

  const handleDateSelected = (date: string) => {
    dispatch((setFiltroField({field: 'dias', value: ''})))
    dispatch((setFiltroField({field: 'ordem', value: ''})))
    if(isInicial){
      dispatch((setFiltroField({field: 'dataInicial', value: date})))
      setFormData({
        ...formData,
        dataInicial: dropDown ? date : '',
      })
    }else{
      dispatch((setFiltroField({field: 'dataFinal', value: date})))
      setFormData({
        ...formData,
        dataFinal: dropDown ? date : '',
      })
    }
    console.log(formData)
    console.log(filtroData)
  }

  const resetFilters = () => {
    setFiltroAntigo(false);
    setFiltroNovos(false);
    setButton15(false);
    setButton30(false);
    setButton60(false);
    setButton90(false);
    dispatch((setFiltroField({field: 'dias', value: ''})))
    dispatch((setFiltroField({field: 'ordem', value: ''})))
    dispatch((setFiltroField({field: 'dataFinal', value: ''})))
    dispatch((setFiltroField({field: 'dataInicial', value: ''})))
    
  };

  useEffect(() => {
    dropDown ? resetFilters() : null
  }, [dropDown])


  return (
    <ScreenBase>
      <LoadingSpinner visible={loading}/>
      <Modal visible={openCalendar} transparent onRequestClose={()=> setOpenCalendar(false)}>
          <CalendarScreen
          onClose={() => setOpenCalendar(false)}
          onSelectedDate={handleDateSelected}
          />
        </Modal>
      <Container>
        <DivTop flex={-1}>
        </DivTop>
        <DivBottom>
          <DivBttTopFiltro>
            <IconFeather name="x" size={26} color="#000" onPress={() => navigation.navigate('Extrato')} />
            <TextTopDash color='#000'><Span>Filtro</Span></TextTopDash>
          </DivBttTopFiltro>
          <DivBttContent justify='flex-start' align='flex-start'>
            <DivTextBttFiltro>
              <TextButtonDivBtt fontSize='20px'><Span>Período</Span></TextButtonDivBtt>
              <TextButtonDivBtt fontSize='18px'>Período máximo de 90 dias a partir da data inicial</TextButtonDivBtt>
            </DivTextBttFiltro>
            <DivBlockDays>
              <BlockOfDays disabled={dropDown} onPress={() => {handleFormEdit(15, 'dias') ;button15 ? (setButton15(false), setValorDias(15)) : (setButton15(true), setButton30(false), setButton60(false), setButton90(false))}} backgroundColor={button15 || String(filtroData.dias) == '15' ? '#F1580C' : 'transparent'} ><TextButtonDivBtt color={button15 || String(filtroData.dias) == '15' ? '#fff' : ''} fontSize='20px'><Span>15</Span></TextButtonDivBtt><TextButtonDivBtt color={button15 || String(filtroData.dias) == '15' ? '#fff' : ''} fontSize='20px'><Span>dias</Span></TextButtonDivBtt></BlockOfDays>
              <BlockOfDays disabled={dropDown} onPress={() => {handleFormEdit(30, 'dias') ;button30 ? (setButton30(false), setValorDias(30)) : (setButton15(false), setButton30(true), setButton60(false), setButton90(false))}} backgroundColor={button30 || String(filtroData.dias) == '30' ? '#F1580C' : 'transparent'} ><TextButtonDivBtt color={button30 || String(filtroData.dias) == '30' ? '#fff' : ''} fontSize='20px'><Span>30</Span></TextButtonDivBtt><TextButtonDivBtt color={button30 || String(filtroData.dias) == '30' ? '#fff' : ''} fontSize='20px'><Span>dias</Span></TextButtonDivBtt></BlockOfDays>
              <BlockOfDays disabled={dropDown} onPress={() => {handleFormEdit(60, 'dias') ;button60 ? (setButton60(false), setValorDias(60)) : (setButton15(false), setButton30(false), setButton60(true), setButton90(false))}} backgroundColor={button60 || String(filtroData.dias) == '60' ? '#F1580C' : 'transparent'} ><TextButtonDivBtt color={button60 || String(filtroData.dias) == '60' ? '#fff' : ''} fontSize='20px'><Span>60</Span></TextButtonDivBtt><TextButtonDivBtt color={button60 || String(filtroData.dias) == '60' ? '#fff' : ''} fontSize='20px'><Span>dias</Span></TextButtonDivBtt></BlockOfDays>
              <BlockOfDays disabled={dropDown} onPress={() => {handleFormEdit(90, 'dias') ;button90 ? (setButton90(false), setValorDias(90)) : (setButton15(false), setButton30(false), setButton60(false), setButton90(true))}} backgroundColor={button90 || String(filtroData.dias) == '90' ? '#F1580C' : 'transparent'} ><TextButtonDivBtt color={button90 || String(filtroData.dias) == '90' ? '#fff' : ''} fontSize='20px'><Span>90</Span></TextButtonDivBtt><TextButtonDivBtt color={button90 || String(filtroData.dias) == '90' ? '#fff' : ''} fontSize='20px'><Span>dias</Span></TextButtonDivBtt></BlockOfDays>
            </DivBlockDays>
            <PeriodoButton onPress={() => dropDown ? setDropDown(false) : setDropDown(true)}>
              <TextButtonDivBtt color='#F1580C'><Span>Outros períodos</Span></TextButtonDivBtt>
              <IconFeather name={dropDown ? 'chevron-up' : 'chevron-down'} size={30} color="#000" />
            </PeriodoButton>
            {dropDown && ( 
              <DivBlockDays>
                <InputLoginSenha 
                width='45%' 
                placeholder='Data inicial' 
                value={formData.dataInicial}
                onChangeText={(e) => {handleFormEdit(e, 'dataInicial')}}
                onFocus={() => {setOpenCalendar(true), setIsInicial(true)}}/>
                <InputLoginSenha
                width='45%' 
                placeholder='Data final' 
                value={formData.dataFinal}
                onChangeText={(e) => {handleFormEdit(e, 'dataFinal')}}
                onFocus={() => {setOpenCalendar(true), setIsInicial(false)}}/>
                
              </DivBlockDays>
            )}
            <DivOrdem>
              <TextButtonDivBtt fontSize='20px'><Span>Por ordem</Span></TextButtonDivBtt>
              <DivAntigoNovo>
                <AntigoNovoButton disabled={dropDown} borderBottomWidth='1px' onPress={() => {handleFormEdit('asc', 'ordem'); filtroAntigo ? setFiltroAntigo(false) : setFiltroAntigo(true); setFiltroNovos(false)}} ><TextButtonDivBtt fontSize='18px'>Mais antigos</TextButtonDivBtt><IconOcticons name={filtroAntigo || filtroData.ordem == 'asc' ? 'check-circle-fill' : 'circle'} size={26} color={filtroAntigo ? '#000' : '#aaabab'} /></AntigoNovoButton>
                <AntigoNovoButton disabled={dropDown} onPress={() => {handleFormEdit('desc', 'ordem'); filtroNovos ? setFiltroNovos(false) : setFiltroNovos(true); setFiltroAntigo(false)}} ><TextButtonDivBtt fontSize='18px'>Mais novos</TextButtonDivBtt><IconOcticons name={filtroNovos || filtroData.ordem == 'desc' ? 'check-circle-fill' : 'circle'} size={26} color={filtroNovos ? '#000' : '#aaabab'} /></AntigoNovoButton>
              </DivAntigoNovo>
            </DivOrdem>
            <DivInputLogin>
              <ConfirmButton onPress={() => navigation.navigate('Extrato')} cor='#6B7AE5'><TextButton cor="#ffffff">CONTINUAR</TextButton></ConfirmButton>
              <ConfirmButton onPress={resetFilters} cor='#ffffff0'><TextLinks>Limpar Filtro</TextLinks></ConfirmButton>
            </DivInputLogin>
          </DivBttContent>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}

