import React from 'react';
import { CircleContent, Container, MiddleContent, TextBottomContent, TextContent } from './sucessModalStyle';
import { DivButtonConfirm } from '../onboarding/onboarding-screen.styles';
import { ConfirmButton, TextButton } from '../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';


export const ModalSucessScreen = ({navigation}: {navigation: any}) => {
    return (
        <Container>
            <MiddleContent>
                <CircleContent><IconFeather name='check' size={65} color={'#00204A'} /></CircleContent>
                <TextContent>Sua conta digital RubBank foi criada com sucesso!</TextContent>
                <TextBottomContent>Vamos avaliar seu cadastro e validar sua conta.</TextBottomContent>
                <TextBottomContent>Acesse agora com seu CPF ou CNPJ e senha cadastados.</TextBottomContent>
            </MiddleContent>
        <DivButtonConfirm>
          <ConfirmButton onPress={navigation} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">ENTENDI</TextButton></ConfirmButton>
        </DivButtonConfirm>
        </Container>
    );
}
  