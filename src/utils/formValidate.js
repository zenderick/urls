export const formValidate = () => { 
    return {
        required: {
            value: true,
            message: "Campo obligatorio",
        },
        patternEmail: {
            value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i, 
            message:"Formato email incorrecto"
        },
        patternUrl: {
            value: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/, 
            message:"Formato de url incorrecto"
        },
        minLength: {
            value: 6, 
            message: "Minimo 6 caracteres"
        },
        validateTrim:{
            trim: v => {
                if(!v.trim()){
                    return"No seas payaso, escribe algo"
                }return true;                 
            }
        },
        validateEquals(value){
            return{
                equals: v => v=== value ||
                 "No coinciden contraseñas",
            }
        }
    }
 }