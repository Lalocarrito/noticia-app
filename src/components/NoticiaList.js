import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import NoticiaForm from './NoticiaForm';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useTheme } from '../context/ThemeContext';

const NoticiaList = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [noticias, setNoticias] = useState([]);

  const fetchNoticias = async () => {
    const noticiasCollection = collection(db, 'noticias');
    const noticiaSnapshot = await getDocs(noticiasCollection);
    const noticiaList = noticiaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setNoticias(noticiaList);
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const handleCommentAdded = (noticiaId) => {
    console.log(`Comentario agregado a la noticia con ID: ${noticiaId}`);
  };

  return (
    <div className={`max-w-12xl mx-auto p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <button
        onClick={toggleTheme}
        className={`mb-4 py-2 px-4 rounded ${isDarkMode ? 'bg-yellow-500 text-black' : 'bg-blue-500 text-white'}`}
      >
        {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
      <NoticiaForm onNoticiaAdded={fetchNoticias} />
      <div className="flex flex-wrap justify-between">
        {noticias.map((noticia) => (
          <div key={noticia.id} className={`p-4 rounded-lg shadow-md mb-4 w-full mx-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-xl font-semibold">{noticia.titulo}</h3>
            <p className="mb-2">{noticia.contenido}</p>
            <p className="text-gray-600 pb-4"><strong>Grupo:</strong> {noticia.grupo}</p>
            <CommentForm noticiaId={noticia.id} onCommentAdded={() => handleCommentAdded(noticia.id)} />
            <CommentList noticiaId={noticia.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticiaList;
