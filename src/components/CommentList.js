import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const CommentList = ({ noticiaId }) => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const comentariosCollection = collection(db, `noticias/${noticiaId}/comentarios`);
    const unsubscribe = onSnapshot(comentariosCollection, (snapshot) => {
      const comentarioList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComentarios(comentarioList);
      setLoading(false); // Cambia el estado de carga cuando se reciban los datos
    });

    return () => unsubscribe(); // Limpia la suscripción al desmontar el componente
  }, [noticiaId]);

  return (
    <div className="mt-4">
      {loading ? (
        <p>Cargando comentarios...</p>
      ) : (
        comentarios.map((comentario) => (
          <div key={comentario.id} className="bg-gray-200 p-2 rounded mb-2">
            <strong>{comentario.usuario}</strong>
            <p>{comentario.texto}</p>
            <p className="text-gray-500 text-sm">
              {comentario.fecha ? new Date(comentario.fecha.seconds * 1000).toLocaleString() : ''}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
