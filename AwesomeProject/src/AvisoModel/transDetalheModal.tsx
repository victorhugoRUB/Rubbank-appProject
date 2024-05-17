import React from 'react';
import { CircleContentTrans, ContainerTrans, DivBottomTrans, DivBottomContentTrans, DivTopTrans, MiddleContentTrans, TextBottomContentTrans, TextContentTrans, TextTopDashTrans, ConfirmButton } from './transDetalheModalStyle';
import { DivButtonConfirm, Span } from '../onboarding/onboarding-screen.styles';
import { TextButton } from '../login/login-screen.styles';
import IconFeather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';


export const TransDetalheScreen = ({onClose, onShare, rem, des, val, desc, sta, met, dt}:{onClose: () => void; onShare: () => void; rem: number; des: number; val: number; desc: string; sta: string; met: string; dt: string} ) => {
    return (
        <ContainerTrans>
            <MiddleContentTrans>
                <DivTopTrans>
                    <TouchableOpacity onPress={onClose} ><IconFeather name="arrow-left" size={24} color="#000" /></TouchableOpacity>
                    <TextTopDashTrans color='#000' >Comprovante de Transferencia</TextTopDashTrans>
                </DivTopTrans>
                <DivBottomTrans>
                    <DivBottomContentTrans><TextBottomContentTrans>Remetente: {rem}</TextBottomContentTrans></DivBottomContentTrans>
                    <DivBottomContentTrans><TextBottomContentTrans>Destinatário: {des}</TextBottomContentTrans></DivBottomContentTrans>
                    <DivBottomContentTrans><TextBottomContentTrans>Valor transferido: R${val}</TextBottomContentTrans></DivBottomContentTrans>
                    <DivBottomContentTrans><TextBottomContentTrans>Descrição: {desc}</TextBottomContentTrans></DivBottomContentTrans>
                    <DivBottomContentTrans><TextBottomContentTrans>Status: {sta}</TextBottomContentTrans></DivBottomContentTrans>
                    <DivBottomContentTrans><TextBottomContentTrans>Método: {met}</TextBottomContentTrans></DivBottomContentTrans>
                    <DivBottomContentTrans><TextBottomContentTrans>Data da transferência: {dt}</TextBottomContentTrans></DivBottomContentTrans>
                </DivBottomTrans>
                <ConfirmButton onPress={onShare} ><TextButton size='18px' cor='#6B7AE5' >Compartilhar comprovante</TextButton></ConfirmButton>
            </MiddleContentTrans>
        </ContainerTrans>
    );
}
  