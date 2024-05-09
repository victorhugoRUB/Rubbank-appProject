import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
    usuario_nome: string;
    usuario_email: string;
    usuario_tel: string;
    usuario_cpf: string;
    usuario_dtNascimento: string;
}

const initialState: UserState = {
    usuario_nome: '',
    usuario_email: '',
    usuario_tel: '',
    usuario_cpf: '',
    usuario_dtNascimento: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserField(state, action: PayloadAction<{ field: string, value: string }>) {
            const { field, value } = action.payload;
            state[field as keyof UserState] = value;
        },
    }
})

export const {setUserField} = userSlice.actions;
export default userSlice.reducer;

