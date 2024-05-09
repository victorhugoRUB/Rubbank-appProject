import { Text, View } from "react-native";
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
  color: #000000;
`;

export const DivCalendar = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 16px;
  width: 100%;
  border-radius: 6px;
`;
