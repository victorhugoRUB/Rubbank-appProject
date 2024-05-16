import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import endReducer from './endSlice';
import senhaAppReducer from './senhaAppSlice';
import senhaTransReducer from './senhaTransSlice';
import filtroReducer from './filtroSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        end: endReducer,
        senhaApp: senhaAppReducer,
        senhaTrans: senhaTransReducer,
        filtro: filtroReducer
    }
});

export type ReduxState = ReturnType<typeof store.getState>;