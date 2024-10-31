import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useTheme } from '../context/ThemeContext';


const CommentList = ({ noticiaId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const comentariosCollection = collection(db, `noticias/${noticiaId}/comentarios`);
    const unsubscribe = onSnapshot(comentariosCollection, (snapshot) => {
      const comentarioList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComentarios(comentarioList);
      setLoading(false); 
    });

    return () => unsubscribe(); 
  }, [noticiaId]);

  return (
    <div className="mt-4">
      {loading ? (
        <p>Cargando comentarios...</p>
      ) : (
        comentarios.map((comentario) => (
          <div key={comentario.id} className={`mb-4 py-2 px-4 rounded ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}`}>
            <strong>{comentario.usuario}</strong>
            <p>{comentario.texto}</p>
            <p className={`text-sm ${isDarkMode ? ' text-white' : ' text-black'}`}>
              {comentario.fecha ? new Date(comentario.fecha.seconds * 1000).toLocaleString() : ''}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
