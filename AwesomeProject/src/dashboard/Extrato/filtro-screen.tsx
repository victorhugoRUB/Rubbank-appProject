import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { TouchableOpacity, useColorScheme } from 'react-native';

const logoWhite = require('../assets/logos/rubbankWhite.png');
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntigoNovoButton, BlockOfDays, Container, DivAntigoNovo, DivBlockDays, DivBottom, DivBttContent, DivBttTop, DivBttTopButton, DivBttTopFiltro, DivOrdem, DivSaldo, DivTextBttFiltro, DivTop, DivTopContent, PeriodoButton, TextButtonDivBtt, TextSaldo, TextLinks  } from './extrato-screen-styles';
import { TextTopDash } from '../perfil/dashboard-screen.styles';
import { transform } from 'lodash';
import Icon from '@react-native-vector-icons/material-icons';
import { Span } from '../alterar/alterar-screen.styles';
import { ConfirmButton, DivInputLogin, TextButton} from '../../login/login-screen.styles';


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
  const [saldoConta, setSaldoConta] = useState('');

  const resetFilters = () => {
    setFiltroAntigo(false);
    setFiltroNovos(false);
    setButton15(false);
    setButton30(false);
    setButton60(false);
    setButton90(false);
  };

  const handleFiltro = () => {
    
  }

  return (
    <ScreenBase>
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
              <TextButtonDivBtt fontSize={20}><Span>Período</Span></TextButtonDivBtt>
              <TextButtonDivBtt fontSize={18}>Período máximo de 90 dias a partir da data inicial</TextButtonDivBtt>
            </DivTextBttFiltro>
            <DivBlockDays>
              <BlockOfDays onPress={() => {button15 ? setButton15(false) : setButton15(true); setButton30(false); setButton60(false); setButton90(false)}} backgroundColor={button15 ? '#F1580C' : 'transparent'} ><TextButtonDivBtt color={button15 ? '#fff' : ''} fontSize={20}><Span>15</Span></TextButtonDivBtt><TextButtonDivBtt color={button15 ? '#fff' : ''} fontSize={20}><Span>dias</Span></TextButtonDivBtt></BlockOfDays>
              <BlockOfDays onPress={() => {button30 ? setButton30(false) : setButton15(false); setButton30(true); setButton60(false); setButton90(false)}} backgroundColor={button30 ? '#F1580C' : 'transparent'} ><TextButtonDivBtt color={button30 ? '#fff' : ''} fontSize={20}><Span>30</Span></TextButtonDivBtt><TextButtonDivBtt color={button30 ? '#fff' : ''} fontSize={20}><Span>dias</Span></TextButtonDivBtt></BlockOfDays>
              <BlockOfDays onPress={() => {button60 ? setButton60(false) : setButton15(false); setButton30(false); setButton60(true); setButton90(false)}} backgroundColor={button60 ? '#F1580C' : 'transparent'} ><TextButtonDivBtt color={button60 ? '#fff' : ''} fontSize={20}><Span>60</Span></TextButtonDivBtt><TextButtonDivBtt color={button60 ? '#fff' : ''} fontSize={20}><Span>dias</Span></TextButtonDivBtt></BlockOfDays>
              <BlockOfDays onPress={() => {button90 ? setButton90(false) : setButton15(false); setButton30(false); setButton60(false); setButton90(true)}} backgroundColor={button90 ? '#F1580C' : 'transparent'} ><TextButtonDivBtt color={button90 ? '#fff' : ''} fontSize={20}><Span>90</Span></TextButtonDivBtt><TextButtonDivBtt color={button90 ? '#fff' : ''} fontSize={20}><Span>dias</Span></TextButtonDivBtt></BlockOfDays>
            </DivBlockDays>
            <PeriodoButton>
              <TextButtonDivBtt color='#F1580C'><Span>Outros períodos</Span></TextButtonDivBtt>
              <IconFeather name="chevron-down" size={30} color="#000" />
            </PeriodoButton>
            <DivOrdem>
              <TextButtonDivBtt fontSize={20}><Span>Por ordem</Span></TextButtonDivBtt>
              <DivAntigoNovo>
                <AntigoNovoButton borderBottomWidth='1px' onPress={() => {filtroAntigo ? setFiltroAntigo(false) : setFiltroAntigo(true); setFiltroNovos(false)}} ><TextButtonDivBtt fontSize={18}>Mais antigos</TextButtonDivBtt><IconOcticons name={filtroAntigo ? 'check-circle-fill' : 'circle'} size={26} color={filtroAntigo ? '#000' : '#aaabab'} /></AntigoNovoButton>
                <AntigoNovoButton onPress={() => {filtroNovos ? setFiltroNovos(false) : setFiltroNovos(true); setFiltroAntigo(false)}} ><TextButtonDivBtt fontSize={18}>Mais novos</TextButtonDivBtt><IconOcticons name={filtroNovos ? 'check-circle-fill' : 'circle'} size={26} color={filtroNovos ? '#000' : '#aaabab'} /></AntigoNovoButton>
              </DivAntigoNovo>
            </DivOrdem>
            <DivInputLogin>
              <ConfirmButton cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
              <ConfirmButton onPress={resetFilters} cor='#ffffff0'><TextLinks>Limpar Filtro</TextLinks></ConfirmButton>
            </DivInputLogin>
          </DivBttContent>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}
