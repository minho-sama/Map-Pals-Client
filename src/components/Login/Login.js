import React, {useState, useContext, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from "react-router-dom";
import {UserContext, TokenContext} from '../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const {register, handleSubmit, formState: { errors }} = useForm();

  const [errUsername, setErrUsername] = useState("")
  const [errPsw, setErrPsw] = useState("")
  const [showNotification, setShowNotification] = useState(false)

  const [preUsername, setPreUsername] = useState("")

  let history = useHistory()
  const location = useLocation(); //props from Signup form

  useEffect(() => {
    console.log(location?.pathname)
    setShowNotification(location.state?.showNotification)
    setPreUsername(location.state?.username)
  }, [location]);

  const notify = () => toast.success('Signed up successfully!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  useEffect(() => {
    if(showNotification){
        notify()
    }
  }, [showNotification])

  const {addUser} = useContext(UserContext)
  const {addToken} = useContext(TokenContext)

  const onSubmit = (formData) => {
    fetch('http://localhost:3000/login', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        if(data.errors){
            const {username, password} = data.errors
            setErrUsername(username)
            setErrPsw(password)
            console.log(errPsw, errUsername)
        }else{
            addToken(data.token)
            addUser(data.user)
            history.push('/map')
        }
        //csinálni user contextet App.js-ben, sikeres login után populatelni
            //frissites után nem tűnik el a userContext? ha igen, akkor useEffect-el mindig lekérni!
            //ha az is fos akk localStorage-ba menteni, és úgy useEffect-elni
        //tokent localStoragebe lementeni
        //ha successfull login akkor redirect to /map!
        //consitional rendering (based on userContext duh)
        // /login paget is protectelni ha már be van jelentkezve!
        //protectelni react route-ot (map) ha valaki url-be ír! 
            // csekkolni a userContextet -> ha nincsen akkor return <Redirect to = '/login'/>

        //lopni odin-book projektekből megoldást ...

        //UJ TERV: app.js-ben useContext: user, setUser
            //login.js-ben setUser sikeres login után
                //app.js useEffect(amikor változik a user, setItem('user', JSON.tringify(user)))
                    //navbar.js a useContext-ből kapja a usert, NEM a loc.storageból!
                     //így üres usert fog settelni minden frissitesnel -> consitionally settelni!
                        //eehez lehet h kell netninja: https://www.youtube.com/watch?v=SOnMln3W0U8
    })
  };

  return (
    <section className="w-full h-full flex justify-center bg-gray-800">

      <ToastContainer
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />

      <form className="flex flex-col p-5 self-center w-4/5 md:w-2/5 lg:w-3/10 rounded-sm shadow-lg min-h-3/4 justify-center bg-white"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className = "text-center mb-12 text-xl">Login to MapPals</h1>
        <div className = "flex flex-col my-3">
            <input className="form-input-field" defaultValue = {preUsername} placeholder = "Username"
                {...register('username',{required: true,})}/>
                    {errors.username?.type === 'required' && (
                    <span className="form-err-msg">username is required</span>
                    )}
                    {errUsername.length > 0 && <span className = "form-err-msg">{errUsername}</span>}
        </div>
        <div className = "flex flex-col my-5">
            <input type="password" autoComplete="off" className = "form-input-field" placeholder = "Password"
            {...register('password', {required: true})}/>
                {errors.password?.type === 'required' && (
                <span className="form-err-msg">password is required</span>
                )}
                {errPsw.length > 0 && <span className = "form-err-msg">{errPsw}</span>}
        </div>

        <button className = "bg-green-400 mt-3">log in</button>
      </form>
    </section>
  );
}

export default Login;
