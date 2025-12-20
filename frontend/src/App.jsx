import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import './css/App.css'

function App() {

  return (
    <main>
      <Routes> 
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </main>
  )
}

export default App
