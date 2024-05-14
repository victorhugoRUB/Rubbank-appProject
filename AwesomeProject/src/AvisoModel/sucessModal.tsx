import React from 'react';
import { CircleContent, Container, MiddleContent, TextBottomContent, TextContent } from './sucessModalStyle';
import { DivButtonConfirm } from '../onboarding/onboarding-screen.styles';
import { ConfirmButton, TextButton } from '../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';


export const ModalSucessScreen = ({navigation, message, message2}: {navigation: any; message: string, message2: string}) => {
    return (
        <Container>
            <MiddleContent>
                <CircleContent><IconFeather name='check' size={65} color={'#00204A'} /></CircleContent>
                <TextContent>{message}</TextContent>
                <TextBottomContent>{message2}</TextBottomContent>
            </MiddleContent>
        <DivButtonConfirm>
          <ConfirmButton onPress={navigation} accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">ENTENDI</TextButton></ConfirmButton>
        </DivButtonConfirm>
        </Container>
    );
}
  