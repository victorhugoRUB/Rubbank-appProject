import React from 'react';
import { CircleContent, Container, MiddleContent, TextBottomContent, TextContent } from './sucessModalStyle';
import { DivButtonConfirm } from '../onboarding/onboarding-screen.styles';
import { ConfirmButton, TextButton } from '../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';


export const ModalTransSucessScreen = ({navigation, navigation2, message, message2}: {navigation: any; navigation2: any; message: string, message2: string}) => {
    return (
        <Container>
            <MiddleContent>
                <CircleContent><IconFeather name='check' size={65} color={'#00204A'} /></CircleContent>
                <TextContent>{message}</TextContent>
                <TextBottomContent>{message2}</TextBottomContent>
            </MiddleContent>
        <DivButtonConfirm>
          <ConfirmButton onPress={navigation} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">ENVIAR COMPROVANTE</TextButton></ConfirmButton>
          <ConfirmButton onPress={navigation2} accessibilityLabel="Confirmar login" border='2px solid #6B7AE5' cor='#fff'><TextButton cor="#6B7AE5">VOLTAR À TELA PRINCIPAL</TextButton></ConfirmButton>
        </DivButtonConfirm>
        </Container>
    );
}
  