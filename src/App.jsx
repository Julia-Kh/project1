import { useState } from 'react'
// import './App.css'
import PrimarySearchAppBar from './components/Header'
import { goods } from './goods';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <PrimarySearchAppBar/>
    </>
  )
}

export default App
