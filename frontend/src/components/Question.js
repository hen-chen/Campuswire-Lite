import React, { useState } from 'react'
import axios from 'axios'

const Question = ({ question, logged }) => {
  const [answer, setAnswer] = useState('')

  const answerQ = async q => {
    const { _id } = q
    try {
      const { data } = await axios.post('/api/questions/answer', { _id, answer })
      if (data === 'Question answered') {
        setAnswer('')
      }
    } catch (err) {
      window.alert('Error: answerQ')
    }
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          Question:
          {question.questionText}
          <br />
          Author:
          {question.author}
          <br />
          Answer:
          {question.answer}
          <br />
          {logged && (
            <div className="container">
              <h4> Answer the question: </h4>
              <input onChange={e => setAnswer(e.target.value)} placeholder="Write answer..." />
              <br />
              <button type="button" className="btn mx-1 btn-primary" onClick={() => answerQ(question)}> Submit Answer! </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Question
