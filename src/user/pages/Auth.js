import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import './Auth.css'

const Auth = () => {
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [formState, inputHandler,setFormData] = useForm({
        email: {
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    }, false)

    const authSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs)
    }

    const switchModeHandler = () => {
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name:undefined
            },formState.inputs.email.isValid && formState.inputs.password.isValid)
        }else{
            setFormData({
                ...formState.inputs,
                name:{
                    value:'',
                    isValid:false
                }
            },false)
        }
        setIsLoginMode(prevMode=>!prevMode)
    }

    return (<Card className="authentication">
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
            <Button type="submit" disabled={!formState.isValid}>{isLoginMode?'Login':'Sign Up'}</Button>
        </form>
        <Button inverse onClick={switchModeHandler}>Switch to {isLoginMode?'Sign Up':'Login'}</Button>
    </Card>
    )
}

export default Auth;