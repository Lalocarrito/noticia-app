// src/components/NoticiaForm.js
import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const NoticiaForm = () => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [grupo, setGrupo] = useState('');

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
      alert('Noticia publicada con éxito');
    } catch (error) {
      console.error('Error al publicar noticia: ', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4"> 
    <form onSubmit={publicarNoticia} className="bg-white p-6 rounded-lg shadow-md mb-4">
    <input
      className="w-full p-2 mb-4 border border-gray-300 rounded"
      type="text"
      placeholder="Título"
      value={titulo}
      onChange={(e) => setTitulo(e.target.value)}
      required
    />
    <textarea
      className="w-full p-2 mb-4 border border-gray-300 rounded"
      placeholder="Contenido"
      value={contenido}
      onChange={(e) => setContenido(e.target.value)}
      required
    />
    <input
      className="w-full p-2 mb-4 border border-gray-300 rounded"
      type="text"
      placeholder="Grupo"
      value={grupo}
      onChange={(e) => setGrupo(e.target.value)}
      required
    />
    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600" type="submit">
      Publicar Noticia
    </button>
  </form>
  </div>
  );
};

export default NoticiaForm;
