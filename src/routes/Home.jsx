import Button from "../components/Button";
import Title from "../components/Tiltle";
import useFirestore from "../hooks/useFirestore";
import { useEffect, useState } from "react"
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home = () => {

   const {data, error, loading, getData, addData, deleteAdd, updateData} = useFirestore()

   const [newOrign, setNewOrign] = useState()

   const { required, patternUrl} = formValidate();

   const {register, handleSubmit, formState: { errors },setError, resetField, setValue}= useForm()

   const [copy, setCopy] = useState({})


   useEffect(()=>{
    getData()
  },[])

   if(loading.getData) return <p>Loading data...</p>
   if(error) return <p>{error}</p>


   const onSubmit = async ({url}) => {
    try {
        if(newOrign){
            await updateData(newOrign, url)
            setNewOrign('')
        }else{
            await addData(url);
        }
        resetField('url')  
    } catch (error) {
        const {code, message} = erroresFirebase(error.code)
        setError(code,{
            message
        });
    }
};

    const handleclick = async(nanoid) =>{
        await deleteAdd(nanoid)
    }

        const  handleclickEdit = async(item) =>{
        setValue('url',item.orign)
        setNewOrign(item.nanoid)
    }

    const pathUrl = window.location.href;

    const handleclickCopy = async(nanoid) => {
        await navigator.clipboard.writeText(window.location.href + nanoid)
        setCopy({ [nanoid]:true })
    }


    return(
        <>
            <Title text='Home'/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="text" 
                    placeholder="https://..."
                    {...register("url",{
                        required,
                        pattern: patternUrl
                    })}
                    label="Ingresa tu URL"
                    error={errors.url}
                >
                    <FormError error={errors.url}/>
                </FormInput>
                {
                    newOrign ?(
                        <Button type="sumbit" text='EDIT URL' color="yellow" loading={loading.updateData} > EDIT URL</Button>
                    ) : (
                        <Button type="sumbit" text='ADD URL' loading={loading.addData} >ADD URL</Button> 
                    )
                }
            </form>

            {
                data.map(item => (
                    <div key={item.nanoid} className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" > {pathUrl}{item.nanoid} </p>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" >{item.orign}</p>
                        <div className="flex space-x-4">
                            <Button type="button" text='Delete' color="red" loading={loading[item.nanoid]} onClick={() => handleclick(item.nanoid)} >Delete</Button>
                            <Button type="button" text='Edit' color="yellow"  onClick={() => handleclickEdit(item)} >Edit</Button>
                            <Button type="button" text={copy[item.nanoid] ? "Copied" : "Copy"} color="green"  onClick={() => handleclickCopy(item.nanoid)} >Edit</Button>  
                        </div>
                    </div>
                )
                )
            }
        </>
    )
}

export default Home