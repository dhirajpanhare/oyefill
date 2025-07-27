import { useState } from 'react'
import './App.css'
 import Navbar from './components/Navbar'
 import { BrowserRouter, Routes, Route, Form } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import About from './pages/About'
import Logout from './components/Logout'
import AdminHome from './pages/AdminHome'
import ManageUsers from './pages/ManageUser'
import AddCategory from './pages/AddCategory'
import Alerts from './pages/Alerts'
import Contact from './pages/Contact'
import AddAlert from './pages/AddAlerts'
import ManageForms from './pages/ManageForms'
import Cat from './pages/cat'
import Forms from './pages/Forms'
import Messages from './pages/Messages'

 

function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>

          <Route path='about' element={<About />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/logout' element={<Logout />}></Route>
          <Route path='/adminhome' element={<AdminHome />}></Route>
          <Route path='/manageusers' element={<ManageUsers/>}></Route>
          <Route path='/addcategory' element={<AddCategory/>}></Route>
          <Route path='/alerts' element={<Alerts/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/addalert' element={<AddAlert/>}></Route>
          <Route path='/manageforms' element={<ManageForms/>}></Route>
          <Route path='/cat/:catName' element={<Cat/>}></Route>
          <Route path='/form' element={<Forms/>}></Route>
          <Route path='/messages' element={<Messages/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
