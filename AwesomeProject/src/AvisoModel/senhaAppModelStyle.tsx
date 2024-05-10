import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export const Container = styled(View)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #ffffff;
  padding: 64px 32px 32px 32px;
  gap: 16px;
`;

export const TopContent = styled(View)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const TextModal = styled(Text)<{size: string, align?: string}>`
  font-size: ${props => props.size};
  color: #000;
  text-align: ${props => props.align || 'left'};
  flex-shrink: 1;
`;

export const TitleModal = styled(Text)<{size: string, align?: string}>`
  font-size: ${props => props.size};
  color: #000;
  text-align: ${props => props.align || 'left'};
  flex: 1;
`;

export const BottomContent = styled(View)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex: 1;
  gap: 24px;
`;

export const ListContent = styled(View)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 48px;
`;

export const UniqueListContent = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  max-width: 100%;
  gap: 10px;
  align-items: center;
`;