import { useState } from "react"
import { db } from "../firebase"
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite"
import { auth } from "../firebase";
import { nanoid } from "nanoid";

const useFirestore = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)


  const getData = async() => {
    try {
      setLoading((prev) => ({ ...prev, getData: true }));
      const dataRef =collection(db, "urls")
      const q = query(dataRef, where("uid", "==", auth.currentUser.uid))
      const queryST = await getDocs(q)
      const dataDB = queryST.docs.map(doc => (doc.data())) 
      setData(dataDB)
    } catch (error) {
      setError(error.message)
    }finally{
      setLoading((prev) => ({ ...prev, getData: false }));
    }
  }

  const addData = async (url) => {
    try {
      setLoading((prev) => ({ ...prev, addData: true }));
      const newData = { nanoid: nanoid(6), orign: url, uid:auth.currentUser.uid };
      const docRef = doc(db, "urls", newData.nanoid);
      await setDoc(docRef, newData);
      setData([...data, newData]);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, addData: false }));
    }
  };

  const  deleteAdd =  async (nanoid) => {
    try {
      setLoading((prev) => ({ ...prev, [nanoid]: true }));
      const docRef = doc(db, "urls",nanoid);
      await deleteDoc(docRef)
      setData(data.filter(item => item.nanoid !== nanoid))
      setData([...data, newData]);
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, [nanoid]: false }));
    }
  };
  
  const updateData = async(nanoid, newOrign) => {
    try {
      setLoading((prev) => ({ ...prev, updateData:true }));
      const docRef = doc(db, "urls",nanoid);
      await updateDoc(docRef, {orign: newOrign})
      setData(
        data.map((item) => item.nanoid === nanoid ? ({...item, orign: newOrign}) : item))
    } catch (error) {
      console.log(error);
      setError(error.code);
    } finally {
      setLoading((prev) => ({ ...prev, updateData:false }));
    }
  }

  const serchData = async (nanoid) => {
    try {
      const docRef = doc(db, "urls", nanoid);
      const docSnap = await getDoc(docRef);
      return docSnap;
    } catch (error) {
      console.log(error);
      setError(error.message);
    }  
  }
  

  

  return {data, error, loading, getData, addData, deleteAdd, updateData, serchData}
}

export default useFirestore