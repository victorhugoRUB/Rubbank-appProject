import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EndState {
    end_id: number;
    end_cep: string;
    end_rua: string;
    end_num: string;
    end_complem: string;
    end_bairro: string;
    end_cidade: string;
    end_uf: string;
}

const initialState: EndState = {
    end_id: 0,
    end_cep: '',
    end_rua: '',
    end_num: '',
    end_complem: '',
    end_bairro: '',
    end_cidade: '',
    end_uf: ''
}

type EndField = keyof EndState;

const endSlice = createSlice({
    name: 'end',
    initialState,
    reducers: {
        setEndField<K extends EndField>(state: EndState, action: PayloadAction<{ field: K, value: EndState[K] }>) {
            const { field, value } = action.payload;
            state[field] = value;
        },
    }
})

export const {setEndField} = endSlice.actions;
export default endSlice.reducer;

