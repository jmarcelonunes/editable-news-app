import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { useAuth } from '../../hooks/auth';
import {
  SignUpButton, SignUpForm, SignUpText, Container, Content,
} from './style';

/**
 * Componente para a página de cadastro de usuário
 * @component
 *
 */
const SignUp = () => {
  const { signUp } = useAuth();
  /**
   * Declara estado para o username do usuário
   */
  const [userName, setUserName] = useState('');
  /**
   * Declara estado para a senha do usuário
   */
  const [password, setPassword] = useState('');
  /**
   * Declara estado para o email do usuário
   */
  const [email, setEmail] = useState('');

  /**
   * handleSubmit - função responsável pelo envio do formulário de cadastro de usuário
   *
   * Assertiva de entrada
   * @param {*} e evento do formulário
   * e != null
   *
   * Assertiva de saída
   * Deve-se esperar que os dados do formulário sejam enviados para o hook signUp
   * responsável pelo cadastro de usuário no firebase. Feito isso, caso o resultado seja positivo,
   * o usuário possuirá um login disponível.
   */
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await signUp({
        email,
        password,
        userName,
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Retorno do componente contendo o formulário do cadastro de usuários.
   */
  return (
    <Container>
      <Content>
        <SignUpForm
          onSubmit={handleSubmit}
        >
          <SignUpText>Cadastrar</SignUpText>
          <TextField
            id="email-signup"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: 20, width: '100%' }}
          />
          <TextField
            id="name-signup"
            label="Nome"
            variant="outlined"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ marginBottom: 20, width: '100%' }}
          />
          <TextField
            type="password"
            id="password-signup"
            label="Senha"
            value={password}
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 20, width: '100%' }}
          />
          <SignUpButton color="inherit" type="submit">
            Cadastrar
          </SignUpButton>
        </SignUpForm>
      </Content>
    </Container>
  );
};

export default SignUp;
