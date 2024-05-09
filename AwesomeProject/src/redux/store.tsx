import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import endReducer from './endSlice';
import senhaAppReducer from './senhaAppSlice';
import senhaTrans from './senhaTransSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        end: endReducer,
        senhaApp: senhaAppReducer,
        senhaTrans: senhaTrans
    }
});

export type ReduxState = ReturnType<typeof store.getState>;