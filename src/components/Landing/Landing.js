import React from 'react';
import { Link } from 'react-router-dom';
import Earth from '../../assets/worldwide.svg'
import {FaReact, FaNodeJs} from 'react-icons/fa'
import {SiLeaflet, SiTailwindcss, SiMongodb} from 'react-icons/si'
import Preview from '../../assets/mvc.gif'

const emoji = require('emoji-dictionary');

function Landing() {
  return (
    <article className="w-full h-max bg-gray-800 text-white tracking-wide flex flex-col flex-grow">
      <section className="w-full flex flex-col items-center justify-center gap-8 my-12 md:my-auto md:px-7 h-3/5" style = {{'maxHeight':'280px'}}>
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-fb-blue-light">MapPals</span> !
        </h1>
        <div className="text-center">
          <p className = 'font-bold text-lg'>
            MapPals is a community where you can share your favorite places
            with your friends
          </p>
          <p className="text-sm margin-t-3 md:margin-0 hidden md:block">
            <Link to="/signup" className="text-green-custom transition hover:text-green-custom-darker">
              Sign up
            </Link>
            , or If you already have an account{' '}
            <Link to="/login" className="text-green-custom transition hover:text-green-custom-darker">
              Log in here
            </Link>
            </p>
        </div>
      </section>
      <section className = 'w-full flex flex-col md:flex-row mb-10 border-t-2 border-white md:border-t-0'>
         <div className = "w-full md:w-1/2 p-2 pl-7 flex flex-col items-center">
          <h1 className = "text-fb-blue-light font-bold">Mark whatever places you want</h1>
          <ul className = "ml-4 text-sm child list-items-margin border-l-2 border-white p-3">
            <li>...{emoji.getUnicode(':spaghetti:')} a great place to eat out </li>
            <li>...{emoji.getUnicode(':bike:')} an exciting cycling route</li>
            <li>...{emoji.getUnicode(':coffee:')}{emoji.getUnicode(':book:')} a quiet coffee shop to study</li>
            <li>...{emoji.getUnicode(':beers:')} your favorite spot to meet with your friends</li>
            <li>...{emoji.getUnicode(':gem:')} a hidden gem no one knows about</li>
            <li>...{emoji.getUnicode(':dragon_face:')} an area where there are lots of rare Pokemons</li>
            <li>...{emoji.getUnicode(':no_entry_sign:')} or a place people should avoid</li>
          </ul>
          <h2 className = "ml-5 text-fb-blue-light">really, anything</h2>
         </div>
         <div className = "w-full md:w-1/2 p-2 flex justify-center md:justify-start">
            <img src = {Preview} alt = "preview" className = 'w-full md:w-2/3 rounded-sm shadow-lg border-2 border-white'/>
         </div>
      </section>
      <section className = "w-full py-2 mb-2">
        <h1 className = "text-center text-sm mb-2">Made with:</h1>
        <ul className = "flex tech-logo-list text-3xl">
          <li><SiTailwindcss style = {{'color':'#40c9ed'}}/></li>
          <li><SiLeaflet style = {{'color':'#61BA9E'}}/></li>
          <li><FaReact style = {{'color':'#61DBFB'}}/></li>
          <li><FaNodeJs style = {{'color':"#68A063"}}/></li>
          <li><SiMongodb style = {{'color':"#589636"}}/></li>
        </ul>
      </section>
    </article>
  );
}

export default Landing;
