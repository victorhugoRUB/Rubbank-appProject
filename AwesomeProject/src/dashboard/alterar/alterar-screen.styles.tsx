import {View, Image, Text, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopBar = styled(View)`
  display: flex;
  width: 100%;
  height: 4px;
  background-color: #D2D2D2;
`;

export const DivContent = styled(View)`
  flex: 1;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

export const TopBarBluePart = styled(View)<{width: string}>`
  display: flex;
  width: ${props => props.width || '0%'};
  height: 100%;
  background-color: #6B7AE5;
`;

export const TextTitle = styled(Text)`
  text-align: center;
  font-size: 26px;
  font-weight: 400;
  color: #000;

`;

export const DivInput = styled(View)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: column;
  gap: 20px;
`;

export const DivInputScroll = styled(ScrollView)`
  width: 100%;
  display: flex; 
  flex-direction: column;
`;

export const BlockInput = styled(View)<{ width?: string }>`
  display: flex;
  width: ${props => props.width || 'auto'};
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
`;

export const BlocksOfInput = styled(View)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const TextInputCad = styled(Text)`
  font-size: 13px;
  color: #000;
`;

export const InputCadastro = styled(TextInputMask)`
  
  border-bottom-color: #1D1C3E;
  border-bottom-width: 1px;
  padding: 10px;
  width: 100%;
  max-width: 100%;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;

export const DivButtonConfirm = styled(View)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const DivButtonConfirmSenhaTrans = styled(View)`
  display: flex;
  width: 100%;
  height: 20%;
  justify-content: flex-end;
  align-items: center;
`;

export const Span = styled(Text)<{decoration?: string}>`
  font-weight: 700;
  text-decoration: ${props => props.decoration || 'none'};
`;

export const LinkToInfoModal = styled(TouchableOpacity)`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ErrorMessage = styled(Text)`
  font-size: 13px;
  font-weight: 700;
  color: #ff0000;
`;

export const DivContentRev = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
`;

export const DivAlignContent = styled(View)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
`;

export const DivItemRev = styled(TouchableOpacity)`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  justify-content: space-between;
`;

export const DivOfInputs = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

export const InputTransSenha = styled(TextInput)`
  border-bottom-color: #1D1C3E;
  border-bottom-width: 1px;
  padding: 10px;
  width: 20%;
  max-width: 100%;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
`;

export const ContentBottom = styled(TouchableOpacity)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-radius: 15px;
  /* background-color: red; */
  elevation: 4;
  background-color: #fff;
  padding: 28px;
  margin: 10px;
`;

export const DivBttContent = styled(View)<{justify?: string, align?: string}>`
    display: flex;
    justify-content: ${props => props.justify || 'center'};
    align-items: ${props => props.align || 'center'};
    flex-direction: column;
    width: 100%;
    /* background-color: red; */
`;