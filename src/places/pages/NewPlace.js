import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'
import { useForm } from "../../shared/hooks/form-hook";
import './PlaceForm.css'



const NewPlace = () => {

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

    

    const placeSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }
    return <form onSubmit={placeSubmitHandler} className="place-form">
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
}

export default NewPlace;