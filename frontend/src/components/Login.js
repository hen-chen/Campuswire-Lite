import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const loginUser = async () => {
    if (username && password) {
      try {
        const { data } = await axios.post('/account/login', { username, password })
        if (data === 'user login successful') nav('/')
        else window.alert('Error: could not find username or password')
      } catch (err) {
        window.alert('unable to login!')
      }
    } else {
      window.alert('Error: Invalid Username or password!')
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <p> Username: </p>
      <input onChange={e => setUsername(e.target.value)} />
      <p> Password: </p>
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="button" className="btn mx-1 btn-primary" onClick={loginUser}>Login</button>
      <Link to="/account/signup">Sign up if you do not have an account!</Link>
    </div>
  )
}

export default Login
