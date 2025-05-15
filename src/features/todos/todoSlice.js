import { createSlice } from "@reduxjs/toolkit"

function getTodos() {
    try {
        const stored = localStorage.getItem('todos');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Error reading todos from localStorage", e);
        return [];
    }
}

const initialState = {
    todos: getTodos()
}
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTask: (state,action)=>{
           let eachTodo = {
            id: Date.now(),
            task: action.payload,
            isComplete: false
           }
           state.todos.push(eachTodo)
           localStorage.setItem('todos',JSON.stringify(state.todos));
        },

        removeTodo: (state,action)=>{
            state.todos = state.todos.filter((item)=> item.id != action.payload);
            localStorage.setItem('todos',JSON.stringify(state.todos));
        },

        toggle: (state,action)=>{
            const findTodo = state.todos.find((item)=>item.id == action.payload);
            if(findTodo){
                findTodo.isComplete = findTodo.isComplete == true ? false : true;
            }
            localStorage.setItem('todos',JSON.stringify(state.todos));
        },

        updateTask: (state,action)=>{
            const updateTodo = state.todos.find((item)=>item.id == action.payload.id);
            if(updateTodo){
                updateTodo.task = action.payload.task;
            };
            localStorage.setItem('todos',JSON.stringify(state.todos));
        }
    }
})


export const {addTask, removeTodo, toggle, updateTask} = todoSlice.actions 

export default todoSlice.reducer