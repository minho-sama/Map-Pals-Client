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
        console.log(formData)
        reset()

        //If successful, TOASTIFy
    } 

            /*  ezek csak post requestbe mennek!
            {addLat} <br></br>
            {addLng} <br></br>
            {user?.username + user?._id} <br></br>
            {token} */

    return (
        <> 
        <figure className = "flex flex-col items-center mb-12">
            <figcaption className = "mb-5">Share your place with others!</figcaption>
            <img src = {colorMap} alt = "color-map" className = "w-1/2"/>
        </figure>

        <form className = "flex flex-col gap-10 w-full"
            encType="multipart/form-data"
            onSubmit = {handleSubmit(onSubmit)}>

            <div className = "flex flex-col">
              <input {...register('name',{required:true})} className = "border-2 border-fb-blue rounded-sm focus-outline-blue text-black p-1 text-sm" 
                    autoComplete = "off" placeHolder = "Place's name"/>
                  {errors.name?.type === 'required' && (
                      <span className = "form-err-msg mt-1">You must give a name to the place</span>
                  )}
            </div>
            <div className = "flex flex-col">
              <textarea {...register('description',{required:true})} placeHolder = "Place's description" 
                className = "border-2 border-fb-blue rounded-sm focus-outline-blue text-black p-1 text-sm" rows = "4" style = {{"maxWidth": "100%", "maxHeight": "110px" }}/>
                  {errors.description?.type === 'required' && (
                      <span className = "form-err-msg mt-1">You must give a description to the place</span>
                  )}
            </div>
            <div className = "flex flex-col bg-gray-900 py-4 text-sm  p-4">
             <label className = "mb-2">Image URL of the place (optional):</label>
             <input {...register('image_url')} className = "border-2 border-fb-blue rounded-sm focus-outline-blue text-black p-1 text-sm"/>
            </div>
            <button className = "text-green-400 animate-pulse">Add Place</button>
            
        </form>
        </>
    )
}

export default AddMarkerForm
