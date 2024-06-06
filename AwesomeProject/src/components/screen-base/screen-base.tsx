import React, {PropsWithChildren, ReactElement} from 'react';
import {Screen} from './screen-base.styles';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const ScreenBase = ({children}: PropsWithChildren): ReactElement => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.red,
  };
  return <Screen style={backgroundStyle}>{children}</Screen>;
};
