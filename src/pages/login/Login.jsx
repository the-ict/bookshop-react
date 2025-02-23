import React, { useEffect, useState } from 'react'
import "./login.css"
import Logo from "../../assets/logo.png"
import AuthImg from "../../assets/auth.png"
import axios from "axios"
import { host } from "../../constants/request"
import { useDispatch, useSelector } from "react-redux"
import { loginStart, loginSuccess, loginFailure } from "../../redux/userSlice"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

  useEffect(() => {
    if (user?.user) {
      window.location.replace("/")
    }
  }, [user])


  const handleLogin = async () => {
    dispatch(loginStart())
    try {
      const res = await axios.post(`${host}/api/auth/login`, {
        email,
        password
      })

      dispatch(loginSuccess(res.data))

      if (res.data) window.location.replace("/")

    } catch (error) {
      dispatch(loginFailure())
      console.log(error)
    }
  }

  return (
    <div className='login'>
      <img src={AuthImg} className='login-img' alt="AuthImg png" />
      <div className='login-form'>
        <div className="login-form__container">
          <div className='login-form__img'>
            <img src={Logo} alt="auth logo" className='login-form__logo' />
          </div>
          <div>
            <h3>Qaytib kelganingizdan xursandmiz!</h3>
            <h1>Hisobingizga kiring</h1>
          </div>
          <div className='login-form__inputs'>
            <label>E-mail</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text" placeholder='john@gmail.com' />
            <label>Parol</label>
            <input
              onChange={e => setPassword(e.target.value)}
              type="password" className='password-input' placeholder='John123' />
            <div className='login-remember'>
              <input type="checkbox" className='check-input' />
              <span>Meni eslab qol</span>
            </div>
          </div>
          <div className='login-form__buttons'>
            <button onClick={handleLogin} className='login-button'>Kirish</button>
            <button onClick={() => window.location.replace("/register")} className='login-registerButton'>Ro'yhatdan o'tish</button>
          </div>
        </div>
      </div>
    </div>
  )
}
