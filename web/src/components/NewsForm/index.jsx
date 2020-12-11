import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import firebase from '../../firebase';
import NavBar from '../NavBar/index';
import {
  Form, MainContainer, PaddingContainer, Input,
  FormContainer, Container, SubmitButton, NewsInput, DropDiv,
} from './style';

/**
 * Componente para a página de formulário de notícias
 * @component
 *
 */

const NewsForm = () => {
  /**
   * Hook para obter o id da notícia da url em caso de edição
   */
  const { id } = useParams();
  /**
   * Estado para o titulo da notícia
   */
  const [title, setTitle] = useState('');
  /**
   * Estado para o subtítulo da notícia
   */
  const [subTitle, setSubtitle] = useState('');
  /**
   * Estado para o corpo da notícia
   */
  const [body, setBody] = useState('');
  /**
   * Estado para o autor da notícia
   */
  const [author, setAuthor] = useState('');

  /**
   * Hook utilizada para a funcionalidade do dropzone (drop de imagens)
   */
  const {
    acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,
  } = useDropzone({ noClick: true, accept: '' });

  /**
   * files - Função utilizada para mapear o arquivo de imagem e mostra-lo na tela como lista
   *
   * Assertiva de entrada
   * @param {object} file objeto contendo os dados do arquivo inserido pelo usuário
   * file != null
   *
   * Assertiva de saída
   * Deve ser criada uma lista não ordenada com as informações imagem carregada.
   */
  const files = acceptedFiles.map((file) => (
    /**
     * Percorre a array de arquivos e para cada elemento dessa array
     * gera um elemento de lista para a visualização do usuário
     */
    <li key={file.path} style={{ listStyleType: 'none' }}>
      {file.path} - {file.size} bytes
    </li>
  ));

  useEffect(() => {
    /**
     * fetch() - Função responsável pela busca de uma notícia no banco de dados
     *
     * Assertiva de entrada
     * Não possui nenhum parâmetro
     *
     * Assertiva de saída
     * Os estados de titulo, subtitulo, corpo e autor devem ser populados com os dados
     * referentes ao id passado na url
     */
    async function fetch() {
      if (id) {
        /**
         * Se um id está presente na url da página,
         * é realizado um get no banco de dados com os dados
         * da notícia desejada
         */
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

  /**
   * clearFields - Função utilizada para limpar os campos do formulário após o envio do mesmo
   *
   * Assertiva de entrada
   * Não possui argumentos de entrada
   *
   * Assertiva de saída
   * Os dados da notícia no formulário devem ser limpos.
   *
   */
  function clearFields() {
    /**
     * Limpa o estado do título
     */
    setTitle('');
    /**
     * Limpa o estado do subtítulo
     */
    setSubtitle('');
    /**
     * Limpa o estado do corpo
     */
    setBody('');
    /**
     * Limpa o estado do autor
     */
    setAuthor('');
  }
  /**
   * handleSubmit - função responsável pelo envio dos dados do formulário
   * para o banco de dados
   *
   *
   * Assertiva de entrada
   * @param {*} e objeto do evento do formulário
   * e != null
   *
   * Assertiva de saída
   * Os dados da notícia devem ser salvos no firebase.
   * Além disso todos os campos devem ser limpos
   *
   */
  async function handleSubmit(e) {
    e.preventDefault();

    const db = firebase.firestore();
    const storage = firebase.storage();
    try {
      /**
       * Checagem para ver se alguma imagem foi carregada pelo usuário
       */
      if (acceptedFiles[0]) {
        /**
         * Caso o usuário tenha carregado a imagem,
         * a imagem é salva no storage e depois a url
         * do storage é relacionada com a notícia no firestore
         */
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
        /**
         * Caso o usuário não tenha carregado a imagem,
         * a noticía é salva no firestore sem imagem relacionada a ela
         */
        await db.collection('noticias').add({
          autor: author,
          corpo: body,
          subtitulo: subTitle,
          titulo: title,
        });
      }
      /**
       * Em caso de sucesso, todos os campos são limpos com a função clearFields
       */
      clearFields();
      alert('Notícia cadastrada com sucesso!');
    } catch (err) {
      /**
       * Em caso de erro, aviso de erro e console.log com o erro em si.
       */
      console.log(err);
      alert('Erro ao cadastrar notícia', err);
    }
  }

  /**
   * Retorno do componente.
   */

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
