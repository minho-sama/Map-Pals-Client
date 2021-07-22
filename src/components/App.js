import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import Dashboard from './Dashboard/DashBoard';
import Landing from './Landing/Landing';
import Login from './Login/Login'
import Signup from './Signup/Signup'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useUser from './useUser'
import useToken from './useToken'

export const UserContext = React.createContext()
export const TokenContext = React.createContext()

function App() {

  const {addUser, user, removeUser} = useUser()
  const {addToken, token, removeToken} = useToken()

  return (
    <Router>
      <TokenContext.Provider value={{addToken,token,removeToken}}>
       <UserContext.Provider value = {{addUser, user, removeUser}}>
        <article className="h-screen flex flex-col font-custom">
          <Navbar />
          <Switch>
            <Route exact path = "/">
              <Landing/>
            </Route>
            <Route path = "/signup">
              <Signup/>
            </Route>
            <Route path = "/login">
              <Login/>
            </Route>
            <Route path = "/map">
              <Dashboard />
            </Route>
          </Switch>
          <Footer />
        </article>
       </UserContext.Provider>
      </TokenContext.Provider>
    </Router>
  );
}

export default App;
