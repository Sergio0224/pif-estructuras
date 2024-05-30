import React, { useEffect, useState } from 'react';
import useUserData from "../hooks/useUserData";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const { subjects, setSubjects, lowGradeAlert, user } = useUserData();
  const [passingGrade, setPassingGrade] = useState(3.0);

  useEffect(() => {
    let subjectsLocal = localStorage.getItem("subjects");
    if (subjectsLocal !== null) {
      setSubjects(JSON.parse(subjectsLocal));
    }
  }, []);

  const generateLowGradeAlertHTML = (lowGradeSubjects) => {
    const subjectNames = lowGradeSubjects.map(subject => `<span class="font-bold">${subject.name}</span>`);

    if (subjectNames.length === 1) {
      return `<p>Tu promedio en la materia</br>${subjectNames[0]}</br>está por debajo de 3.0.</p>`;
    } else {
      const lastSubjectName = subjectNames.pop();
      const otherSubjectNames = subjectNames.join(', ');
      return `<p>Tu promedio en la/s materia/s </br>${otherSubjectNames} y ${lastSubjectName}</br> está/n por debajo de 3.0.</p>`;
    }
  };

  useEffect(() => {
    if (lowGradeAlert) {
      const lowGradeSubjects = subjects.filter(subject => {
        const finalGrade = calculateFinalGrade(subject.nota1, subject.nota2, subject.nota3);
        return finalGrade < 3.0;
      });

      if (lowGradeSubjects.length > 0) {
        const alertHTML = generateLowGradeAlertHTML(lowGradeSubjects);
        Swal.fire({
          html: alertHTML,
          icon: 'warning',
          toast: true,
          position: "bottom-right",
          showCloseButton: true,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 5000,
          customClass: {
            timerProgressBar: "bg-[#1389FE]"
          }
        });
      }
    }
  }, [subjects, lowGradeAlert]);

  const addSubject = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Materia',
      html:
        '<input id="swal-input1" class="swal2-input w-full md:w-1/2" placeholder="Nombre de la materia" required>' +
        '<input id="swal-input2" type="number" class="swal2-input w-full md:w-1/2" step="0.1" min="0" max="5" placeholder="Nota corte 1 (opcional)">' +
        '<input id="swal-input3" type="number" class="swal2-input w-full md:w-1/2" step="0.1" min="0" max="5" placeholder="Nota corte 2 (opcional)">' +
        '<input id="swal-input4" type="number" class="swal2-input w-full md:w-1/2" step="0.1" min="0" max="5" placeholder="Nota corte 3 (opcional)">',
      focusConfirm: false,
      confirmButtonColor: "#1389FE",
      confirmButtonText: "Agregar",
      preConfirm: () => {
        return [
          {
            name: document.getElementById('swal-input1').value,
            nota1: document.getElementById('swal-input2').value,
            nota2: document.getElementById('swal-input3').value,
            nota3: document.getElementById('swal-input4').value,
          },
        ];
      },
    });

    if (formValues) {
      const newSubjects = subjects.length <= 0 ? formValues : subjects.concat(formValues);
      setSubjects(newSubjects);
      localStorage.setItem('subjects', JSON.stringify(newSubjects));
    }
  };

  const editSubject = async (subjectIndex) => {
    const subjectToEdit = subjects[subjectIndex];
    const { value: formValues } = await Swal.fire({
      title: 'Editar Materia',
      html:
        `<input id="swal-input1" class="swal2-input w-full md:w-1/2" placeholder="Nombre de la materia" value="${subjectToEdit.name}" required>` +
        `<input id="swal-input2" type="number" class="swal2-input w-full md:w-1/2" step="0.1" min="0" max="5" placeholder="Nota corte 1 (opcional)" value="${subjectToEdit.nota1 || ''}">` +
        `<input id="swal-input3" type="number" class="swal2-input w-full md:w-1/2" step="0.1" min="0" max="5" placeholder="Nota corte 2 (opcional)" value="${subjectToEdit.nota2 || ''}">` +
        `<input id="swal-input4" type="number" class="swal2-input w-full md:w-1/2" step="0.1" min="0" max="5" placeholder="Nota corte 3 (opcional)" value="${subjectToEdit.nota3 || ''}">`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          {
            name: document.getElementById('swal-input1').value,
            nota1: document.getElementById('swal-input2').value,
            nota2: document.getElementById('swal-input3').value,
            nota3: document.getElementById('swal-input4').value,
          },
        ];
      },
    });

    if (formValues) {
      const updatedSubjects = [...subjects];
      updatedSubjects[subjectIndex] = formValues[0];
      setSubjects(updatedSubjects);
      localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    }
  };

  const calculateFinalGrade = (nota1, nota2, nota3) => {
    const Percentages = [0.3, 0.3, 0.4];
    const grades = [nota1, nota2, nota3].filter(grade => grade !== '');
    const sum = grades.reduce((total, grade, index) => total + grade * Percentages[index], 0);
    return sum;
  };

  const calculateNeededGrade = (nota1, nota2, nota3) => {
    const Percentages = [0.3, 0.3, 0.4];
    const grades = [nota1, nota2, nota3].filter(grade => grade !== '');
    const percentageRemaining = 1 - grades.reduce((total, _, index) => total + Percentages[index], 0);
    const sum = grades.reduce((total, grade, index) => total + grade * Percentages[index], 0);

    if (percentageRemaining === 0) {
      const finalGrade = calculateFinalGrade(nota1, nota2, nota3);
      if (finalGrade >= passingGrade) {
        return 'Ya has aprobado la materia';
      } else {
        return 'Reprobaste';
      }
    }

    const neededGrade = (passingGrade - sum) / percentageRemaining;
    return `Nota necesaria para aprobar: ${neededGrade.toFixed(2)}, en el ${(percentageRemaining * 100).toFixed(0)}% restante`;
  };

  return (
    <>
      <div className='flex gap-4 py-6'>
        <div>
          <h1 className='font-bold text-3xl text-[#1389FE]'>Materias</h1>
          <span className='text-[#1389FE]'>{user.half_year} semestre</span>
        </div>
        <button className='bg-[#1389FE] text-white rounded-md px-4 py-2' onClick={async () => addSubject()}>Añadir materia</button>
      </div>
      <div className='flex gap-4 w-full h-full flex-wrap'>
        {(subjects.length > 0) && subjects.map((data, index) => (
          <div key={data.name} className='border-2 h-[50%] w-[30%] bg-[#F5F8FA]'>
            <div className='h-3/4 w-full px-6 py-16 text-center overflow-hidden font-bold relative'>
              <span>{data.name}</span>
              <button
                className='text-[#1389FE] rounded-md px-2 py-1 absolute top-2 right-2'
                onClick={() => editSubject(index)}
              >
                <FontAwesomeIcon className='w-6 h-6' icon={faPenToSquare} />
              </button>
            </div>
            <div className='h-1/4 flex flex-col bg-[#1389FE] text-white px-4 py-4'>
              <span>Corte 1 - {(data.nota1) ? data.nota1 : "No registra nota"} | 30%</span>
              <span>Corte 2 - {(data.nota2) ? data.nota2 : "No registra nota"} | 30%</span>
              <span>Corte 3 - {(data.nota3) ? data.nota3 : "No registra nota"} | 40%</span>
              {(!data.nota1 || !data.nota2 || !data.nota3) ? "" : <p>Nota final: {calculateFinalGrade(data.nota1, data.nota2, data.nota3).toFixed(2)}</p>}
              <p>{calculateNeededGrade(data.nota1, data.nota2, data.nota3)}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;