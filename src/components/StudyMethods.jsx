import { faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const StudyMethods = () => {
  return (
    <div>
      <div className='flex gap-4 py-6'>
        <div>
          <h1 className='font-bold text-3xl text-[#1389FE]'>Metodos de Estudio</h1>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        <li
          className="p-4 bg-[#F5F8FA] border-2 w-11/12 flex justify-between items-center"
        >
          <div>
            <h3 className="text-[#1389FE] font-bold text-2xl">Pomodoro</h3>
            <p className="overflow-hidden h-full">Este método implica estudiar en bloques de tiempo enfocados de 25 minutos, separados por breves descansos de 5 minutos. 
            Cada 4 bloques de estudio se toma un descanso más largo de 15-30 minutos.</p>
          </div>
          <div className="flex gap-4 text-[#1389FE]">
            <Link to="pomodoro">
              <FontAwesomeIcon className='w-6 h-6' icon={faEye} />
            </Link>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default StudyMethods