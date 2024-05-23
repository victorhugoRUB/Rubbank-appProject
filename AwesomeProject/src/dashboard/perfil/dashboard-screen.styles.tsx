import {View, Image, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

export const Container = styled(View)`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const DivTop = styled(View)`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 32px;
`;

export const DivBottom = styled(View)`
  flex: 22;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 32px;
  border-radius: 32px 32px 0 0;
  background-color: #ffffff;
  flex-wrap: wrap;
  gap: 24px;
`;

export const TextTopDash = styled(Text)<{ color?: string, weight?: string }>`
  font-size: 24px;
  color: ${props => props.color || '#fff'};
    font-weight: ${props => props.weight || 'none'};
  text-align: center;
  flex: 1;
  padding: 0 25px 0 0;
`;

export const DivTopContent = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const UserPicture = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6B7AE5;
  border-radius: 500px;
  width: 70px;
  height: 70px;
`;

export const TopContentTextName = styled(Text)<{ align?: string }>`
  font-size: 17px;
  color: #000;
  text-align: ${props => props.align || 'center'};
`;

export const TopContentTextCPF = styled(Text)`
  font-size: 11px;
  color: #000;
  text-align: center;
`;

export const DivBottomContent = styled(View)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContentBottom = styled(TouchableOpacity)`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  border-top-width: 0.5px;
  border-top-color: #000;
  /* background-color: red; */
  padding: 28px 0;
`;

export const ConfirmButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 14px;
  border-radius: 500px;
  border: 1px solid #000000;
`;

export const BancContent = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const BancContItem = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BancContItemSpcfc = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const TitleTextData = styled(Text)`
  font-size: 14px;
  color: #000;
`;

export const TextCopy = styled(Text)`
  font-size: 14px;
  color: #6B7AE5;
`;

export const DivButton = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
`;