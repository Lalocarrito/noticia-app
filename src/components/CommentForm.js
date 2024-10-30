import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const CommentForm = ({ noticiaId, onCommentAdded }) => {
  const [usuario, setUsuario] = useState('');
  const [texto, setTexto] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [comentarioRealizado, setComentarioRealizado] = useState(false);

  const agregarComentario = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `noticias/${noticiaId}/comentarios`), {
        usuario,
        texto,
        fecha: serverTimestamp(), // Agrega el campo de fecha
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
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? 'Regresar' : 'Agregar comentario'}
      </button>

      {comentarioRealizado && <p className={`text-green-500 transition-opacity duration-700 ${comentarioRealizado ? 'opacity-100' : 'opacity-0'}`}>
          Comentario realizado con éxito
        </p>}

      {mostrarFormulario && (
        <form onSubmit={agregarComentario} className="bg-gray-100 p-4 rounded-lg w-full mt-4 max-w-3xl mx-auto">
          <input
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            type="text"
            placeholder="Tu nombre"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <textarea
            className="w-full p-2 mb-2 border border-gray-300 rounded"
            placeholder="Comentario"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
          <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" type="submit">
            Comentar
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentForm;
