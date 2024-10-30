import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const NoticiaList = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      const noticiasCollection = collection(db, 'noticias');
      const noticiaSnapshot = await getDocs(noticiasCollection);
      const noticiaList = noticiaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNoticias(noticiaList);
    };

    fetchNoticias();
  }, []);

  const handleCommentAdded = (noticiaId) => {
    const updatedNoticias = noticias.map((noticia) => {
      if (noticia.id === noticiaId) {
        return { ...noticia, comentariosActualizados: true };
      }
      return noticia;
    });
    setNoticias(updatedNoticias);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-wrap justify-between">
        {noticias.map((noticia) => (
          <div key={noticia.id} className="bg-white p-4 rounded-lg shadow-md mb-4 w-full mx-1"> {/* Ajustar margen horizontal */}
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
