import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, BlocksOfInput, Container, DivButtonConfirm, DivContent, DivContentRev, DivInput, DivItemRev, ErrorMessage, InputCadastro, LinkToInfoModal, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLoginSenha, TextButton } from '../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';
import { ModalSenhaAppScreen } from '../AvisoModel/senhaAppModel';
import { Modal } from 'react-native';
import { ReduxState } from '../redux/store';
import { useSelector } from 'react-redux';

interface OnboardingFinalTabelScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingFinalTabel'>;
}

export default function OnboardingFinalTabelScreen({navigation}: OnboardingFinalTabelScreenProps) {
  const [loading, setLoading] = useState(false);
  const [avisoModal, setAvisoModal] = useState(false);
  const [buttonState, setButtonState ] = useState(false);
  const userData = useSelector((state: ReduxState)=> state.user);
  const endData = useSelector((state: ReduxState)=> state.end);
  const senhaAppData = useSelector((state: ReduxState)=> state.senhaApp);
  const senhaTransData = useSelector((state: ReduxState)=> state.senhaTrans);

  const [formData, setFormData] = useState({
    usuario_nome: userData.usuario_nome,
    usuario_email: userData.usuario_email,
    usuario_tel: userData.usuario_tel,
    usuario_cpf: userData.usuario_cpf,
    usuario_dtNascimento: userData.usuario_dtNascimento,
    usuario_senha: senhaAppData.usuario_senha,
    end_cep: endData.end_cep,
    end_rua: endData.end_rua,
    end_num: endData.end_num,
    end_complem: endData.end_complem,
    end_bairro: endData.end_bairro,
    end_cidade: endData.end_cidade,
    end_uf: endData.end_uf,
    contaBanc_senhatransacao: senhaTransData.contaBanc_senhatransacao,
  })

  useEffect(() => {
    if(formData.usuario_nome === '' || formData.usuario_email === '' || formData.usuario_tel === '' || formData.usuario_cpf === '' || formData.usuario_dtNascimento === '' || formData.usuario_senha === '' || formData.end_cep === '' || formData.end_rua === '' || formData.end_num === '' || formData.end_complem === '' || formData.end_bairro === '' || formData.end_cidade === '' || formData.end_uf === '' || formData.contaBanc_senhatransacao === ''){
      setButtonState(false)
      return
    }else{
      setButtonState(true)
    }
  }, [formData])

  const handleFormEdit = (event: any, valor: any) => {
    setFormData({
      ...formData,
      [valor]: event
    })
    console.log(formData)
  }

  return (
    <ScreenBase>
      <Modal
      visible={avisoModal}
      animationType='slide'
      onRequestClose={() => setAvisoModal(false)}
      >
        <ModalSenhaAppScreen onClose={() => setAvisoModal(false)}/>
      </Modal>
      <Container>
        <TopBar><TopBarBluePart width='95%'/></TopBar>
          <TextTitle>Revisando as informações de cadastro</TextTitle>
        <DivContentRev>
          <DivItemRev>
            <TextInputCad>Nome: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.usuario_nome}</Span></TextInputCad>
          </DivItemRev>
          <DivItemRev>
            <TextInputCad>Email: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.usuario_email}</Span></TextInputCad>
          </DivItemRev>
          <DivItemRev>
            <TextInputCad>Telefone: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.usuario_tel}</Span></TextInputCad>
          </DivItemRev>
        </DivContentRev>
        <DivContentRev>
          <DivItemRev>
            <TextInputCad>CPF: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.usuario_cpf}</Span></TextInputCad>
          </DivItemRev>
          <DivItemRev>
            <TextInputCad>Data de Nascimento: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.usuario_dtNascimento}</Span></TextInputCad>
          </DivItemRev>
          <DivItemRev>
            <TextInputCad>Senha: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.usuario_senha}</Span></TextInputCad>
          </DivItemRev>
        </DivContentRev>
        <DivContentRev>
          <DivItemRev>
            <TextInputCad>CEP: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.end_cep}</Span></TextInputCad>
          </DivItemRev>
          <DivItemRev>
            <TextInputCad>Rua: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.end_rua}</Span></TextInputCad>
          </DivItemRev>
        </DivContentRev>
        <DivContentRev>
          <DivItemRev>
            <TextInputCad>Número: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.end_num}</Span></TextInputCad>
          </DivItemRev>
          <DivItemRev>
            <TextInputCad>Complemento: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.end_complem}</Span></TextInputCad>
          </DivItemRev>
          <DivItemRev>
            <TextInputCad>Bairro: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.end_bairro}</Span></TextInputCad>
          </DivItemRev>
        </DivContentRev>
        <DivContentRev>
          <DivItemRev>
            <TextInputCad>Cidade: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.end_cidade}</Span></TextInputCad>
          </DivItemRev>
          <DivItemRev>
            <TextInputCad>UF: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.end_uf}</Span></TextInputCad>
          </DivItemRev>
          <DivItemRev>
            <TextInputCad>Senha de Transação: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
            <TextInputCad><Span>{formData.contaBanc_senhatransacao}</Span></TextInputCad>
          </DivItemRev>
        </DivContentRev>
        <DivButtonConfirm>
          <ConfirmButton disabled={!buttonState} style={!buttonState ? {backgroundColor: '#6B7AE578'} : {}} onPress={() => navigation.navigate('OnboardingSenhaApp')} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}
