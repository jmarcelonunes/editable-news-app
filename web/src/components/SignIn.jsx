import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

const SignIn = () => {
  const { signIn } = useAuth();
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(email);
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
        <div
          style={{
            display: 'flex',
            width: 210,
            justifyContent: 'space-between',
          }}
        >
          <button style={{ width: 75 }} type="submit">
            Entrar
          </button>
          <Link to="/signup">
            <button type="button">Cadastrar</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
