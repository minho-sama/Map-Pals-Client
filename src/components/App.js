import Map from './Map/Map';
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'

function App() {
  return (
    <div className="h-screen flex flex-col bg-red-800">

      <Navbar/>

      <article 
        className="flex-grow md:flex">

        <Sidebar/>

        <Map />
      </article>

      <Footer/>
    </div>
  );
}

export default App;
