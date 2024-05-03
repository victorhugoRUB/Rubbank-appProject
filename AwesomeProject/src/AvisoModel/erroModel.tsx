import React from 'react';
import { BottomText, DivTextCloseModel, DivTextModel, ErrorContainer, ErrorModel, TextCloseModel, TopText, WarningImage } from '../AvisoModel/erroModelStyle';
import { TouchableWithoutFeedback } from 'react-native';
const warningImage = require('../assets/Icons/warning.png');

export const WarningScreen = ({onClose, warnMessage}: {onClose: () => void, warnMessage: string}) => {
    return (
        <ErrorContainer>
        <DivTextCloseModel><TouchableWithoutFeedback onPress={onClose}><TextCloseModel>X Fechar</TextCloseModel></TouchableWithoutFeedback></DivTextCloseModel>
        <ErrorModel>
            <WarningImage source={warningImage}/>
            <DivTextModel>
            <TopText>Atenção</TopText>
            <BottomText>{warnMessage}</BottomText>
            </DivTextModel>
        </ErrorModel>
      </ErrorContainer>
    );
}
  