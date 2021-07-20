import React from 'react';

function Sidebar({currentPlace}) {

  return (
    <div className="w-full h-1/5 md:w-1/4 md:h-full p-2">
      <h2>sidebar stuff</h2>
        {
          JSON.stringify(currentPlace) === '{}' ? 
          <h1>Click on a marker!</h1> :
          <>
          <h3>{currentPlace.name}</h3>
          <p>{currentPlace.likes}</p>
          </>
                    
        }
    </div>
  );
}

export default Sidebar;
