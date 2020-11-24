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
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'lightgray',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderRadius: 4,
          borderColor: 'black',
          alignSelf: 'center',
          padding: 20,
        }}
        onSubmit={handleSubmit}
      >
        <h2>Login</h2>
        <input
          style={{ width: 200, marginBottom: 20 }}
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ width: 200, marginBottom: 20 }}
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          style={{ width: 200, marginBottom: 20 }}
          type="text"
          name="name"
          placeholder="Nome"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default SignUp;
