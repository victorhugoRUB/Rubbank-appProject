import React, {PropsWithChildren, ReactElement} from 'react';
import {Screen} from './dashboard-screen-base.styles';

export const ScreenBase = ({children}: PropsWithChildren): ReactElement => {
  return <Screen>{children}</Screen>;
};
