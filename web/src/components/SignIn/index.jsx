import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  LoginButton, LoginForm, LoginInput, LoginText, Container, Content, SignUpLink,
} from './style';
import { useAuth } from '../../hooks/auth';

/**
 * Componente para a página de login
 * @component
 *
 */
const SignIn = () => {
  /**
   * Hook utilizada para a realização do login
   */
  const { signIn } = useAuth();
  /**
   * Variável utilizada para o roteamento
   */
  const history = useHistory();
  /**
   * Declara estado para a senha do usuário
   */
  const [password, setPassword] = useState('');
  /**
   * Declara estado para o email do usuário
   */
  const [email, setEmail] = useState('');

  /**
   * handleSubmit - função utilizada para submeter o formulário para o firebase
   *
   * Assertiva de entrada
   * @param {*} e event do formulário
   * e != null
   *
   * Assertiva de saída
   * Os dados devem ter sido enviados ao hook signIn onde é feita a verificação dos dados
   * juntamente com o firebase
   */
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signIn({
        email,
        password,
      });
      history.push('/registerNews');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Content>
        <LoginForm
          onSubmit={handleSubmit}
        >
          <LoginText>Área de notícias</LoginText>
          <LoginInput
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoginInput
            type="password"
            name="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton type="submit">
            Entrar
          </LoginButton>
          <Link style={{ textDecoration: 'none' }} to="/signup">
            <SignUpLink>Cadastrar</SignUpLink>
          </Link>

        </LoginForm>
      </Content>
    </Container>
  );
};

export default SignIn;
