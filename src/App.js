import React from 'react'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import SingleBook from './pages/single/SingleBook'
import ViewAll from './pages/viewall/ViewAll'
import Checkout from './pages/checkout/Checkout'
import NewBook from './pages/newBook/NewBook'
import Favorite from './pages/favorite/Favorite'
import Searched from './pages/searched/Searched'
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/single/:id' element={<SingleBook />} />
        <Route path='/viewall' element={<ViewAll />} />
        <Route path='/newbook' element={<NewBook />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/searched' element={<Searched />} />
      </Routes>
    </BrowserRouter>
  )
}
