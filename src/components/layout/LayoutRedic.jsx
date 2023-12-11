import {Outlet, useParams} from 'react-router-dom';
import useFirestore from '../../hooks/useFirestore';
import { useEffect, useState } from 'react';
import Title from '../Tiltle';

const LayoutRedic = () => {

    const {nanoid} = useParams();
    
    const {serchData} = useFirestore();

    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        serchData(nanoid).then((docSnap) => {
                if(docSnap.exists()){
                    window.location.href = docSnap.data().orign
                }else{
                    setLoading(false)
                }
            })
    },[])

    if(loading) return <Title text='Cargando redireccionamiento...' />

  return (
    <div className="container mx-auto">
        <Outlet/>
    </div>
  )
}

export default LayoutRedic