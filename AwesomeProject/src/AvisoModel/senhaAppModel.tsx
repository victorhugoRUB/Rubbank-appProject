import React from 'react';
import type {NavigationProp} from '@react-navigation/native';
import { BottomContent, Container, ListContent, TextModal, TitleModal, TopContent, UniqueListContent } from './senhaAppModelStyle';
import { DivButtonConfirm, Span } from '../onboarding/onboarding-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import { ConfirmButton, TextButton } from '../login/login-screen.styles';


export const ModalSenhaAppScreen = ({onClose}: {onClose: () => void}) => {
    return (
        <Container>
            <TopContent>
                <TitleModal size='18px' align='center'><Span>Criar senha</Span></TitleModal>
                <TouchableOpacity onPress={onClose}><IconFeather name='x' size={24} color={'#000'} style={{alignSelf: 'flex-end'}} /></TouchableOpacity>
            </TopContent>
            <BottomContent>
                <TextModal size='16px'>Siga as instruções abaixo para criar uma senha segura:</TextModal>
                <ListContent>
                    <UniqueListContent>
                        <IconFeather name='check' size={25} color={'#000'} />
                        <TextModal size='16px'>A senha deve conter no mínimo 8 caracteres, entre letras, números e caracteres especiais (!@#$%^&*).</TextModal>
                    </UniqueListContent>
                    <UniqueListContent>
                        <IconFeather name='check' size={25} color={'#000'} />
                        <TextModal size='16px'>Não utilizar números ou letras repetidos; não utilizar números ou letras sequênciais (ex: 12345678, aaaaaaaa).</TextModal>
                    </UniqueListContent>
                    <UniqueListContent>
                        <IconFeather name='check' size={25} color={'#000'} />
                        <TextModal size='16px'>Evite utilizar dados pessoais como nome, data de nascimento, número de telefone ou nome da mãe.</TextModal>
                    </UniqueListContent>
                </ListContent>
            </BottomContent>
        <DivButtonConfirm>
          <ConfirmButton onPress={onClose} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">ENTENDI</TextButton></ConfirmButton>
        </DivButtonConfirm>
        </Container>
    );
}
  