import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
  /* background-color: yellow; */
`;

export const Logo = styled(Image)`
  background-position: center;
  background-repeat: no-repeat;
  height: 30px;
  width: 140px;
  
`;

export const DivText = styled(View)`
  flex: 0.25;
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  width: 100%;
`;

export const TextTop = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: black;
`;

export const TextBottom = styled(Text)`
  font-size: 13px;
  font-weight: 700;
  color: black;
`;

export const DivLogin = styled(View)`
  flex: 1;
  display: flex;
  /* background-color: green; */
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
`;

export const TitleInput = styled(Text)`
  font-size: 13px;
  font-weight: 400;
  color: black;
`;

export const InputLogin = styled(TextInputMask)<{ width?: string }>`
  border-bottom-color: #1D1C3E;
  border-bottom-width: 1px;
  padding: 10px;
  width: ${props => props.width || '100%'};
  max-width: 100%;
  font-size: 15px;
  font-weight: 700;
`;

export const InputLoginSenha = styled(TextInput)<{width?: string}>`
  border-bottom-color: #1D1C3E;
  border-bottom-width: 1px;
  padding: 10px;
  width: ${props => props.width || '100%'};
  max-width: 100%;
  font-size: 15px;
  font-weight: 700;
  color: #000000;
`;

export const InputLoginSenhaMasked = styled(TextInputMask)`
  border-bottom-color: #1D1C3E;
  border-bottom-width: 1px;
  padding: 10px;
  width: 100%;
  max-width: 100%;
  font-size: 15px;
  font-weight: 700;
`;

export const DivInputLogin = styled(View)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const TextButton = styled(Text)<{ cor?: string, size?: string }>`
  font-size: ${props => props.size || '16px'};
  font-weight: 600;
  color: ${props => props.cor};
`;

export const ConfirmButton = styled(TouchableOpacity)<{ cor?: string, border?: string | undefined }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: ${props => props.cor || '#6B7AE5'};
  border-radius: 500px;
  border: ${props => props.border || 'none'};
`;

export const TextLinks = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: #6B7AE5;
`;

export const EyePasswordIcon = styled(Image)`
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  height: 20px;
  width: 20px;
`;

