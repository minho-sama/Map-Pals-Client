import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory} from "react-router-dom";

function Signup() {
    const {register, handleSubmit, formState: { errors }} = useForm();

    const [errUsername, setErrUsername] = useState("")
    const [errPsw, setErrPsw] = useState("")

    let history = useHistory()

    const onSubmit = (formData) => {
        fetch('http://localhost:3000/signup', {
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
                setTimeout(() => {
                    setErrUsername("")
                    setErrPsw("")
                }, 3000)
            } else{
                //successful signup
                history.push({
                    pathname: '/login',
                    state: { 
                        showNotification: true,
                        username: data.user.username,
                    }
                });
            }
        })
      };

    //mingLength: 3 (username es password is!)
    return (
    <section className="w-full h-full flex justify-center bg-gray-100">
      <form className="bg-white flex flex-col p-5 self-center w-4/5 md:w-2/5 lg:w-3/10 rounded-sm shadow-md min-h-3/4 items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className = "text-center text-xl mb-5">Join to MapPals</h1>
        <div className = "flex flex-col my-2 w-full items-center">
            <input  className="form-input-field focus-outline-blue" 
                placeholder = "Create Username"
                {...register('username',{required: true, minLength:3})}/>
                    {errors.username?.type === 'required' && (
                        <span className="form-err-msg">username is required</span>
                    )}
                    {errors.username?.type === 'minLength' && (
                        <span className="form-err-msg">username must be at least 3 characters</span>
                    )}
                    {/*errors from server e.g. taken username */}
                    {errUsername.length > 0 && <span className = "form-err-msg">{errUsername}</span>}
        </div>
        <div className = "flex flex-col my-2 w-full items-center">
            <input type="password" autoComplete="off" placeholder = "Create Password" className = "form-input-field focus-outline-blue"
            {...register('password', {required: true, minLength:3})}/>
                {errors.password?.type === 'required' && (
                    <span className="form-err-msg">password is required</span>
                )}
                {errors.password?.type === 'minLength' && (
                    <span className="form-err-msg">password must be at least 3 characters</span>
                )}
                {errPsw.length > 0 && <span className = "form-err-msg">{errPsw}</span>}
        </div>
        <div className = "flex flex-col my-2 w-full items-center focus-outline-blue">
            <input  autoComplete="off" className = "form-input-field" placeholder = "Profile Image (OPTIONAL)"
            {...register('imgUrl')}/>
        </div>
        <button className = "bg-green-custom mt-3 text-white w-1/2 p-3 rounded-sm font-sm text-lg shadow-md transition hover:bg-green-custom-darker">
          Sign Up
          </button>
      </form>
    </section>
    )
}

export default Signup
