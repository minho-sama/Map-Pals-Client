import React, {useState} from 'react';
import MainMap from '../Map/MainMap';
import Sidebar from '../Sidebar/Sidebar';

export const PlaceContext = React.createContext()

function Dashboard() { 
  const [currentPlace, setCurrentPlace] = useState({}) 

    //ITT LESZ EGY CSOMÓ KÖZÖS STATE!
    const testData = [
      {
        "name": "mcdonalds",
        "coords": [51.505, -0.09],
        "likes": 3
      },
      {
        "name": "burger king",
        "coords": [51.500, -0.05],
        "likes": 6
      },
      {
        "name": "pokegym",
        "coords": [47.45427, 19.1516761],
        "likes": 2
      }
    ]

  return (
      <article className="flex-grow md:flex">
        <PlaceContext.Provider value = {{currentPlace,setCurrentPlace, testData}}>
          <Sidebar/>
          <MainMap/>
        </PlaceContext.Provider> 
      </article>
  );
}

export default Dashboard