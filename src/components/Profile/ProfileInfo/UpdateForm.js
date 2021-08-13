import React from 'react'
import { useForm } from 'react-hook-form';

function UpdateForm({setIsUpdateMode, userFromServer, token, user, notifyError, refresfUserFS, setRefreshUserFS}) {
    const {register, handleSubmit, reset} = useForm();

    const updateProfile = (formData) => {
        const updatedInfos = {
            city: formData.city,
            bio: formData.bio,
            imgUrl:formData.imgUrl
        }

        fetch(`https://mappals.herokuapp.com/user/${user._id}/info`, {
            method: 'PATCH',
            headers: new Headers({
              Authorization: `token ${token}`,
              'Content-Type': 'application/json',
            }),
            body: JSON.stringify(updatedInfos),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.err) {
                notifyError();
              } else { 
                setIsUpdateMode(false)
                setRefreshUserFS(!refresfUserFS)
                localStorage.setItem('user', JSON.stringify(data))
              }
            });
    }
 
    return (  
      <form onSubmit = {handleSubmit(updateProfile)} className = "flex flex-col gap-5">
        <div className = "flex gap-4">
            <input className="blue-underline-input bg-gray-100 rounded-sm p-1 w-1/2" 
                defaultValue = {userFromServer.city} 
                placeholder = "Your City"
                autoComplete = "off"
                {...register('city')}/>
            <input className="blue-underline-input bg-gray-100 rounded-sm p-1 w-1/2" 
                defaultValue = {userFromServer.imgUrl} 
                placeholder = "Profil IMG url"
                autoComplete = "off"
                {...register('imgUrl')}/>
        </div>
        <textarea className="blue-underline-input bg-gray-100 rounded-sm p-1 w-full max-h-24" 
            defaultValue = {userFromServer.bio} 
            placeholder = "Tell something about yourself"
            autoComplete = "off"
            {...register('bio')}/>
        
        <div className = "flex gap-2 w-full justify-end">
          <div onClick = {() => {setIsUpdateMode(false);reset()}} 
               className = "cursor-pointer bg-red-500 text-white font-semibold p-1 rounded-sm text-sm">
              Cancel
          </div>
          <button className = "bg-fb-blue text-white font-semibold p-1 rounded-sm text-sm">
              Update
          </button>
        </div>
      </form>
    )
}

export default UpdateForm
