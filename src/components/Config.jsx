import React from 'react';
import useUserData from "../hooks/useUserData";

const Config = () => {
  const { setTasksNotifications, tasksNotifications, lowGradeAlert, setLowGradeAlert } = useUserData();

  const handleTaskReminderChange = (event) => {
    setTasksNotifications(event.target.checked);
  };

  const handleLowGradeAlertChange = (event) => {
    setLowGradeAlert(event.target.checked);
  };

  return (
    <div>
      <div className='flex gap-4 py-6'>
                <div>
                    <h1 className='font-bold text-3xl text-[#1389FE]'>Configuración</h1>
                </div>
            </div>
      <div className="flex items-center mb-4">
        <span className="mr-4 text-xl">Activar recordatorio de tareas</span>
        <label
          htmlFor="tasksNotifications"
          className="flex items-center cursor-pointer"
        >
          <div className="relative">
            <input
              type="checkbox"
              id="tasksNotifications"
              className="sr-only"
              checked={tasksNotifications}
              onChange={handleTaskReminderChange}
            />
            <div
              className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner ${
                tasksNotifications ? 'bg-sky-500' : ''
              }`}
            ></div>
            <div
              className={`absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0 ${
                tasksNotifications ? 'translate-x-5' : 'translate-x-0'
              } transition transform`}
            ></div>
          </div>
        </label>
      </div>
      <div className="flex items-center">
        <span className="mr-4 text-xl">Alertar sobre bajo promedio de notas</span>
        <label
          htmlFor="lowGradeAlert"
          className="flex items-center cursor-pointer"
        >
          <div className="relative">
            <input
              type="checkbox"
              id="lowGradeAlert"
              className="sr-only"
              checked={lowGradeAlert}
              onChange={handleLowGradeAlertChange}
            />
            <div
              className={`w-10 h-6 bg-gray-300 rounded-full shadow-inner ${
                lowGradeAlert ? 'bg-sky-500' : ''
              }`}
            ></div>
            <div
              className={`absolute w-5 h-5 bg-white rounded-full shadow inset-y-0 left-0 ${
                lowGradeAlert ? 'translate-x-5' : 'translate-x-0'
              } transition transform`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Config;