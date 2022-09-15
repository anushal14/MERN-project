import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom'

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

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
        }
    }, false)

    const navigate = useNavigate();

    const placeSubmitHandler = async event => {
        event.preventDefault()
        try{
            await sendRequest('http://localhost:5000/api/places','POST',JSON.stringify({
                title:formState.inputs.title.value,
                description:formState.inputs.description.value,
                address:formState.inputs.address.value,
                creator:auth.userId
            }),
            {'Content-Type':'application/json'}
            );
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
        <Button type="submit" disabled={!formState.isValid}>Add Place</Button>
    </form>
    </>)
}

export default NewPlace;