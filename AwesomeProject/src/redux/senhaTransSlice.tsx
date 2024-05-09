import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface senhaTransState {
    contaBanc_senhatransacao: string,
}

const initialState: senhaTransState = {
    contaBanc_senhatransacao: '',
}

const senhaTransSlice = createSlice({
    name: 'senhaTrans',
    initialState,
    reducers: {
        setSenhaTransField(state, action: PayloadAction<{ field: string, value: string }>) {
            const { field, value } = action.payload;
            state[field as keyof senhaTransState] = value;
        },
    }
})

export const {setSenhaTransField} = senhaTransSlice.actions;
export default senhaTransSlice.reducer;

