import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import firebase from '../../firebase';
import NavBar from '../NavBar/index';
import {
  Form, MainContainer, PaddingContainer, Input,
  FormContainer, Container, SubmitButton, NewsInput, DropDiv,
} from './style';

const NewsForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [subTitle, setSubtitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');

  const {
    acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,
  } = useDropzone({ noClick: true, accept: '' });

  const files = acceptedFiles.map((file) => (
    <li key={file.path} style={{ listStyleType: 'none' }}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    async function fetch() {
      if (id) {
        const db = firebase.firestore();
        try {
          let data = await db.collection('noticias').doc(id).get();
          data = data.data();
          setTitle(data.titulo);
          setSubtitle(data.subtitulo);
          setBody(data.corpo);
          setAuthor(data.autor);
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetch();
  }, [id]);

  function clearFields() {
    setTitle('');
    setSubtitle('');
    setBody('');
    setAuthor('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const db = firebase.firestore();
    const storage = firebase.storage();
    try {
      if (acceptedFiles[0]) {
        await storage.ref(`/imagens/${acceptedFiles[0].name}`).put(acceptedFiles[0]);
        storage.ref('imagens').child(acceptedFiles[0].name).getDownloadURL().then((url) => {
          db
            .collection('noticias')
            .add({
              autor: author,
              corpo: body,
              subtitulo: subTitle,
              titulo: title,
              imgURL: url,
            })
            .then(() => {
            });
        });
      } else {
        await db.collection('noticias').add({
          autor: author,
          corpo: body,
          subtitulo: subTitle,
          titulo: title,
        });
      }

      clearFields();
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
              required
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
              required
              onChange={(e) => setAuthor(e.target.value)}
            />
            <NewsInput
              rows={20}
              type="text"
              name="body"
              placeholder="Corpo"
              value={body}
              required
              onChange={(e) => setBody(e.target.value)}
            />
            <DropDiv {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
              <input {...getInputProps()} />
              <p style={{ textAlign: 'center' }}>Arraste e solte um arquivo .jpeg</p>
            </DropDiv>
            <div>
              <br />
              <ul>{files}</ul>
              <br />
            </div>
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
