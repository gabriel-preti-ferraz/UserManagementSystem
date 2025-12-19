import './css/App.css'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <main>
      <Routes> 
        <Route path='/login' element={<Login />} />
      </Routes>
    </main>
  )
}

export default App
