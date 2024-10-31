import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useTheme } from '../context/ThemeContext';

const NoticiaForm = ({ onNoticiaAdded }) => {
  const { isDarkMode } = useTheme();
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [grupo, setGrupo] = useState('');
  const [noticiaAgregada, setNoticiaAgregada] = useState(false);

  const publicarNoticia = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'noticias'), {
        titulo,
        contenido,
        grupo,
        fecha: serverTimestamp(),
      });
      setTitulo('');
      setContenido('');
      setGrupo('');
      setNoticiaAgregada(true);
      onNoticiaAdded();
      setTimeout(() => setNoticiaAgregada(false), 3000); 
    } catch (error) {
      console.error('Error al publicar noticia: ', error);
    }
  };

  return (
    <div className={`max-w-4xl  mx-auto p-4 m-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md`}>
      <form onSubmit={publicarNoticia} className="p-6">
        <input
          className={`w-full p-2 mb-4 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'border border-gray-300'}`}
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <textarea
          className={`w-full p-2 mb-4 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'border border-gray-300'}`}
          placeholder="Contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
        />
        <input
          className={`w-full p-2 mb-4 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'border border-gray-300'}`}
          type="text"
          placeholder="Grupo"
          value={grupo}
          onChange={(e) => setGrupo(e.target.value)}
          required
        />
        <button className={`w-full py-2 px-4 rounded ${isDarkMode ? 'bg-green-500 text-black' : 'bg-green-500 text-white'}`}>
          Publicar Noticia
        </button>
        {noticiaAgregada && (
          <p className={`text-center mt-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            Noticia publicada con éxito
          </p>
        )}
      </form>
    </div>
  );
};

export default NoticiaForm;
