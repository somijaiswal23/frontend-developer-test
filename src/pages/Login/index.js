import React from 'react'
/***Custom Imports ***/
import './style.css'
import {MAIL, EXCLAMATION} from '../../icons'
import {Button} from '../../components'
import {isLoggedIn} from '../../utils/utils'
import httpRequest from '../../utils/httpRequest'
import {VALID_PASSWORD, CREDENTIAL_ERROR_MESSAGE, SERVER_ERROR_MESSAGE, SERVER_URL} from '../../constants'

 /***Constants ***/
const DEFAULT_FORM={
    email:'',
    password:''
}


/***Login Component  ***/
const Login = ({history}) =>{
     /***Form local states ***/
    const [formData, setFormData] = React.useState(DEFAULT_FORM)
    const [error, setError] = React.useState(null)
    React.useEffect(()=>{
        if(isLoggedIn()){
            history.push('/devices')
        }
    }, [history])
    /***Form Input change handler ***/
    const changeHandler = (event) =>{
        const {name, value} = event.target
        const updatedForm = {...formData, [name]: value}
        setFormData(updatedForm)
        setError(null)
    }
    /***Form submit handler ***/
    const submitHandler = (event)=>{
        event.preventDefault();
        const {email, password} = formData
        if(email && password === VALID_PASSWORD){
            setError(null)
            callServer(email, password)
        } else{
            setError(CREDENTIAL_ERROR_MESSAGE)
        } 
    }
    const callServer =(email, password)=>{
        const data = {
            email,
            password
        }
        httpRequest({method:'post', url:`${SERVER_URL}/login`, data}).then(response=>{
            const authToken = response.data
            localStorage.setItem('AUTH_TOKEN', authToken)
            history.push('/devices')
        }).catch(error=>{
            console.error(error);
            setError(SERVER_ERROR_MESSAGE)
        })
    }
    return (<div className="login__wrapper">

        <form className="text-center" onSubmit={submitHandler}>
            {error && <div className="error">{error}</div>}
            <header>Login</header>
            <div className="input__wrapper">
                <img src={MAIL} alt="Email input icon"/>
                <input type="text" onChange={changeHandler} name="email" placeholder="Email Address"/>
            </div>
            <div className="input__wrapper">
                <img src={EXCLAMATION} alt="Email input icon"/>
                <input type="password" onChange={changeHandler} name="password" placeholder="Password"/>
                
            </div>
            <Button label="LOG IN" className="btn-primary marginTop-16" type="submit"/>
        </form>

    </div>)
}

export default Login