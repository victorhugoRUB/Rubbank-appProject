import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FiltroState {
    dataInicial: string;
    dataFinal: string;
    dias: string;
    ordem: string;
    page: number | string;
}

const initialState: FiltroState = {
    dataInicial: '',
    dataFinal: '',
    dias: '',
    ordem: '',
    page: '2',
}

const filtroSlice = createSlice({
    name: 'filtro',
    initialState,
    reducers: {
        setFiltroField(state, action: PayloadAction<{ field: string, value: string }>) {
            const { field, value } = action.payload;
            state[field as keyof FiltroState] = value;
        },
    }
})

export const {setFiltroField} = filtroSlice.actions;
export default filtroSlice.reducer;

