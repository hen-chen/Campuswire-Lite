import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Question from './Question'

const Home = () => {
  const [logged, setLogged] = useState(false)
  const [username, setUsername] = useState('')
  const [newQuestion, setNewQuestion] = useState(false)
  const [qText, setQText] = useState('')
  const [questions, setQuestions] = useState([])
  const nav = useNavigate()

  const logout = async () => {
    try {
      const { data } = await axios.post('/account/logout', { username })
      if (data === 'user logged out') {
        nav('/account/login')
        setUsername('')
        setLogged(false)
      } else {
        window.alert('User not logged out successfully')
      }
    } catch (err) {
      window.alert('Error: logout')
    }
  }

  const loggedUser = async () => {
    try {
      const { data } = await axios.post('/account/loggedin')
      if (data !== '' && data !== undefined) {
        setUsername(data)
        setLogged(true)
      }
    } catch (err) {
      window.alert('Error: loggedUser')
    }
  }

  // ============ Questions ============
  const addQ = async () => {
    try {
      const { data } = await axios.post('/api/questions/add', { questionText: qText, answer: '' })
      if (data === 'Question added') {
        setNewQuestion(false)
        setQText('')
      }
    } catch (err) {
      window.alert('Error: addQ')
    }
  }

  const listQ = async () => {
    try {
      const { data } = await axios.get('/api/questions')
      setQuestions(data)
    } catch (err) {
      window.alert('Error: listQ')
    }
  }

  useEffect(async () => {
    loggedUser()
    const intervalID = setInterval(() => {
      listQ()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <div className="container">
      <h1> Campuswire LITE </h1>
      <hr />
      {logged && (
        <div className="page-header">
          <h2>
            Welcome
            {username}
          </h2>
          <button type="button" className="btn float-right btn-danger" onClick={logout}> Logout </button>
          <br />
          <button type="button" className="btn mx-1 btn-primary" onClick={() => setNewQuestion(true)}> Add a new Question! </button>
        </div>
      )}
      {!logged && (
        <Link to="/account/login"> Log in to submit a question </Link>
      )}
      {newQuestion && logged && (
        <div className="container">
          <h4> New Question: </h4>
          <input onChange={e => setQText(e.target.value)} placeholder="Write question here" />
          <br />
          <button type="button" className="btn mx-1 btn-primary" onClick={addQ}> Submit Question! </button>
          <button
            type="button"
            className="btn mx-1 btn-danger"
            onClick={() => {
              setNewQuestion(false)
              setQText('')
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <h3> Questions:</h3>
      <hr />
      {questions.map(q => (
        <div key={q._id}>
          <Question question={q} logged={logged} />
        </div>
      ))}
    </div>
  )
}

export default Home
