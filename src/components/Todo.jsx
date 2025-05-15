import React from 'react'
import { useDispatch } from 'react-redux'
import { removeTodo } from '../features/todos/todoSlice';
import { MdDeleteForever } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import {toggle} from '../features/todos/todoSlice.js'
import { RxUpdate } from "react-icons/rx";
import toast from 'react-hot-toast';
const Todo = ({ id, task, isComplete, setUpdateTodo}) => {
  const dispatch = useDispatch();
  
  function handleUpdate(id){
    setUpdateTodo({update:true,id})
  }

  

  return (
    <div className='flex items-center my-4 gap-2'>
      <div className='flex flex-1 items-center cursor-pointer'>
        {isComplete ? <FaCheck onClick={()=>dispatch(toggle(id))} className='text-green-500 w-6 h-6' /> : <ImCross onClick={()=>dispatch(toggle(id))} className='text-red-400 w-5 h-5' />}
        <p className={`text-slate-700 font-semibold ml-4 text-xl
         ${isComplete ? "line-through" : ""}`}>{task}</p>
      </div>
      <RxUpdate onClick={()=>handleUpdate(id)} className='w-5 h-5 cursor-pointer' />
      <MdDeleteForever onClick={()=>{dispatch(removeTodo(id)),toast.success('Deleted')}} className='w-7 h-7 text-red-500 cursor-pointer' />
    </div>
  )
}

export default Todo

