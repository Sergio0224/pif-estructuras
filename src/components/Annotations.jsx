import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import useUserData from '../hooks/useUserData';

const Notes = () => {

  const { notes, setNotes, user } = useUserData()

  useEffect(() => {
    const notesFromStorage = localStorage.getItem('notes');
    if (notesFromStorage) {
      setNotes(JSON.parse(notesFromStorage));
    }
  }, []);

  const addNote = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Agregar Nota',
      html:
        '<input id="swal-input1" class="swal2-input w-full md:w-1/2" placeholder="Título de la nota" required>' +
        '<textarea id="swal-input2" class="swal2-textarea resize-none w-full md:w-1/2" placeholder="Contenido de la nota" required></textarea>',
      focusConfirm: false,
      confirmButtonColor: "#1389FE",
      confirmButtonText: "Agregar",
      preConfirm: () => {
        return [
          {
            title: document.getElementById('swal-input1').value,
            content: document.getElementById('swal-input2').value,
          },
        ];
      },
    });

    if (formValues) {
      setNotes([...notes, formValues[0]]);
      localStorage.setItem('notes', JSON.stringify([...notes, formValues[0]]));
    }
  };

  const ExportToPDF = (notes) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    let y = 30;
    doc.text('Notas', 20, y);
    doc.setFontSize(12);
    y += 10;
    notes.forEach(note => {
      doc.text(`Título: ${note.title}`, 20, y);
      y += 10;
      doc.text(`Contenido: ${note.content}`, 20, y);
      y += 20;
    });

    doc.save('notas.pdf');
  };

  const editNote = async (noteIndex) => {
    const noteToEdit = notes[noteIndex];
    const { value: formValues } = await Swal.fire({
      title: 'Editar Nota',
      html:
        `<input id="swal-input1" class="swal2-input w-full md:w-1/2" placeholder="Título de la nota" value="${noteToEdit.title}" required>` +
        `<textarea id="swal-input2" class="swal2-textarea resize-none w-full md:w-1/2" placeholder="Contenido de la nota" required>${noteToEdit.content}</textarea>`,
      focusConfirm: false,
      preConfirm: () => {
        return [
          {
            title: document.getElementById('swal-input1').value,
            content: document.getElementById('swal-input2').value,
          },
        ];
      },
    });

    if (formValues) {
      const updatedNotes = [...notes];
      updatedNotes[noteIndex] = formValues[0];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }
  };

  const removeNote = (noteIndex) => {
    const updatedNotes = notes.filter((_, index) => index !== noteIndex);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const viewNote = (noteContent) => {
    Swal.fire({
      title: 'Contenido de la nota',
      html: `<div>${noteContent}</div>`,
      showConfirmButton: true,
    });
  };

  return (
    <div>
      <div className='flex gap-4 py-6'>
        <div>
          <h1 className='font-bold text-3xl text-[#1389FE]'>Anotaciones</h1>
          <span className='text-[#1389FE]'>{user.half_year} semestre</span>
        </div>
        <button
          className='bg-[#1389FE] text-white rounded-md px-4 py-2'
          onClick={async () => addNote()}
        >
          Añadir nota
        </button>
        <button className='bg-[#1389FE] text-white rounded-md px-4 py-2' onClick={() => ExportToPDF(notes)}>Exportar notas</button>
      </div>
      <ul className="flex flex-col gap-4">
        {notes.map((note, index) => (
          <li
            key={index}
            className="p-4 bg-[#F5F8FA] border-2 w-11/12 flex justify-between items-center"
          >
            <div>
              <h3 className="text-[#1389FE] font-bold text-2xl">{note.title}</h3>
              <p className="overflow-hidden h-10">{note.content}</p>
            </div>
            <div className="flex gap-4 text-[#1389FE]">
              <button

                onClick={() => viewNote(note.content)}
              >
                <FontAwesomeIcon className='w-6 h-6' icon={faEye} />
              </button>
              <button

                onClick={() => editNote(index)}
              >
                <FontAwesomeIcon className='w-6 h-6' icon={faPenToSquare} />
              </button>
              <button

                onClick={() => removeNote(index)}
              >
                <FontAwesomeIcon className='w-6 h-6' icon={faTrash} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;