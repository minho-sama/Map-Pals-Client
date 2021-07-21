import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

function Login() {
  const {register, handleSubmit, formState: { errors }, reset} = useForm();

  const [errUsername, setErrUsername] = useState("")
  const [errPsw, setErrPsw] = useState("")

  let history = useHistory()

  const onSubmit = (formData) => {
    fetch('http://localhost:3000/login', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    }).then(res => res.json())
    .then(data => {
        if(data.errors){
            const {username, password} = data.errors
            setErrUsername(username)
            setErrPsw(password)
            console.log(errPsw, errUsername)
        }else{
            localStorage.setItem('token', data.token)
            history.push('/map')
        }
        //csinálni user contextet App.js-ben, sikeres login után populatelni
        //tokent localStoragebe lementeni
        //ha successfull login akkor redirect to /map!
        //consitional rendering (based on userContext duh)
        // /login paget is protectelni ha már be van jelentkezve!
        //protectelni react route-ot (map) ha valaki url-be ír! 
            // csekkolni a userContextet -> ha nincsen akkor retrun <Redirect to = '/login'/>
    })
  };

  return (
    <section className="w-full h-full flex justify-center">
      <form className="flex flex-col p-5 self-center w-4/5 md:w-2/5 lg:w-3/10 rounded-sm shadow-md min-h-3/4 justify-evenly"
        onSubmit={handleSubmit(onSubmit)}>
        <h1 className = "text-center">Join to MapPals</h1>
        <div className = "flex flex-col my-3">
            <label>Username:</label>
            <input  className="form-input-field" 
                {...register('username',{required: true,})}/>
                    {errors.username?.type === 'required' && (
                    <span className="form-err-msg">username is required</span>
                    )}
                    {errUsername.length > 0 && <span className = "form-err-msg">{errUsername}</span>}
        </div>
        <div className = "flex flex-col my-5">
            <label>Password:</label>
            <input type="password" autoComplete="off" className = "form-input-field"
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
