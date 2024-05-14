import { property } from "lodash";
import { PiDropSimple } from "react-icons/pi";
import { Touchable, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

export const DivTop = styled(View)<{ flex?: number }>`
    flex: ${props => props.flex || 1};
    display: flex;
    justify-content: space-between;
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
  flex: 1;
  text-align: ${props => props.textAlign};
`;

export const DivBottom = styled(View)`
    flex: 8;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 32px 32px 0 0;
    background-color: #ffffff;
    width: 100%;
`;

export const DivBttTop = styled(View)`
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
    border-radius: 32px 32px 0 0;
    padding: 16px 32px 0 32px;
    border-bottom-width: 1px;
    border-bottom-color: #000;
`;

export const DivBttTopFiltro = styled(View)`
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    width: 100%;
    border-radius: 32px 32px 0 0;
    padding: 16px 32px 0 32px;
`;

export const DivBttTopButton = styled(TouchableOpacity)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const TextButtonDivBtt = styled(Text)<{fontSize?: any, color?: string}>`
    color: ${props => props.color || '#000'};
    font-size: ${props => props.fontSize || '16px'};
`;

export const DivBttContent = styled(View)<{justify?: string, align?: string}>`
    flex: 12;
    display: flex;
    justify-content: ${props => props.justify || 'center'};
    align-items: ${props => props.align || 'center'};
    flex-direction: column;
    width: 100%;
    padding: 32px;
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

export const BlockOfDays = styled(TouchableOpacity)`
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