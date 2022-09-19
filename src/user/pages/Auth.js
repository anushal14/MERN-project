import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from '../../shared/hooks/http-hook';
import './Auth.css'

const Auth = () => {
    let navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false)

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(formState.inputs)

        if (isLoginMode) {
            try {
              const responseData = await sendRequest(
                'http://localhost:5000/api/users/login',
                'POST',
                JSON.stringify({
                  email: formState.inputs.email.value,
                  password: formState.inputs.password.value
                }),
                {
                  'Content-Type': 'application/json'
                }
              );
              console.log(responseData.user)
              auth.login(responseData.userId,responseData.token);
              navigate('/');
            } catch (err) {}
          } else {
            try {
              const formData = new FormData();
              formData.append('email',formState.inputs.email.value);
              formData.append('name',formState.inputs.name.value);
              formData.append('password',formState.inputs.password.value);
              formData.append('image',formState.inputs.image.value);

                const responseData = await sendRequest(
                'http://localhost:5000/api/users/signup',
                'POST',
                formData
              );
      
              auth.login(responseData.userId,responseData.token);
              navigate('/');
            } catch (err) {}
          } 

    }

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
                image:undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                },
                image: {
                  value: null,
                  isValid: false
              }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }

    return (
    <>
    <ErrorModal error={error} onClear={clearError}/>
    <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay/>}
        <h2>Login required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="Name"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="please enter a valid Name" />
            )}
            {!isLoginMode && <ImageUpload center id="image" onInput={inputHandler} errorText="please provide an image"/>}
            <Input
                id="email"
                element="input"
                type="email"
                label="Email"
                validators={[VALIDATOR_EMAIL()]}
                onInput={inputHandler}
                errorText="please enter a valid email" />
            <Input
                id="password"
                element="input"
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                onInput={inputHandler}
                errorText="please enter a valid Password,atleast 6 characters" />
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'Login' : 'Sign Up'}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>Switch to {isLoginMode ? 'Sign Up' : 'Login'}</Button>
    </Card>
    </>
    )
}

export default Auth;