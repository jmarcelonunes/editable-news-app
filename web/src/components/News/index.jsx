import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteButton } from './style';
import NavBar from '../NavBar/index';
import firebase from '../../firebase';

const News = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();

    const collection = db.collection('noticias');

    const noticiasFirestore = [];
    collection.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        noticiasFirestore.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setNoticias(noticiasFirestore);
    });
  }, []);

  async function deleteNews(id) {
    const db = firebase.firestore();
    try {
      await db.collection('noticias').doc(id).delete();
      alert('Notícia excluída com sucesso!');
      // Necessita fazer a atualizacao do estado
    } catch (err) {
      console.log(err);
      alert('Erro ao excluída notícia', err);
    }
  }

  return (
    <>
      <NavBar />
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '30%',
            height: '100%',
          }}
        />
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {noticias && noticias.length ? (
            noticias.map((noticia) => (
              <div
                key={noticia.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  marginBottom: 20,
                  borderBottomWidth: 2,
                  borderBottomStyle: 'solid',
                  borderBottomColor: '#005484',
                }}
              >
                <h2 style={{ margin: 0 }}>{noticia.titulo}</h2>
                <h4 style={{ margin: 0 }}>{noticia.subtitulo}</h4>
                <p style={{ margin: 0, marginBottom: 20 }}>
                  Escrito por: {noticia.autor}
                </p>
                <h3 style={{ margin: 0 }}>{noticia.corpo}</h3>
                <div>
                  <DeleteButton type="button" onClick={() => deleteNews(noticia.id)}>Excluir</DeleteButton>
                  <Link style={{ textDecoration: 'none' }} to={`/registerNews/${noticia.id}`}>
                    <button type="button">Editar</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div style={{ width: '30%', height: '100%' }} />
      </div>
    </>
  );
};

export default News;
