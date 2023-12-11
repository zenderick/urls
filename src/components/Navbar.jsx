import { useContext } from 'react';
import {NavLink, Link} from 'react-router-dom'
import { UserContext } from '../context/UserProvider';

const Navbar = () => { 

    const {user, sinOutU} = useContext(UserContext);

    const handleLog = async()=>{
        try {
            await sinOutU();
        } catch (error) {
            console.log(error.code)
        }
    }

    const classBlue= 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'

    const classRed= 'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'


    return (
        <nav className='bg-white border-gray-200 dark:bg-gray-900'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4' >
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>URLShort APP</span>
                </Link>
                <div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse' >
                    { 
                        user ?(
                        <>
                        <NavLink to='/' className={classBlue}>
                            Inicio
                        </NavLink> 
                        <button onClick={handleLog} className={classRed} >
                            LogOut
                        </button>
                        </>)
                        :
                        <>
                        <NavLink to='/login' className={classBlue}>
                            Login 
                        </NavLink>
                        <NavLink to='/register' className={classBlue}>
                            Register
                        </NavLink>
                        </>
                    }
                </div>                
            </div>
        </nav>
    )
 }

 export default Navbar;