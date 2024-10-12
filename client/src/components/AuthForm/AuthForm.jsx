import { useState } from 'react';
import './AuthForm.css'; 

const AuthForm = ({ authAction, mode = 'login' }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (ev) => {
    ev.preventDefault();
    try {
      await authAction({ username, password }, mode);
      setError(''); 
    } catch (ex) {
      setError(ex.error || 'Something went wrong');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit}>
        {error && <div className="error">{error}</div>}
        <div className="input-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            placeholder="Enter your username"
            onChange={(ev) => setUsername(ev.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;