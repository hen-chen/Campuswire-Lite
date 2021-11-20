import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import axios from 'axios'

import SignUp from './components/SignUp'

const App = () => (
  <>
    {/* <h1>Your react app!</h1>
    <SignUp/> */}
    <Router>
      <div>
      <Switch>
        <Route exact path="">
          <h1> HOME </h1>
        </Route>
        <Route exact path="/account/signup">
          {/* <SignUp /> */}
          <Link to="/login"> Already have an account? Log in here!</Link>
        </Route>
        <Route exact path="/account/login">
          <h1> Login </h1>
        </Route>
      </Switch>
      </div>
    </Router>
  </>
)
export default App

export default App