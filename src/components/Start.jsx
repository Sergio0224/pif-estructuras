import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"

const Start = () => {

    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    return (
        <div className='flex'>
            <div className='w-1/2 h-screen bg-[#1389FE] flex justify-center items-center'>
                <FontAwesomeIcon className='w-1/4 h-1/4 text-white' icon={faBookOpen}></FontAwesomeIcon>
            </div>

            <div className='bg-[#EEFAFF] w-1/2 h-screen flex justify-center items-center'>
                <form className='flex flex-col gap-4' onSubmit={data => {
                    data.preventDefault()
                    const { name, career, half_year } = data.target
                    localStorage.setItem("user", JSON.stringify({
                        name: name.value,
                        career: career.value,
                        half_year: half_year.value
                    }))

                    window.location.reload()
                }}>
                    <label htmlFor="name">Nombre Completo</label>
                    <input className='px-2 py-1 border rounded-md' type="text" name='name' required />

                    <label htmlFor="career">Carrera</label>
                    <input className='px-2 py-1 border rounded-md' type="text" name='career' required />

                    <label htmlFor="half_year">Semestre</label>
                    <select className='px-2 py-1 border rounded-md' name="half_year" id="half_year" required>
                        {options.map((data) => (
                            <option key={data} value={data}>{data}</option>
                        ))}
                    </select>
                    <input type="submit" value="Registrarme" className='bg-[#1389FE] text-white rounded-md px-4 py-2'/>
                </form>
            </div>
        </div>
    )
}

export default Start