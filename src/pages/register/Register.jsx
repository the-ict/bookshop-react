import React, { useEffect, useState } from 'react'
import "./register.css"
import Logo from "../../assets/logo.png"
import AuthImg from "../../assets/auth.png"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { loginStart, loginSuccess, loginFailure } from "../../redux/userSlice"
import { host } from "../../constants/request"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const dispatch = useDispatch()

  const user = useSelector(store => store.user)


  useEffect(() => {
    if (user?.user) {
      window.location.replace("/")
    }
  }, [user])


  const handleRegister = async () => {

    dispatch(loginStart())
    try {
      const res = await axios.post(`${host}/api/auth/register`, {
        username,
        password,
        email
      })

      dispatch(loginSuccess(res.data))

      if (res.data) {
        window.location.replace("/")
      }
    } catch (error) {
      dispatch(loginFailure())
      console.log(error)
    }
  }

  return (
    <div className='register'>
      <img src={AuthImg} className='register-img' alt="AuthImg png" />
      <div className='register-form'>
        <div className="register-form__container">
          <div className='register-form__img'>
            <img src={Logo} alt="auth logo" className='register-form__logo' />
          </div>
          <div>
            <h3>Xush kelibsiz!</h3>
            <h1>Hisobingizni yarating</h1>
          </div>
          <div className='register-form__inputs'>
            <label>Username</label>
            <input
              type="text"
              placeholder='johndoe'
              onChange={(e) => setUsername(e.target.value)
              } />
            <label>E-mail</label>
            <input
              type="text"
              placeholder='john@gmail.com'
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Parol</label>
            <input
              type="password"
              className='password-input'
              placeholder='John123'
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='register-remember'>
              <input type="checkbox" className='check-input' />
              <span>Meni eslab qol</span>
            </div>
          </div>
          <div className='register-form__buttons'>
            <button
              onClick={handleRegister}
              className='register-registerButton'>Ro'yhatdan o'tish</button>
            <button
              onClick={() => window.location.replace("/login")}
              className='register-button'>Kirish</button>
          </div>
        </div>
      </div>
    </div>
  )
}
