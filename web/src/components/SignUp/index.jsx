import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import {
  SignUpButton, SignUpForm, SignUpText, Container, SignUpInput, Content,
} from './style';

const SignUp = () => {
  const { signUp } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

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
