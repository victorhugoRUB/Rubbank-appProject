import type {NavigationProp} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import type {RootStackParamList} from '../../App';
import {ScreenBase} from '../components/screen-base/screen-base';
import { BlockInput, BlocksOfInput, Container, DivAlignContent, DivButtonConfirm, DivContent, DivContentRev, DivInput, DivItemRev, ErrorMessage, InputCadastro, LinkToInfoModal, Span, TextInputCad, TextTitle, TopBar, TopBarBluePart } from './onboarding-screen.styles';
import { ConfirmButton, InputLoginSenha, TextButton } from '../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';
import { ModalSenhaAppScreen } from '../AvisoModel/senhaAppModel';
import { Modal } from 'react-native';
import { ReduxState } from '../redux/store';
import { useSelector } from 'react-redux';
import { ModalSucessScreen } from '../AvisoModel/sucessModal';
import { LoadingSpinner } from '../Loading/loadingScreen';
import { WarningScreen } from '../AvisoModel/erroModel';
import { firebase } from '@react-native-firebase/analytics';
import { logEvent } from '../firebase/firebase';


interface OnboardingFinalTabelScreenProps {
  navigation: NavigationProp<RootStackParamList, 'OnboardingFinalTabel'>;
}

export default function OnboardingFinalTabelScreen({navigation}: OnboardingFinalTabelScreenProps) {
  const [loading, setLoading] = useState(false);
  const [avisoModal, setAvisoModal] = useState(false);
  const [sucessModal, setSucessModal] = useState(false);
  const [buttonState, setButtonState ] = useState(false);
  const userData = useSelector((state: ReduxState)=> state.user);
  const endData = useSelector((state: ReduxState)=> state.end);
  const senhaAppData = useSelector((state: ReduxState)=> state.senhaApp);
  const senhaTransData = useSelector((state: ReduxState)=> state.senhaTrans);
  const [showWarning, setShowWarning] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  const addErrorMessage = async (message: string) => {
    await setErrorMessage((prevErrorMessages => [...prevErrorMessages, message]))
  }
  const clearErrorMessage = async () => {
    await setErrorMessage([])
  }

  const updateErrorMessage = async () => {
    await setAlertMessage(errorMessage.join('\n'))
  }

  const [formData, setFormData] = useState({
    usuario_nome: userData.usuario_nome,
    usuario_email: userData.usuario_email,
    usuario_tel: 55+userData.usuario_tel,
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
    contaBanc_tipo: 'poupanca'
  })

  const [formUser, setFormUser] = useState({
    usuario_nome: userData.usuario_nome,
    usuario_email: userData.usuario_email,
    usuario_senha: senhaAppData.usuario_senha,
    usuario_tel: 55+userData.usuario_tel,
    usuario_cpf: userData.usuario_cpf,
    usuario_dtNascimento: userData.usuario_dtNascimento,
  })
  const [formEnd, setFormEnd] = useState({
    end_cep: endData.end_cep,
    end_rua: endData.end_rua,
    end_num: endData.end_num,
    end_complem: endData.end_complem,
    end_bairro: endData.end_bairro,
    end_cidade: endData.end_cidade,
    end_uf: endData.end_uf,
  })
  const [formConta, setFormConta] = useState({
    contaBanc_senhatransacao: senhaTransData.contaBanc_senhatransacao,
    contaBanc_tipo: 'poupanca'
  })
  const [formLogin, setFormLogin] = useState({
    usuario_cpf: userData.usuario_cpf,
    usuario_senha: senhaAppData.usuario_senha
  })

  useEffect(() => {
    if(formData.usuario_nome === '' || formData.usuario_email === '' || formData.usuario_tel === '' || formData.usuario_cpf === '' || formData.usuario_dtNascimento === '' || formData.usuario_senha === '' || formData.end_cep === '' || formData.end_rua === '' || formData.end_num === '' || formData.end_bairro === '' || formData.end_cidade === '' || formData.end_uf === '' || formData.contaBanc_senhatransacao === ''){
      setButtonState(false)
      return
    }else{
      setButtonState(true)
    }
  }, [])

  const hadleForm = async (event: any) => {
    setLoading(true)
    try {
      event.preventDefault()
      const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/usuario/create`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formUser)
      })
      console.log('USUARIO: ', res)
      if(!res.ok){
        clearErrorMessage()
        const AlertMessage = await res.json()
        if(AlertMessage.error){
          addErrorMessage(AlertMessage.error[0].mensagem)
          addErrorMessage(AlertMessage.error[1].mensagem)
        }
        if(AlertMessage.message){
          addErrorMessage(AlertMessage.message)
        }
        updateErrorMessage()
        console.log(alertMessage)
        setShowWarning(true)
        setLoading(false)
      }else{
        try {
          event.preventDefault()
          const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/usuario/login`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formLogin)
          });
          console.log('LOGIN:', res)
          if(!res.ok){
            const AlertMessage = await res.json()
            console.log(AlertMessage)
            setAlertMessage(AlertMessage.message)
            setShowWarning(true)
            setLoading(false)
          }
          const r = await res.json()
          if(r.token){
            try{
              const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/endereco/create`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${r.token}`
                },
                body: JSON.stringify(formEnd)
              })
              console.log('ENDERECO:', res)
              if(!res.ok){
                const AlertMessage = await res.json()
                console.log(AlertMessage)
                addErrorMessage(AlertMessage.message)
                updateErrorMessage()
                setLoading(false)
              }
              if(res.ok){
                try{
                  const res = await fetch(`https://rubcube-3-backend-victorhugo.onrender.com/conta/create`,{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${r.token}`
                    },
                    body: JSON.stringify(formConta)
                  })
                  console.log('CONTA: ', res)
                  if(res.ok){
                    setLoading(false)
                    setSucessModal(true)
                    clearErrorMessage()
                    logEvent('create_account', {undefined})
                  }else{
                    clearErrorMessage()
                    const AlertMessage = await res.json()
                    if(AlertMessage.error){
                      addErrorMessage(AlertMessage.error[0].mensagem)
                      addErrorMessage(AlertMessage.error[1].mensagem)
                    }
                    if(AlertMessage.message){
                      addErrorMessage(AlertMessage.message)
                    }
                    updateErrorMessage()
                    setShowWarning(true)
                    setLoading(false)
                  }
                }catch(err){
                  console.log(err)
                  setLoading(false)
                  console.log('Erro ao criar conta bancaria')
                }
              }
            }catch(err){
              console.log(err)
              setLoading(false)
              console.log('Erro ao criar endereco')
            }
          }
        }catch(err) {
          console.log(err)
          console.log('Erro ao logar usuario')
          setLoading(false)
        }

      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      console.log('Erro ao criar usuario')
    }
  }

  return (
    <ScreenBase>
      <LoadingSpinner visible={loading}/>
      <Modal
      visible={sucessModal}
      animationType='slide'
      onRequestClose={() => setSucessModal(false)}>
        <ModalSucessScreen navigation={() => navigation.navigate('Login')} message='Sua conta digital RubBank foi criada com sucesso!' message2='Vamos avaliar seu cadastro e validar sua conta. Acesse agora com seu CPF ou CNPJ e senha cadastados.'/>
      </Modal>
      <Modal visible={showWarning} transparent={true} animationType='slide' onRequestClose={()=> setShowWarning(false)} onTouchStart={() => setShowWarning(false)}>
        <WarningScreen
        onClose={() => setShowWarning(false)}
        warnMessage= {alertMessage}
        />
      </Modal>
      <Container>
        <TopBar><TopBarBluePart width='95%'/></TopBar>
        <TextTitle>Revisando as informações de cadastro</TextTitle>
        <DivAlignContent>
          <DivContentRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingDadosPessoais')}>
              <TextInputCad>Nome: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.usuario_nome}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingDadosPessoais')}>
              <TextInputCad>Email: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.usuario_email}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingDadosPessoais')}>
              <TextInputCad>Telefone: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.usuario_tel}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingDadosPessoais')}>
              <TextInputCad>CPF: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.usuario_cpf}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingDadosPessoais')}>
              <TextInputCad>Data de Nascimento: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.usuario_dtNascimento}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingSenhaApp')}>
              <TextInputCad>Senha: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.usuario_senha}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingEnd')}>
              <TextInputCad>CEP: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.end_cep}</Span></TextInputCad>
            </DivItemRev>
          </DivContentRev>
          <DivContentRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingEnd')}>
              <TextInputCad>Rua: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.end_rua}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingEnd')}>
              <TextInputCad>Número: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.end_num}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingEnd')}>
              <TextInputCad>Complemento: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.end_complem}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingEnd')}>
              <TextInputCad>Bairro: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.end_bairro}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingEnd')}>
              <TextInputCad>Cidade: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.end_cidade}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingEnd')}>
              <TextInputCad>UF: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.end_uf}</Span></TextInputCad>
            </DivItemRev>
            <DivItemRev onPress={() => navigation.navigate('OnboardingSenhaTrans')}>
              <TextInputCad>Senha de Transação: <IconFeather name='edit' size={16} color={'#000'} /></TextInputCad>
              <TextInputCad><Span>{formData.contaBanc_senhatransacao}</Span></TextInputCad>
            </DivItemRev>
          </DivContentRev>
        </DivAlignContent>
        <DivButtonConfirm>
          <ConfirmButton disabled={!buttonState} style={!buttonState ? {backgroundColor: '#6B7AE578'} : {}} onPress={hadleForm} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">CONFIRMAR</TextButton></ConfirmButton>
        </DivButtonConfirm>
      </Container>
    </ScreenBase>
  );
}
