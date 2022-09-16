import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom'

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import './PlaceForm.css'



const NewPlace = () => {

    const auth = useContext(AuthContext);
    const {isLoading,error,sendRequest,clearError} = useHttpClient();

    const [formState,InputHandler] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        },
        address: {
            value: '',
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        }
    }, false)

    const navigate = useNavigate();

    const placeSubmitHandler = async event => {
        event.preventDefault()
        try{
            const formData = new FormData();
            formData.append('title',formState.inputs.title.value)
            formData.append('description',formState.inputs.description.value)
            formData.append('address',formState.inputs.address.value)
            formData.append('creator',auth.userId)
            formData.append('image',formState.inputs.image.value)
            await sendRequest('http://localhost:5000/api/places','POST',formData);
            navigate('/')
        }catch(err){

        }
        
    }
    return(
        <>
        <ErrorModal error={error} onClear={clearError}/>
        <form onSubmit={placeSubmitHandler} className="place-form">
            {isLoading && <LoadingSpinner asOverlay/>}
        <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={InputHandler}
            errorText="please enter a valid Title" />
        <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            onInput={InputHandler}
            errorText="please enter a valid description (atleast 5 characters)" />
        <Input
            id="address"
            element="input"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={InputHandler}
            errorText="please enter a valid address" />
            <ImageUpload center id="image" onInput={InputHandler} errorText="please provide an image"/>
        <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
    </form>
    </>)
}

export default NewPlace;