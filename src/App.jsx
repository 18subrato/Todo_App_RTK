import React from 'react'
import AddTodo from './components/AddTodo'
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <div>
      <Toaster/>
        <AddTodo/>
    </div>
  )
}

export default App
