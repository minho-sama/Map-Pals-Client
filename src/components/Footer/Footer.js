import React from 'react';
import {GoMarkGithub} from 'react-icons/go'

function Footer() {
  return (
    <footer className="text-sm p-1 text-center bg-fb-blue-light text-white">
        <a href = "https://github.com/minho-sama/Map-Pals-Client" 
          target = "_blank" rel="noreferrer"
          className = "flex gap-2 items-center justify-end px-2">
            <span className = "hover:underline">minh</span>
            <GoMarkGithub size = "18px" className = "text-gray-800"/>
        </a>
    </footer>
  );
}

export default Footer;
