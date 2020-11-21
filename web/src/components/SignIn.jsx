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
    <div>
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
        <button type="submit">Entrar</button>
      </form>

      <Link to="/signup">
        <button type="button">Cadastrar</button>
      </Link>
    </div>
  );
};

export default SignIn;
