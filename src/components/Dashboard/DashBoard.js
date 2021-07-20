import React from 'react';
import MainMap from '../Map/Map';
import Sidebar from '../Sidebar/Sidebar';

function DashBoard() {

    //ITT LESZ EGY CSOMÓ KÖZÖS STATE!

  return (
      <article className="flex-grow md:flex">
        <Sidebar />

        <MainMap />
      </article>
  );
}

export default DashBoard;
