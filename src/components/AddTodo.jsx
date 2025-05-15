import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask } from '../features/todos/todoSlice'
import Todo from './Todo';
import toast from 'react-hot-toast';
import { RiCalendarTodoLine } from "react-icons/ri";
const AddTodo = () => {
  
  const inputRef = useRef('');
  const [updateTodo,setUpdateTodo] = useState({update:false,id:null});
  const dispatch = useDispatch();
  const todos = useSelector(state=>state.todos)

  if(updateTodo.update == true){
    inputRef.current.focus();
  }
  function handleFormSubmit(e) {
    e.preventDefault();

    if(inputRef.current.value == ''){
      toast.error('Write Something');
      return;
    }

    if(updateTodo.update == false){
      dispatch(addTask(inputRef.current.value));
      inputRef.current.value = '';
      toast.success('Task Added');
      return;
    }

    if(updateTodo.update == true){
      let obj = {
        id: updateTodo.id,
        task: inputRef.current.value
      }
      dispatch(updateTask(obj));
      inputRef.current.value = '';
      toast.success('Task Updated');
      setUpdateTodo({update: false, id:null});
    }
  }

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col min-h-[550px] rounded-xl p-3'>
      <div className='items-center flex mt-10 gap-2'>
        <h1 className='text-4xl font-semibold'>TODO <span className='text-orange-500 underline'>APP</span></h1>
        <RiCalendarTodoLine  className='w-8 h-8 mt-2 ml-4' />
      </div>
      
      <div>
        <form onSubmit={handleFormSubmit} className='mt-7 flex items-center bg-gray-200 rounded-full my-7 '>
          <input ref={inputRef} className='bg-transparent bottom-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder={updateTodo.update == false ? 'Add Task':'Update Task'} />
          <button className='border-none rounded-full bg-orange-500 w-32 h-14 text-white text-lg font-medium cursor-pointer'>{updateTodo.update == false ? 'Add+':'Update'}</button>
        </form>
      </div>
      <div className='mx-2'>
        { todos.map((item)=>{
            return <Todo  key={item.id} task={item.task} isComplete={item.isComplete} id={item.id} inputRef={inputRef} setUpdateTodo={setUpdateTodo}
            />
        })}      
     </div>
    </div>
  )
}

export default AddTodo
