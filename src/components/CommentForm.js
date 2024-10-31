import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useTheme } from '../context/ThemeContext';


const CommentForm = ({ noticiaId, onCommentAdded }) => {
  const [usuario, setUsuario] = useState('');
  const [texto, setTexto] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [comentarioRealizado, setComentarioRealizado] = useState(false);
  const { isDarkMode } = useTheme();


  const agregarComentario = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `noticias/${noticiaId}/comentarios`), {
        usuario,
        texto,
        fecha: serverTimestamp(), 
      });
      setUsuario('');
      setTexto('');
      onCommentAdded();
      setComentarioRealizado(true);
      setMostrarFormulario(false);

      setTimeout(() => setComentarioRealizado(false), 3000);
    } catch (error) {
      console.error('Error al agregar comentario: ', error);
    }
  };

  return (
    <div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2" onClick={() => setMostrarFormulario(!mostrarFormulario) }>
        Agregar comentario
      </button>
          {comentarioRealizado && <p className={` ${isDarkMode ? 'text-green-500' : 'text-green-800 '}  transition-opacity duration-700 ${comentarioRealizado ? 'opacity-100' : 'opacity-0'}`}>
          Comentario realizado con éxito
        </p>}

      {mostrarFormulario && (
        <form onSubmit={agregarComentario} className={` ${isDarkMode ? 'bg-gray-600' : 'bg-gray-100 '} p-4 rounded-lg w-full mt-4 mb-12 max-w-12xl mx-auto`}>
          <input
            className={` ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'} w-full p-2 mb-2  rounded-lg shadow-md"`}
            type="text"
            placeholder="Tu nombre"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <textarea
            className={` ${isDarkMode ? 'bg-gray-800' : 'bg-white border border-gray-300'} w-full p-2 mb-2  rounded-lg shadow-md"`}
            placeholder="Comentario"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
          <button className="bg-green-500 text-white py-2 px-4 mr-4 rounded hover:bg-green-600" type="submit">
            Comentar
          </button>

          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" type="submit" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
            Regresar
          </button>

        </form>
      )}
    </div>
  );
};

export default CommentForm;
