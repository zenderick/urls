import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import {useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";
import Title from "../components/Tiltle";
import Button from "../components/Button";

const Login = () => {

    const {loginUser} = useContext(UserContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, formState: { errors },setError}= useForm()

    const { required, patternEmail, minLength, validateTrim} = formValidate();


    const onSubmit = async({email, password}) => {
        try {
            setLoading(true)
            await loginUser(email, password)
            navigate('/')
        } catch (error) {
            const {code, message} = erroresFirebase(error.code)
            setError(code,{
                message
            });
        }
        finally{
            setLoading(false)
        }
    }
   

    return(
        <>
            <Title text="Login"/>
            <form onSubmit={handleSubmit(onSubmit)}>

                <FormInput
                    type="email" 
                    placeholder="Ingrese email"
                    {...register("email",{
                        required,
                        pattern: patternEmail
                    })}
                    label="Ingresa tu email"
                    error={errors.email}
                >
                    <FormError error={errors.email}/>
                </FormInput>

                <FormInput
                    type="password"
                    placeholder="Ingrese Password"  
                    {...register("password", {
                        minLength,
                        validate: validateTrim
                    })}
                    label="Ingresa tu password"
                    error={errors.password}

                >
                <FormError error={errors.password}/>
                </FormInput>
                <Button text="Login" type="sumbit" loading={loading}/>  
            </form>
        </>
    )
}

export default Login;