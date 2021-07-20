import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'
import Dashboard from './Dashboard/DashBoard'

function App() {
  return (
    <div className="h-screen flex flex-col font-custom">

      <Navbar/>

      <Dashboard/>

      <Footer/>
    </div>
  );
}

export default App;
