import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import useUserData from '../hooks/useUserData';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';

const Tasks = () => {
  const { tasks, setTasks, subjects, tasksNotifications, user } = useUserData();

  useEffect(() => {
    let tasksLocal = localStorage.getItem("tasks");
    if (tasksLocal !== null) {
      setTasks(JSON.parse(tasksLocal));
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    const tasksToNotify = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate.getTime() <= tomorrow.getTime();
    });

    if (tasksNotifications && tasksToNotify.length > 0) {
      const taskNames = tasksToNotify.map((task) => task.text).join('</br>');
      Swal.fire({
        html: `<p>Las siguientes tareas están próximas a vencer:</br><span class="font-bold">${taskNames}</span></p>`,
        toast: true,
        position: "bottom-right",
        showCloseButton: true,
        showConfirmButton: false,
        timerProgressBar: true,
        icon: 'warning',
        timer: 5000,
        customClass: {
          timerProgressBar: "bg-[#1389FE]"
        }
      });
    }
  }, [tasks, tasksNotifications]);

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `${timestamp}-${hexadecimalString}`;
  };

  const addTask = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Tarea',
      html:
        '<input id="swal-input1" class="swal2-input w-full md:w-1/2" placeholder="Nombre de la tarea" required>' +
        '<select id="swal-input2" class="swal2-input w-full md:w-1/2" required>' +
        `<option value="" disabled selected>Selecciona una materia</option>` +
        `${subjects.map((subject) => `<option value="${subject.name}">${subject.name}</option>`).join('')}` +
        '</select>' +
        '<input id="swal-input3" type="date" class="swal2-input w-full md:w-1/2" placeholder="Fecha de vencimiento" required>',
      focusConfirm: false,
      confirmButtonColor: "#1389FE",
      confirmButtonText: "Agregar",
      preConfirm: () => {
        return [
          {
            text: document.getElementById('swal-input1').value,
            subject: document.getElementById('swal-input2').value,
            dueDate: document.getElementById('swal-input3').value,
          },
        ];
      },
    });

    if (formValues) {
      const newTask = tasks.length <= 0 ? formValues : tasks.concat(formValues);
      setTasks([...tasks, { id: generateUniqueId(), ...formValues[0], completed: false }]);
      localStorage.setItem('tasks', JSON.stringify(newTask));
    }
  };

  const ExportToPDF = (tasks) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Tareas', 20, 20);
    doc.setFontSize(12);
    let y = 30;
    tasks.forEach(task => {
      doc.text(`Tarea: ${task.text}`, 20, y);
      y += 10;
      doc.text(`Materia: ${task.subject}`, 20, y);
      y += 10;
      doc.text(`Fecha de vencimiento: ${task.dueDate}`, 20, y);
      y += 10;
      doc.text(`Completada: ${task.completed ? 'Sí' : 'No'}`, 20, y);
      y += 20;
    });

    doc.save('tareas.pdf');
  };

  const editTask = async (taskIndex) => {
    const taskToEdit = tasks[taskIndex];
    const { value: formValues } = await Swal.fire({
      title: 'Editar Tarea',
      html:
        `<input id="swal-input1" class="swal2-input w-full md:w-1/2" placeholder="Nombre de la tarea" value="${taskToEdit.text}" required>` +
        `<select id="swal-input2" class="swal2-input w-full md:w-1/2" required>` +
        `<option value="" disabled>${taskToEdit.subject === '' ? 'Selecciona una materia' : ''}</option>` +
        `${subjects.map((subject) => `<option value="${subject.name}" ${subject.name === taskToEdit.subject ? 'selected' : ''}>${subject.name}</option>`).join('')}` +
        `</select>` +
        `<input id="swal-input3" type="date" class="swal2-input w-full md:w-1/2" placeholder="Fecha de vencimiento" value="${taskToEdit.dueDate}" required>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          {
            text: document.getElementById('swal-input1').value,
            subject: document.getElementById('swal-input2').value,
            dueDate: document.getElementById('swal-input3').value,
          },
        ];
      },
    });

    if (formValues) {
      const updatedTasks = [...tasks];
      updatedTasks[taskIndex] = { ...formValues[0], id: taskToEdit.id, completed: taskToEdit.completed };
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const sortTasksByDueDate = (tasks) => {
    return tasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA.getTime() - dateB.getTime();
    });
  };

  return (
    <>
      <div className='flex gap-4 py-6'>
        <div>
          <h1 className='font-bold text-3xl text-[#1389FE]'>Tareas</h1>
          <span className='text-[#1389FE]'>{user.half_year} semestre</span>
        </div>
        <button
          className='bg-[#1389FE] text-white rounded-md px-4 py-2'
          onClick={async () => addTask()}
        >
          Añadir tarea
        </button>
        <button className='bg-[#1389FE] text-white rounded-md px-4 py-2' onClick={() => ExportToPDF(tasks)}>Exportar tareas</button>
      </div>
      <ul className='flex gap-4 flex-col'>
        {sortTasksByDueDate(tasks).map((task, index) => (
          <li
            key={`${task.text}--${task.id}`}
            className='p-4 bg-[#F5F8FA] border-2 w-11/12 flex gap-4 justify-between'
          >
            <div>
              <span
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                className="text-[#1389FE] font-bold text-2xl"
              >
                {task.text}
              </span>
              <p><span className='font-bold'>Materia: </span>{task.subject}</p>
              <p><span className='font-bold'>Fecha de vencimiento: </span>{task.dueDate}</p>
            </div>
            <div className='flex gap-4 text-[#1389FE]'>
              <button onClick={() => toggleTaskCompletion(task.id)}>
                {task.completed ? <FontAwesomeIcon className='w-6 h-6' icon={faXmark} /> : <FontAwesomeIcon className='w-6 h-6' icon={faCheck} />}
              </button>
              <button onClick={() => editTask(index)}><FontAwesomeIcon className='w-6 h-6' icon={faPenToSquare} /></button>
              <button onClick={() => removeTask(task.id)}><FontAwesomeIcon className='w-6 h-6' icon={faTrash} /></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tasks;