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

export const MiddleContent = styled(View)`
  flex: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

export const CircleContent = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 500px;
  width: 80px;
  height: 80px;
  border: 4px solid #00204A;
`;

export const TextContent = styled(Text)`
  font-size: 24px;
  font-weight: 700;
  color: #00204A;
  text-align: center;
`;

export const TextBottomContent = styled(Text)`
  font-size: 20px;
  color: #00204A;
  text-align: center;
`;
