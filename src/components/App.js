import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'
import Dashboard from './Dashboard/DashBoard'

function App() {
  return (
    <div className="h-screen flex flex-col bg-red-800">

      <Navbar/>

      <Dashboard/>

      <Footer/>
    </div>
  );
}

export default App;
