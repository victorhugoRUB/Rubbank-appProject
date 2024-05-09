import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import endReducer from './endSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        end: endReducer,
    }
});

export type ReduxState = ReturnType<typeof store.getState>;