import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [created, setCreated] = useState(false)

  // let history = useHistory()

  const createUser = async () => {
    if (username && password) {
      const { data } = await axios.post('/account/signup', { username, password })
      if (data === 'User created') {
        setCreated(true)
        // history.push('/')
      }
    } 
    else window.alert('Invalid username or password!')
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
    </>
  )
}

export default SignUp
