import React from 'react'
import { AuthProvider } from "./context/AuthContext";
import './App.css'
import TestAuth from './TestAuth'

const App = () => {
  return (
    <div className='app-container'>
      <AuthProvider>
        <TestAuth/>
      </AuthProvider>
      
    </div>
  )
}

export default App