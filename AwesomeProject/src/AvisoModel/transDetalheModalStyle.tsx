import { Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import LinearGradient from 'react-native-linear-gradient';

export const ContainerTrans = styled(View)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #0000004c;
`;

// export const MiddleContent = styled(LinearGradient).attrs({
//   colors: ['#6B7AE5', '#FFFFFF'],
//   start: { x: 0, y: 0 },
//   end: { x: 1, y: 1 }, 
//   locations: [0.1, 0.9], 
// })`
//   flex: 0.7;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   width: 100%;
//   border-radius: 32px 32px 0 0;
// `;

export const MiddleContentTrans = styled(View)`
  flex: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: 32px 32px 0 0;
`;

export const CircleContentTrans = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 500px;
  width: 80px;
  height: 80px;
  border: 4px solid #00204A;
`;

export const TextContentTrans = styled(Text)`
  font-size: 24px;
  font-weight: 700;
  color: #00204A;
  text-align: center;
`;

export const DivTopTrans = styled(View)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  border-radius: 32px 32px 0 0;
  border-bottom-width: 1px;
  border-bottom-color: #6B7AE5;
  padding: 24px;
`;

export const DivBottomTrans = styled(View)`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 24px;
`;

export const TextTopDashTrans = styled(Text)<{ color?: string }>`
  font-size: 20px;
  color: ${props => props.color || '#fff'};
  text-align: center;
  padding: 0 25px 0 0;
  flex: 1;
`;

export const TextBottomContentTrans = styled(Text)`
  font-size: 20px;
  color: #00204A;
  text-align: left;
  font-weight: 700;
`;

export const DivBottomContentTrans = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ConfirmButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 16px;
  border-radius: 500px;
  border: 2px solid #6B7AE5;
  margin: 24px 0;
`;