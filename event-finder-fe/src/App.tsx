

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import LoginPage from './components/LogReg/LoginPage';
import RegistrationPage from './components/LogReg/RegistrationPage';
import SingleEvent from './components/:id/Event/Event';
import Notifications from './components/sidebar-links/Notifications';
import SingleUser from './components/:id/User/User';
function App() {


  return (
    <div className='body'>
      <BrowserRouter>
        <Routes>
         <Route element={<Home/>} path="/home"></Route>
         <Route element={<LoginPage />} path="/" />
         <Route element={<SingleEvent />} path="/Event/:id" />
         <Route element={<SingleUser />} path="/User/:id" />
         <Route element={<Notifications/>} path="/Notifications"/>
         <Route element={<RegistrationPage/>} path="/register"></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
