import React, {PropsWithChildren, ReactElement} from 'react';
import {Screen} from './dashboard-screen-base.styles';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const ScreenBase = ({children}: PropsWithChildren): ReactElement => {
  const isDarkMode = useColorScheme() === 'dark';
  return <Screen>{children}</Screen>;
};
