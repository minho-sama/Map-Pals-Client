import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import Dashboard from './Dashboard/DashBoard';
import Landing from './Landing/Landing';
import Login from './Login/Login'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col font-custom">
        <Navbar />
        <Switch>
          <Route exact path = "/">
            <Landing/>
          </Route>
          <Route exact path = "/login">
            <Login/>
          </Route>
          <Route exact path = "/map">
            <Dashboard />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
