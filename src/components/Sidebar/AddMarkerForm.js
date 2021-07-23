import React, {useContext} from 'react'
import {UserContext, TokenContext} from '../App'
import {useForm} from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import colorMap from '../../assets/color-map.png'

function AddMarkerForm({addLat, addLng}) {

    const {user} = useContext(UserContext)
    const {token} = useContext(TokenContext)

    const {register, handleSubmit, formState: { errors }, reset} = useForm();
     
    const onSubmit = (formData) => {
        const newPlace = {
            user: user?._id,
            lat:addLat,
            lng: addLng,
            name: formData.name,
            description: formData.description,
            image_url: formData.image_url
        }

        //előbb auth headernélkü próbálni! (token)
        fetch('http://localhost:3000/marker/create', {
            method:'POST',
            headers: new Headers ({
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(newPlace)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.err){
                notifyError()
            } else{
                notifyAdded()
            }
        })
        reset()
    } 

    const notifyAdded = () => toast.success('Added Place successfully!', {
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });

    const notifyError = () => toast.error('An error occured, please try again', {
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

    return ( 
        <> 
        <ToastContainer  position = "top-center" autoClose = {3000} hideProgressBar newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
        <figure className = "flex flex-col items-center mb-12">
            <figcaption className = "mb-5">Share your place with others!</figcaption>
            <img src = {colorMap} alt = "color-map" className = "w-1/2"/>
        </figure>

        <form className = "flex flex-col gap-10 w-full"
            encType="multipart/form-data"
            onSubmit = {handleSubmit(onSubmit)}>

            <div className = "flex flex-col">
              <input {...register('name',{required:true})} className = "border-2 border-fb-blue rounded-sm focus-outline-blue text-black p-1 text-sm" 
                    autoComplete = "off" placeholder = "Place's name"/>
                  {errors.name?.type === 'required' && (
                      <span className = "form-err-msg mt-1">You must give a name to the place</span>
                  )}
            </div>
            <div className = "flex flex-col">
              <textarea {...register('description',{required:true})} placeholder = "Place's description" 
                className = "border-2 border-fb-blue rounded-sm focus-outline-blue text-black p-1 text-sm" rows = "4" style = {{"maxWidth": "100%", "maxHeight": "110px" }}/>
                  {errors.description?.type === 'required' && (
                      <span className = "form-err-msg mt-1">You must give a description to the place</span>
                  )}
            </div>
            <div className = "flex flex-col bg-gray-900 py-4 text-sm  p-4">
             <label className = "mb-2">Image URL of the place (optional):</label>
             <input {...register('image_url')} className = "border-2 border-fb-blue rounded-sm focus-outline-blue text-black p-1 text-sm" autoComplete = "off"/>
            </div>
            <button className = "text-green-400 animate-pulse">Add Place</button>
             
        </form>
        </>
    )
}

export default AddMarkerForm
