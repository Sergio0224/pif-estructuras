import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
const Welcome = () => {
    return (
        <div className='flex'>
            <div className='w-1/2 h-screen bg-[#1389FE] flex justify-center items-center'>
                <FontAwesomeIcon className='w-1/4 h-1/4 text-white' icon={faBookOpen}></FontAwesomeIcon>
            </div>

            <div className='bg-[#EEFAFF] w-1/2 h-screen flex flex-col gap-4 justify-center items-center'>
                <h2 className='font-bold text-3xl text-[#1389FE]'>StudentMonitor</h2>
                <p className='text-lg'>herramienta para gestionar tu rendimiento académico</p>
                <Link to="/start" className='bg-[#1389FE] text-white px-4 py-2 rounded-lg border text-lg'>Registrarse</Link>
            </div>
        </div>
    )
}

export default Welcome