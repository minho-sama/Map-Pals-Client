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

  let history = useHistory()
  const location = useLocation(); //props from Signup form

  useEffect(() => {
    setShowNotification(location.state?.showNotification)
  }, [location]);

  const notify = () => toast.success('Signed up successfully!', {
    position: "top-center",
    autoClose: 5000,
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
    })
  };

  return (
    <section className="w-full h-full flex justify-center bg-gray-100">

      <ToastContainer
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />

      <form className="flex flex-col items-center p-5 self-center w-4/5 md:w-2/5 lg:w-3/10 rounded-md shadow-md min-h-3/4 justify-center bg-white"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className = "text-center mb-12 text-xl">Login to MapPals</h1>
        <div className = "flex flex-col my-3 w-full items-center">
            <input className="form-input-field focus-outline-blue" defaultValue = {location.state?.username} placeholder = "Username"
                {...register('username',{required: true,})}/>
                    {errors.username?.type === 'required' && (
                    <span className="form-err-msg">username is required</span>
                    )}
                    {errUsername.length > 0 && <span className = "form-err-msg">{errUsername}</span>}
        </div>
        <div className = "flex flex-col my-5 w-full items-center">
            <input type="password" autoComplete="off" className = "form-input-field focus-outline-blue" placeholder = "Password"
            {...register('password', {required: true})}/>
                {errors.password?.type === 'required' && (
                <span className="form-err-msg">password is required</span>
                )}
                {errPsw.length > 0 && <span className = "form-err-msg">{errPsw}</span>}
        </div>

         <button className = "bg-green-custom mt-3 text-white w-1/2 p-3 rounded-sm font-sm text-xl shadow-md transition hover:bg-green-custom-darker" >
          Login
          </button>
      </form>
    </section>
  );
}

export default Login;
