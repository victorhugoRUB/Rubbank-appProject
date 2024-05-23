import React from 'react';
import { BottomText, DivTextCloseModel, DivTextModel, ErrorContainer, ErrorModel, TextCloseModel, TopText, WarningImage } from './erroModelStyle';
import { TouchableWithoutFeedback } from 'react-native';
import { ConfirmButton, TextButton } from '../login/login-screen.styles';
const warningImage = require('../assets/Icons/warning.png');

export const WarningSenhaTransScreen = ({onClose, mainWarnMessage, warnMessage, navigation}: {onClose: () => void, warnMessage: string, mainWarnMessage: string, navigation: any}) => {
    return (
    <ErrorContainer>
        <DivTextCloseModel><TouchableWithoutFeedback onPress={onClose}><TextCloseModel>X Fechar</TextCloseModel></TouchableWithoutFeedback></DivTextCloseModel>
        <ErrorModel>
            <DivTextModel>
                <TopText>{mainWarnMessage}</TopText>
                <BottomText>{warnMessage}</BottomText>
            </DivTextModel>
            <ConfirmButton accessibilityLabel="Confirmar login" cor='#6B7AE5'><TextButton cor="#ffffff">FALAR COM SUPORTE</TextButton></ConfirmButton>
            <ConfirmButton onPress={navigation} accessibilityLabel="Confirmar login" border='#6B7AE5' cor='#FFFFFF'><TextButton cor="#6B7AE5">VOLTAR PARA O INÍCIO</TextButton></ConfirmButton>
        </ErrorModel>
    </ErrorContainer>
    );
}
  