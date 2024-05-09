// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { Task } from "../todo-list/todo-list";

// interface taskState {
//     tasks: Task[]
// }

// const initialState: taskState = {
//     tasks: [],
// }

// export const taskSlice = createSlice({
//     name: 'tasks',
//     initialState,
//     reducers: {
//         addTask: (state, action: PayloadAction<Task>) => {
//             state.tasks.push(action.payload)
//         },
//         removeTask: (state, action: PayloadAction<string>) => {
//             state.tasks = state.tasks.filter(t => t.id !== action.payload)
//         }
//     }
// })

// export const {addTask, removeTask} = taskSlice.actions;
// export default taskSlice.reducer;