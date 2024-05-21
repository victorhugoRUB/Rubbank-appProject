import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DadosTransState {
    usuario_remetente: string;
    usuario_cpf: string;
    usuario_destinatario: string;
    contaBanc_nome: string;
    contaBanc_agencia: string;
    contaBanc_conta: string;
    trans_descricao: string;
    trans_valor: number;
    contaBanc_senhatransacao: string;
}

const initialState: DadosTransState = {
    usuario_remetente: '',
    usuario_cpf: '',
    usuario_destinatario: '',
    contaBanc_nome: 'Rubbank',
    contaBanc_agencia: '',
    contaBanc_conta: '',
    trans_descricao: '',
    trans_valor: 0,
    contaBanc_senhatransacao: ''
}

type DadosTransField = keyof DadosTransState;

const dadosTransSlice = createSlice({
    name: 'dadosTrans',
    initialState,
    reducers: {
        setDadosTransField<K extends DadosTransField>(state: DadosTransState, action: PayloadAction<{ field: K, value: DadosTransState[K] }>) {
            const { field, value } = action.payload;
            state[field] = value;
        },
    }
})

export const {setDadosTransField} = dadosTransSlice.actions;
export default dadosTransSlice.reducer;

