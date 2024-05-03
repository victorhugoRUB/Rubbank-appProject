import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export const ErrorContainer = styled(View)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #0000009f;
  padding: 32px;
`;

export const DivTextCloseModel = styled(View)`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
`;

export const TextCloseModel = styled(Text)`
  font-size: 15px;
  font-weight: 500;
  color: #FFFFFF;
`;

export const ErrorModel = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  padding: 32px;
  gap: 16px;
  border-radius: 0 0 6px 6px;
`;

export const WarningImage = styled(Image)`
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 53px;
  height: 53px;
`;

export const DivTextModel = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TopText = styled(Text)`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
`;

export const BottomText = styled(Text)`
  font-size: 15px;
  font-weight: 500;
  color: #000000;
`;