import './style/style.css'
import { Link, Route, Routes } from 'react-router-dom';
import Login from './login'
import Chat from './chat'
import Register from './register'

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Chat />}></Route>
      <Route path={'/login'} element={<Login />}></Route>
      <Route path={'/register'} element={<Register />}></Route>
    </Routes>
  )
}

export default App;
