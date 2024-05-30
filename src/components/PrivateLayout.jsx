import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import useUserData from "../hooks/useUserData"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const PrivateLayout = () => {

    const { user, isUserEmpty } = useUserData();
    const hoy = new Date(Date.now()).toLocaleDateString();

    const menu = [
        { name: "Inicio", path: "" },
        { name: "Tareas", path: "tasks" },
        { name: "Anotaciones", path: "annotations" },
        { name: "Méts. Estudio", path: "study-methods" },
        { name: "Configuración", path: "config" }
    ];

    return (
        (isUserEmpty == false)
            ?
            <div className='w-full min-h-screen flex bg-[#EEF9FF]'>
                <div className='w-1/4 min-h-screen bg-[#1389FE] flex flex-col items-center py-6'>
                    <div className='flex items-center gap-2 my-6'>
                        <FontAwesomeIcon className='text-white w-9 h-9' icon={faUser} />
                        <div className='flex flex-col'>
                            <span className='text-white'>{user.name}</span>
                            <span className='text-white'>{user.career}</span>
                        </div>
                    </div>
                    <ul className='flex flex-col gap-8 w-3/5'>
                        {menu.map((data) => (
                            <Link className='px-4 py-3 text-center bg-[#2AA6FF] hover:bg-[#006fce] rounded-md text-white' to={data.path} key={data.name}>{data.name}</Link>
                        ))}
                    </ul>
                    <div className='my-6 flex flex-col text-center text-white'>
                        <span>Fecha</span>
                        <span>{hoy}</span>
                    </div>
                </div>
                <div className='w-3/4 h-full ml-4 pb-4'>
                    <Outlet />
                </div>
            </div>
            :
            <Navigate to="/" />
    )
}

export default PrivateLayout