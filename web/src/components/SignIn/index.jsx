import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  LoginButton, LoginForm, LoginInput, LoginText, Container, Content, SignUpLink,
} from './style';
import { useAuth } from '../../hooks/auth';

const SignIn = () => {
  const { signIn } = useAuth();
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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
