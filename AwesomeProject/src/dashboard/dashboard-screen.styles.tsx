import {View, Image, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const DivTop = styled(View)`
  flex: 0.5;
  display: flex;
  justify-content: space-between;
  padding: 32px;
`;

export const DivOptions = styled(View)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const DivBalance = styled(View)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const SeuSaldo = styled(View)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

export const TextSaldo = styled(Text)<{fontSize: string}>`
  color: #fff;
  font-size: ${props => props.fontSize};
`;

export const BlockOptions = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;

`;

export const Logo = styled(Image)`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 30px;
  width: 140px;
`;

export const IconsTop = styled(Image)`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 30px;
  width: 30px;
`;

export const DivBottom = styled(View)`
  flex: 2.5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 24px;
  border-radius: 32px 32px 0 0;
  background-color: #ffffff;
  flex-wrap: wrap;
`;

export const BlockOptionsBottom = styled(TouchableOpacity)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  padding: 8px;
  background-color: #fff;
  elevation: 4;
  height: 88px;
  border-radius: 8px;
  width: 47%;
  margin: 5px;
`;

export const TextBlockBottom = styled(Text)`
  color: #000;
  font-size: 14px;
`;