

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from './components/LogReg/LoginPage';
import RegistrationPage from './components/LogReg/RegistrationPage';
import SingleEvent from './components/:id/Event';
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route element={<Home/>} path="/home"></Route>
         <Route element={<LoginPage />} path="/" />
         <Route element={<SingleEvent />} path="/Event/:id" />
         <Route element={<RegistrationPage/>} path="/register"></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
