import React, { useState } from 'react';
import { useAuth } from '../hooks/auth';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default SignUp;
