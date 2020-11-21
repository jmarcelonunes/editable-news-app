import React, { useState } from 'react';
import { useAuth } from '../hooks/auth';
import firebase from '../firebase';

const NewsForm = () => {
  const [title, setTitle] = useState('');
  const [subTitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const { signOut } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    const db = firebase.firestore();

    db.settings({
      timestampsInSnapshots: true,
    });

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
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="subTitle"
          placeholder="SubTítulo"
          value={subTitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <input
          type="text"
          name="body"
          placeholder="Corpo"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <button type="button" onClick={signOut}>
        Sair
      </button>
    </div>
  );
};

export default NewsForm;
