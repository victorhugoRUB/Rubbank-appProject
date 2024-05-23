import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../../App';
import {ScreenBase} from '../../components/screen-base/dashboard-screen-base';
import { BlockInput, BlocksOfInput, Container, ContentBottom, DivBttContent, DivButtonConfirm, DivContent, DivInput, ErrorMessage, InputCadastro, LinkToInfoModal, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './alterar-screen.styles';
import { ConfirmButton, DivInputLogin, InputLoginSenha, TextButton } from '../../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';
import { ModalSenhaAppScreen } from '../../AvisoModel/senhaAppModel';
import { FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/store';
import { setsenhaAppField } from '../../redux/senhaAppSlice';
import { DivBottom, TextTopDash, DivTop, DivBottomContent } from '../perfil/dashboard-screen.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WarningScreen } from '../../AvisoModel/erroModel';
import { ModalSucessScreen } from '../../AvisoModel/sucessModal';
import { LoadingSpinner } from '../../Loading/loadingScreen';
import { TextButtonDivBtt } from '../Extrato/extrato-screen-styles';
import { setEndField } from '../../redux/endSlice';


interface ListarEnderecoScreenProps {
  navigation: NavigationProp<RootStackParamList, 'ListarEndereco'>;
}

interface EnderecoData {
  end_id: number,
  end_cep: string,
  end_rua: string,
  end_num: string,
  end_complem: string,
  end_bairro: string,
  end_cidade: string,
  end_uf: string
}

export default function ListarEnderecoScreen({navigation}: ListarEnderecoScreenProps) {
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [messageEnd, setMessageEnd] = useState('');
  const [formData, setFormData] = useState<EnderecoData[]>([])
  const endData = useSelector((state: ReduxState) => state.end);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchEndData()
  }, []);
  const fetchEndData = async () => {
    console.log('entrou')
    setLoading(true)
    try{
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/endereco`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': `Bearer ${token}`
        }
      })
      const r = (await res.json())
      console.log(res)
      console.log(r)
      if(!res.ok){
        setMessageEnd('Erro ao acessar endereço')
        return
      }
      setMessageEnd('')
      setFormData(r)
      setFlag(true)
    }catch(err){
      setFlag(false)
      console.log(err)
    }finally{
      setLoading(false)
    }
  }

  const fetchAlterEnd = async (item: any) => {
    console.log(item)
    dispatch((setEndField({field: 'end_id', value: item.end_id})))
    dispatch((setEndField({field: 'end_cep', value: item.end_cep})))
    dispatch((setEndField({field: 'end_rua', value: item.end_rua})))
    dispatch((setEndField({field: 'end_num', value: item.end_num})))
    dispatch((setEndField({field: 'end_complem', value: item.end_complem})))
    dispatch((setEndField({field: 'end_bairro', value: item.end_bairro})))
    dispatch((setEndField({field: 'end_cidade', value: item.end_cidade})))
    dispatch((setEndField({field: 'end_uf', value: item.end_uf})))
    navigation.navigate('AlterarEndereco')
  }
  
  return (
    <ScreenBase>
      <LoadingSpinner visible={loading}/>
      <Container>
        <DivTop>
          <TouchableOpacity onPress={() => navigation.navigate('DashboardPerfil')}><IconFeather name="arrow-left" size={24} color="#fff" /></TouchableOpacity>
          <TextTopDash>Alterar endereço</TextTopDash>
        </DivTop>
        <DivBottom>
          <TextTopDash weight='600' color='#000'>Selecione o endereço que deseja alterar</TextTopDash>
          <DivBttContent>
            {flag ? 
            <>
              <FlatList
                data={formData}
                renderItem={({item, index}) => {
                  return(
                    <ContentBottom onPress={() => {fetchAlterEnd(item)}}>
                      <TextButtonDivBtt fontSize='18px' color='#383838'>{item.end_rua}, {item.end_num}, {item.end_complem}, {item.end_bairro}, {item.end_cidade}, {item.end_uf}</TextButtonDivBtt>
                    </ContentBottom>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
                />
            </>  
          : <><TextButtonDivBtt fontSize='18px' color='#383838'>{messageEnd === '' ? "Algo deu errado... Por quê você não tem endereço cadastrado?" : messageEnd}</TextButtonDivBtt></>}
          </DivBttContent>
        </DivBottom>
      </Container>
    </ScreenBase>
  );
}
