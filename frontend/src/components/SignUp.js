import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const nav = useNavigate()

  const createUser = async () => {
    if (username && password) {
      try {
        const { data } = await axios.post('/account/signup', { username, password })
        if (data === 'User created') nav('/')
        else window.alert('error')
      } catch (err) {
        window.alert('unable to sign up!')
      }
    } else {
      window.alert('Invalid Username or password!')
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      <p> Username: </p>
      <input onChange={e => setUsername(e.target.value)} />
      <p> Password: </p>
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="button" className="btn mx-1 btn-primary" onClick={createUser}>Sign Up</button>
      <Link to="/account/login">Log in here!</Link>
    </>
  )
}

export default SignUp
