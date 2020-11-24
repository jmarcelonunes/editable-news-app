import React, { useState } from 'react';
import firebase from '../../firebase';
import NavBar from '../NavBar';

const NewsForm = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const db = firebase.firestore();

    try {
      await db.collection('noticias').add({
        autor: author,
        corpo: body,
        subtitulo: subTitle,
        titulo: title,
      });
      setTitle('');
      setSubtitle('');
      setBody('');
      setAuthor('');
      alert('Notícia cadastrada com sucesso!');
    } catch (err) {
      console.log(err);
      alert('Erro ao cadastrar notícia', err);
    }
  }

  return (
    <>
      <NavBar />
      <div
        style={{
          display: 'flex',
          flex: 1,
          height: 500,
          width: '100%',
          padding: 20,
        }}
      >
        <div style={{ display: 'flex', flex: 1 }} />
        <div
          style={{
            display: 'flex',
            flex: 2,
            flexDirection: 'column',
            alignItems: 'center',
            paddingRight: 30,
          }}
        >
          <form
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              width: '100%',
            }}
            onSubmit={handleSubmit}
          >
            <input
              style={{
                width: '100%',
                marginBottom: 20,
              }}
              type="text"
              name="title"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              style={{ width: '100%', marginBottom: 20 }}
              type="text"
              name="subTitle"
              placeholder="SubTítulo"
              value={subTitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <input
              style={{ width: '100%', marginBottom: 20 }}
              type="text"
              name="author"
              placeholder="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <textarea
              style={{ width: '100%', marginBottom: 20 }}
              rows={20}
              type="text"
              name="body"
              placeholder="Corpo"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <button style={{ width: 80 }} type="submit">
              Submit
            </button>
          </form>
        </div>
        <div style={{ display: 'flex', flex: 1 }} />
      </div>
    </>
  );
};

export default NewsForm;
