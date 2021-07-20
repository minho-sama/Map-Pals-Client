import React, {useState} from 'react';
import MainMap from '../Map/MainMap';
import Sidebar from '../Sidebar/Sidebar';

function DashBoard() { 

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
        "coords": [47.46127, 19.1516761],
        "likes": 2
      }
    ]

  return (
      <article className="flex-grow md:flex">
        <Sidebar testData = {testData} currentPlace = {currentPlace}/>

        <MainMap testData = {testData} setCurrentPlace={setCurrentPlace}/>
      </article>
  );
}

export default DashBoard;
