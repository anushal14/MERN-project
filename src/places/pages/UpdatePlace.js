import React from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import './PlaceForm.css'

const DUMMY_PLACES = [{
    id: 'p1',
    title: "Infopark Kochi",
    description: "Information technology park situated in the city of Kochi, Kerala, India",
    imageURL: "https://infopark.in/assets/images/slider/homeBanner2.jpg",
    address: "Phase 1, Info Road, Near Tapasya Block Kakkanad, Kochi, Kerala 682042",
    location: {
        lat: 10.0115718,
        lng: 76.3599615
    },
    creator: 'u1'
}, {
    id: 'p2',
    title: "Infopark Kochi",
    description: "Information technology park situated in the city of Kochi, Kerala, India",
    imageURL: "https://infopark.in/assets/images/slider/homeBanner2.jpg",
    address: "Phase 1, Info Road, Near Tapasya Block Kakkanad, Kochi, Kerala 682042",
    location: {
        lat: 10.0115718,
        lng: 76.3599615
    },
    creator: 'u2'
}
]

const UpdatePlace = () => {
    const placeId = useParams().placeId;

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    const [formState, InputHandler] = useForm({
        title: {
            value: identifiedPlace.title,
            isValid: true
        },
        description:{
            value: identifiedPlace.description,
            isValid: true
        },
        address:{
            value: identifiedPlace.address,
            isValid: true
        }
    }, true)

    const placeUpdateSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs)
    }

    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Couldn't find places</h2>
            </div>)
    }
    return <form onSubmit={placeUpdateSubmitHandler} className="place-form">
        <Input
            element="input"
            id="title"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a valid title"
            label="Title"
            value={formState.inputs.title.value}
            valid={formState.inputs.title.isValid}
            onInput={InputHandler}
        />
        <Input
            element="textarea"
            id="description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="please enter a valid description (atleast 5 characters)"
            label="Description"
            value={formState.inputs.description.value}
            valid={formState.inputs.description.isValid}
            onInput={InputHandler}
        />
        <Input
            element="input"
            id="address"
            type="text"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="please enter a valid address"
            label="Address"
            value={formState.inputs.address.value}
            valid={formState.inputs.address.isValid}
            onInput={InputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>Update</Button>
    </form>

}

export default UpdatePlace;