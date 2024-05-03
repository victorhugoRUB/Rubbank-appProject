import {View, Image, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 100px;
  gap: 40px;
  /* background-color: yellow; */
`;

export const Logo = styled(Image)`
  background-position: center;
  background-repeat: no-repeat;
  height: 45px;
  width: 210px;
`;

export const DivMain = styled(View)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  gap: 20px; 
`;

export const DivText = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextTop = styled(Text)<{ fontWeight?: string }>`
  font-size: 16px;
  font-weight: ${props => props.fontWeight};
  color: black;
`;

export const TextButton = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
`;

export const Button = styled(TouchableOpacity)`
  background-color: #6B7AE5;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 500px;
`;
