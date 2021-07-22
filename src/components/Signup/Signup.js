import React, {useState} from 'react';
import { set, useForm } from 'react-hook-form';
import { useHistory, Redirect } from "react-router-dom";

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
                console.log('successful signup!')
                history.push({
                    pathname: '/login',
                    state: { showNotification: true }
                });
            }
        })
      };

    //mingLength: 3 (username es password is!)
    return (
    <section className="w-full h-full flex justify-center">
      <form className="flex flex-col p-5 self-center w-4/5 md:w-2/5 lg:w-3/10 rounded-sm shadow-md min-h-3/4 justify-evenly"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className = "text-center">Join to MapPals</h1>
        <div className = "flex flex-col my-3">
            <label>Create Username:</label>
            <input  className="form-input-field" 
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
        <div className = "flex flex-col my-5">
            <label>Create Password:</label>
            <input type="password" autoComplete="off" className = "form-input-field"
            {...register('password', {required: true, minLength:3})}/>
                {errors.password?.type === 'required' && (
                    <span className="form-err-msg">password is required</span>
                )}
                {errors.password?.type === 'minLength' && (
                    <span className="form-err-msg">password must be at least 3 characters</span>
                )}
                {errPsw.length > 0 && <span className = "form-err-msg">{errPsw}</span>}
        </div>

        <button className = "bg-green-400 mt-3">sign up</button>
      </form>
    </section>
    )
}

export default Signup
