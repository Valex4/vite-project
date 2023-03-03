import { useState } from 'react'
import './App.css'
import FormRegisterGas from './pages/FormRegisterGas'
import { GAsContextProvider } from './contexto/GasContext'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import TableDataGas from './pages/TableDataGas'

function App() {
 

  return (
    <GAsContextProvider>
    <Routes>
      
     
      <Route path='/' element={<TableDataGas/>} />
      <Route path='/registro' element={<FormRegisterGas/>} />

     
    
    </Routes>
    </GAsContextProvider>
  )
}

export default App


