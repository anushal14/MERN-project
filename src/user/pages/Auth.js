import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import './Auth.css'

const Auth = () => {
    let navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
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
        setIsLoading(true)
        if (isLoginMode) {
            try {
            
                const response = await fetch('http://localhost:5000/api/users/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                  })
                });
        
                const responseData = await response.json();
                if(!response.ok){
                    throw new Error(responseData.message)
                }
                setIsLoading(false)
                console.log(responseData)
                auth.login()
                navigate('/');
              } catch (err) {
                console.log(err);
                setIsLoading(false)
                setError(err.message || 'Something went wrong')
              }   
        } else {
          try {
            
            const response = await fetch('http://localhost:5000/api/users/signup', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: formState.inputs.name.value,
                email: formState.inputs.email.value,
                password: formState.inputs.password.value
              })
            });
    
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message)
            }
            setIsLoading(false)
            auth.login()
            navigate('/');
          } catch (err) {
            console.log(err);
            setIsLoading(false)
            setError(err.message || 'Something went wrong')
          }
        }
    
        
        

    }

    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode)
    }
    const errorHandler = () =>{
        setError(null);
    }

    return (
    <>
    <ErrorModal error={error} onClear={errorHandler}/>
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
                validators={[VALIDATOR_MINLENGTH(5)]}
                onInput={inputHandler}
                errorText="please enter a valid Password,atleast 5 characters" />
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode ? 'Login' : 'Sign Up'}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>Switch to {isLoginMode ? 'Sign Up' : 'Login'}</Button>
    </Card>
    </>
    )
}

export default Auth;