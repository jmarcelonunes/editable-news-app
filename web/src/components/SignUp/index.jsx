import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import {
  SignUpButton, SignUpForm, SignUpText, Container, SignUpInput, Content,
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
          <SignUpInput
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SignUpInput
            type="text"
            name="name"
            placeholder="Nome"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <SignUpInput
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SignUpButton type="submit">Cadastrar</SignUpButton>
        </SignUpForm>
      </Content>
    </Container>
  );
};

export default SignUp;
