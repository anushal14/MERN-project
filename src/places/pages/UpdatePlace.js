import React,{useEffect, useState,useContext} from "react";
import { useParams,useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import './PlaceForm.css'
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from '../../shared/context/auth-context';


const UpdatePlace = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [loadedPlace,setLoadedPlace] = useState()
    const placeId = useParams().placeId;

    const [formState, InputHandler,setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description:{
            value: '',
            isValid: false
        }
    }, false)

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(()=>{
        const fetchPlace = async () =>{
            try{
                const response = await sendRequest(`http://localhost:5000/api/places/${placeId}`)
                
                setLoadedPlace(response.place);
                setFormData({
                    title: {
                        value: response.place.title,
                        isValid: true
                    },
                    description:{
                        value: response.place.description,
                        isValid: true
                    }
                    
                },true)
                
            }catch(err){

            }
        }
        fetchPlace();
    },[sendRequest,placeId,setFormData])


    const placeUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
          await sendRequest(
            `http://localhost:5000/api/places/${placeId}`,
            'PATCH',
            JSON.stringify({
              title: formState.inputs.title.value,
              description: formState.inputs.description.value
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          navigate('/' + auth.userId + '/places');
        } catch (err) {}
      };
    
    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner asOverlay/>
            </div>)
    }

    if (!loadedPlace && !error) {
        return (
            <div className="center">
                <Card>
                <h2>Couldn't find places</h2>
                </Card>
            </div>)
    }

   

    return (
     <>
     <ErrorModal error={error} onClear={clearError}/>
     {!isLoading && loadedPlace && <form onSubmit={placeUpdateSubmitHandler} className="place-form">
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

        <Button type="submit" disabled={!formState.isValid}>Update</Button>
    </form>}
    </>)

}

export default UpdatePlace;