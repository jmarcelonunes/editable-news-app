import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import {
  DeleteButton, MainContentContainer, NewsContainer,
  EditButton, CenterContainer, ImageContainer,
} from './style';
import NavBar from '../NavBar/index';
import firebase from '../../firebase';

/**
 * Componente para a página de visualização de notícias
 * @component
 *
 */
const News = () => {
  /**
   * Declaração do estado de noticias
   */
  const [noticias, setNoticias] = useState([]);

  /**
   * Hook useEffect para realizar o get de todas as notícias do banco de dados
   *
   * Assertiva de entrada
   * Recebe uma arrow function responsável pelo get de todas as noticias no firebase
   * Array vazia
   *
   * Assertiva de saída
   * Todos as noticias devem estar contidas na array noticiasFirestore e consequentemente
   * devem estar presentes no estado "noticias"
   */
  useEffect(() => {
    const db = firebase.firestore();

    const collection = db.collection('noticias');

    const noticiasFirestore = [];
    collection.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        noticiasFirestore.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setNoticias(noticiasFirestore);
    });
  }, []);

  /**
   * deleteNews - Função utilizada para realizar a exclusão de alguma notícia
   *
   * Assertiva de entrada
   * @param {string} id recebe o id da notícia a ser excluída
   * id != null
   *
   * Assertiva de saída
   *
   */
  const deleteNews = useCallback(async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm('Deseja mesmo excluir esta notícia?');

    if (confirmDelete) {
      const db = firebase.firestore();
      try {
        await db.collection('noticias').doc(id).delete();
        alert('Notícia excluída com sucesso!');
        // const arrayAux = noticias.filter((noticia) => noticia.id !== id);
        setNoticias((n) => n.filter((noticia) => noticia.id !== id));
        // Necessita fazer a atualizacao do estado
      } catch (err) {
        console.log(err);
        alert('Erro ao excluir notícia', err);
      }
    }
  }, [setNoticias]);

  /**
   * Retorno do componente, retorna todas as notícias
   */
  return (
    <>
      <NavBar />
      <MainContentContainer>
        <div
          style={{
            width: '30%',
            height: '100%',
          }}
        />
        <CenterContainer>
          {noticias && noticias.length ? (
            noticias.map((noticia) => (
              <NewsContainer
                key={noticia.id}
              >
                <Typography variant="h4">{noticia.titulo}</Typography>
                <Typography variant="h6">{noticia.subtitulo}</Typography>
                <Typography variant="subtitle2">Escrito por: {noticia.autor}</Typography>
                <Typography variant="h6" style={{ marginBottom: 20 }}>{noticia.corpo}</Typography>
                {noticia.imgURL
                  ? <ImageContainer style={{ backgroundImage: `url(${noticia.imgURL})` }} />
                  : <></>}
                <div>
                  <DeleteButton type="button" onClick={() => deleteNews(noticia.id)}>Excluir</DeleteButton>
                  <EditButton type="button">
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/registerNews/${noticia.id}`}>
                      Editar
                    </Link>
                  </EditButton>
                </div>
              </NewsContainer>
            ))
          ) : (
            <></>
          )}
        </CenterContainer>
        <div style={{ width: '30%', height: '100%' }} />
      </MainContentContainer>
    </>
  );
};

export default News;
