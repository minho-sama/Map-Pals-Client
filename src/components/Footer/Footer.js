import React from 'react';
import {AiFillGithub} from 'react-icons/ai'

function Footer() {
  return (
    <footer className="text-sm p-1 text-center bg-fb-blue-light text-white">
        <a href = "https://github.com/minho-sama/Map-Pals-Client" 
          target = "_blank" rel="noreferrer"
          className = "flex gap-2 items-center justify-end px-2">
            <span className = "hover:underline">minh</span>
            <AiFillGithub size = "20px" className = "text-yellow-400"/>
        </a>
    </footer>
  );
}

export default Footer;
