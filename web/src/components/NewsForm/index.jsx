import React, { useState } from 'react';
import firebase from '../../firebase';
import NavBar from '../NavBar/index';
import {
  Form, MainContainer, PaddingContainer, Input, FormContainer, Container, SubmitButton, NewsInput,
} from './style';

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
    <Container>
      <NavBar />
      <MainContainer>
        <PaddingContainer />
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="title"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              name="subTitle"
              placeholder="SubTítulo"
              value={subTitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <Input
              type="text"
              name="author"
              placeholder="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <NewsInput
              rows={20}
              type="text"
              name="body"
              placeholder="Corpo"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <SubmitButton type="submit">
              Cadastrar
            </SubmitButton>
          </Form>
        </FormContainer>
        <PaddingContainer />
      </MainContainer>
    </Container>
  );
};

export default NewsForm;
