import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface senhaAppState {
    usuario_senha: string,
}

const initialState: senhaAppState = {
    usuario_senha: '',
}

const senhaAppSlice = createSlice({
    name: 'senhaApp',
    initialState,
    reducers: {
        setsenhaAppField(state, action: PayloadAction<{ field: string, value: string }>) {
            const { field, value } = action.payload;
            state[field as keyof senhaAppState] = value;
        },
    }
})

export const {setsenhaAppField} = senhaAppSlice.actions;
export default senhaAppSlice.reducer;

