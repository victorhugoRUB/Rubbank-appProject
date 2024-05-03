import {Text, TextInput, View} from 'react-native';
import styled from 'styled-components';

export const Input = styled(TextInput)`
  margin-bottom: 10px;
  padding: 6px 8px 6px 8px;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
  color: #000;
`;

export const ListItem = styled(View)`
  margin: 10px 0;
  padding: 10px;
  background-color: #ccc;
  border-color: black;
  border-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ItemText = styled(Text)`
  color: black;
  font-size: 18px;
`;
