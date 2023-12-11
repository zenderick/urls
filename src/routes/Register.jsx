import { useContext, useState} from "react";
import { UserContext } from "../context/UserProvider";
import {useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import Title from "../components/Tiltle";
import Button from "../components/Button";

const Register = () => {

    const {register, handleSubmit, formState: { errors }, getValues, setError}= useForm()

    const { required, patternEmail, minLength, validateTrim, validateEquals} = formValidate();

    const {registerUser} = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async({email, password}) => {
        try {
            setLoading(true)
            await registerUser(email, password)
            navigate('/')
        } catch (error) {
            console.log(error.code)
            const {code, message} = erroresFirebase(error.code)
            setError(code,{
                message
            });
        }finally{
            setLoading(false)
        }
    }

   


  return (
    <>
        <Title text="Users Register" />
        <FormError error={errors.firebase}/>

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


            <FormInput
                type="password" 
                placeholder="Ingrese Password"  
                {...register("respassword", {
                    validate: validateEquals(getValues("password")),
                })}
                label="Repite tu password"
                error={errors.respassword}
            >
                <FormError error={errors.respassword}/>
            </FormInput>
            <Button text="Login" type="sumbit" loading={loading}/>  
        </form>
    </>
  )
}

export default Register;
