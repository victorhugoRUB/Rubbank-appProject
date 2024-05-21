import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import endReducer from './endSlice';
import senhaAppReducer from './senhaAppSlice';
import senhaTransReducer from './senhaTransSlice';
import filtroReducer from './filtroSlice';
import dadosTransReducer from './dadosTransSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        end: endReducer,
        senhaApp: senhaAppReducer,
        senhaTrans: senhaTransReducer,
        filtro: filtroReducer,
        dadosTrans: dadosTransReducer
    }
});

export type ReduxState = ReturnType<typeof store.getState>;