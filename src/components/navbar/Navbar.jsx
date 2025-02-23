import React, { useState } from 'react'
import Logo from "../../assets/logo.png"
import "./navbar.css"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../redux/userSlice"
import { removeAll } from "../../redux/favoriteSlice"
import { removeAllCart } from "../../redux/cartSlice"
import { useNavigate } from "react-router-dom"


export default function Navbar() {
  const [searched, setSearched] = useState("")

  const user = useSelector(store => store.user)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    dispatch(removeAll())
    dispatch(removeAllCart())
    window.location.replace("/")
  }

  return (
    <div className='navbar'>
      <a href="/">
        <img src={Logo} alt="navbar logo" className='navbar-logo' />
      </a>
      <form className='navbar-form' onSubmit={(e) => {
        e.preventDefault()
        navigate(`/searched?search=${searched}`)
      }}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input onChange={(e) => setSearched(e.target.value)} type="text" placeholder='Qidirish' />
      </form>
      <div className='navbar-icons'>
        {
          user?.user?.isAdmin && (
            <a href="/newbook">
              <i className="navbar-icon fa-solid fa-plus"></i>
            </a>
          )
        }
        <i onClick={() => {
          window.location.replace("/favorite")
        }} className="navbar-icon fa-regular fa-heart"></i>
        <a href="/checkout">
          <i className="navbar-icon fa-solid fa-cart-shopping"></i>
        </a>
        <i onClick={handleLogout} className="navbar-icon fa-solid fa-arrow-right-from-bracket"></i>
      </div>
    </div>
  )
}
