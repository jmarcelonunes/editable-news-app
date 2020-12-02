import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import NavBar from './NavBar/index';

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
