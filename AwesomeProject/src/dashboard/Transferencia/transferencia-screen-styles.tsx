import { property } from "lodash";
import { PiDropSimple } from "react-icons/pi";
import { Image, ScrollView, TextInput, Touchable, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import styled from "styled-components";

export const Container = styled(View)`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const DivTop = styled(View)<{ flex?: number }>`
    flex: 0.15;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 32px;
`;

export const NewDivTop = styled(View)<{ flex?: number }>`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 32px;
`;

export const DivTopContent = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

export const DivSaldo = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    width: 50%;
`;

export const TextSaldo = styled(Text)<{fontSize: string, textAlign: string}>`
  color: #fff;
  font-size: ${props => props.fontSize};
  text-align: ${props => props.textAlign};
`;

export const DivBottom = styled(View)`
    flex: 8;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    border-radius: 32px 32px 0 0;
    background-color: #ffffff;
    width: 100%;
    padding: 24px 40px;
`;

export const DivBottomScroll = styled(ScrollView)`
    flex: 1;
    display: flex;
    flex-direction: column;
    border-radius: 32px 32px 0 0;
    background-color: #ffffff;
    width: 100%;
    padding: 24px 40px;
`;

export const DivBttTop = styled(View)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
    border-radius: 32px 32px 0 0;
    padding: 16px 32px 0 32px;
    border-bottom-width: 0.7px;
    border-bottom-color: #000;
`;

export const DivBttTopFiltro = styled(View)`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
    border-radius: 32px 32px 0 0;
    padding: 16px 32px 0 32px;
`;

export const DivBttTopButton = styled(TouchableOpacity)<{ width?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-width: ${props => props.width || '0'};
    border-bottom-color: #6B7AE5;
`;

export const TextButtonDivBtt = styled(Text)<{fontSize?: any, color?: string}>`
    color: ${props => props.color || '#000'};
    font-size: ${props => props.fontSize || '16px'};
`;

export const DivBttContent = styled(View)`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`;

export const DivTextBttFiltro = styled(View)`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const DivBlockDays = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

export const BlockOfDays = styled(TouchableOpacity)<{ backgroundColor?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    border-radius: 12px;
    border: 1px solid #000;
    background-color: ${props => props.backgroundColor || 'transparent'};
`;

export const PeriodoButton = styled(TouchableOpacity)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const DivOrdem = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`;

export const DivAntigoNovo = styled(View)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

export const AntigoNovoButton = styled(TouchableOpacity)<{borderBottomWidth?: string}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    padding: 10px 0;
    border-bottom-width: ${props => props.borderBottomWidth || '0'};
    border-bottom-color: #aaabab;
`;

export const TextLinks = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: #F1580C;
`;

export const DivData = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

export const InputData = styled(TextInputMask)`
  border-bottom-color: #1D1C3E;
  border-bottom-width: 1px;
  padding: 10px;
  width: 50%;
  max-width: 100%;
  font-size: 15px;
  font-weight: 700;
`;

export const BlockTransDay = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    margin: 0 0 20px 0;
`;

export const BlockTrans = styled(TouchableOpacity)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
`;

export const DivTextTrans = styled(View)`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;    
`;

export const TextTopDashExtrato = styled(Text)<{ color?: string; size?: string }>`
  font-size: ${props => props.size || '16px'};
  color: ${props => props.color || '#fff'};
  text-align: center;
  padding: 0 25px 0 0;
`;

export const TextTopDashHeader = styled(Text)<{ color?: string; size?: string }>`
  font-size: ${props => props.size || '16px'};
  color: ${props => props.color || '#fff'};
  text-align: flex-start;
  padding: 18px 18px 18px 0;
`;

export const DivInputLogin = styled(View)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  height: 40%;
  width: 100%;
`;

export const DivTextValor = styled(View)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

export const LogoTrans = styled(Image)`
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
`;

export const PutOnTop = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: row;
    gap: 10px;
`;

export const DivButtonNext = styled(View)`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 95%;
`;

export const CountInMiddle = styled(View)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ButtonNext = styled(TouchableOpacity)<{ backColor?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    width: 20%;
    background-color: ${props => props.backColor || '#6B7AE5'};
    border-radius: 500px;
`;

export const TextTopDash = styled(Text)<{ color?: string }>`
  font-size: 24px;
  color: ${props => props.color || '#fff'};
  text-align: center;
  flex: 1;
`;

export const DivInputTrans = styled(View)<{ gap?: string; padding?: string; flex1?: string }>`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    gap: ${props => props.gap || '0'};
    padding: ${props => props.padding || '0'};
`;

export const DivContentInput = styled(View)`
    display: flex;
    width: 100%;
    gap: 20px;
`;

export const InputToWrite = styled(TextInput)<{ width?: string}>`
  border-bottom-color: #1D1C3E;
  border-bottom-width: 1px;
  padding: 10px;
  width: ${props => props.width || '100%'};
  height: 70px;
  max-width: 100%;
  font-size: 16px;
  font-weight: 700;
`;

export const InputToWriteMask = styled(TextInputMask)<{ width?: string}>`
  border-bottom-color: #1D1C3E;
  border-bottom-width: 1px;
  padding: 10px;
  width: ${props => props.width || '100%'};
  height: 70px;
  max-width: 100%;
  font-size: 48px;
  font-weight: 500;
`;

export const DivSenhaTrans = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    gap: 10px;
`;

export const InputCadastro = styled(TextInput)<{ fontSize?: string }>`
    border-bottom-color: #1D1C3E;
    border-bottom-width: 1px;
    padding: 10px;
    width: 20%;
    font-size: ${props => props.fontSize || '16px'};
    font-weight: 700;
    text-align: center;
`;
