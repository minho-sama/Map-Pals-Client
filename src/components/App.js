import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import Dashboard from './Dashboard/DashBoard';
import Landing from './Landing/Landing';
import Login from './Login/Login'
import Signup from './Signup/Signup'
import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import useUser from './customHooks/useUser'
import useToken from './customHooks/useToken'
import Friends from './Friends/Friends'
import ProfilePage from './Profile/ProfilePage'

export const UserContext = React.createContext()
export const TokenContext = React.createContext()

function App() {

  const {addUser, user, removeUser, setUser} = useUser()
  const {addToken, token, removeToken} = useToken()

  return (
    <Router>
      <TokenContext.Provider value={{addToken,token,removeToken}}>
       <UserContext.Provider value = {{addUser, user, removeUser, setUser}}>
        <article className="h-screen flex flex-col font-custom">
          <Navbar />
          <Switch>
            <Route exact path = {["/", "/Map-Pals-Client"]}>
              <Landing/>
            </Route>
            <Route path = {["/signup", "/Map-Pals-Client/signup"]} >
              <Signup/>
            </Route>
            <Route path = {["/login", "/Map-Pals-Client/login"]} >
              <Login/>
            </Route>
            <Route path = {["/map", "/Map-Pals-Client/map"]} >
              <Dashboard/>
            </Route>
            <Route path = {["/friends", "/Map-Pals-Client/friends"]} >
              <Friends/>
            </Route>
            <Route path = {["/profile/:id", "/Map-Pals-Client/profile/:id"]} >
              <ProfilePage/>
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
