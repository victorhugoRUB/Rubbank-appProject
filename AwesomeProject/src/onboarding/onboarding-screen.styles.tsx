import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
  padding: 30px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
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
  gap: 40px;
`;

export const BlockInput = styled(View)<{ width?: string }>`
  display: flex;
  width: ${props => props.width || 'auto'};
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
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

export const InputCadastro = styled(TextInput)`
  
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
  flex: 1;  
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
