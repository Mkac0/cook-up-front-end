import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

import '../../App.css';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => !(username && password && password === passwordConf);

  const passwordMismatch = password && passwordConf && password !== passwordConf;

  return (
    <main className="auth-page">
      <section className="card auth-card">

        <header className="card-header">
          <h1 className="card-title">Create an account</h1>
          <p>{message}</p>
        </header>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <label htmlFor="username" className="label">Username</label>
            <input className="input"
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="password" className="label">Password</label>
            <input className="input"
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="confirm" className="label">Confirm password</label>
            <input
              className={`input ${passwordMismatch ? 'input-invalid' : ''}`}
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
            {passwordMismatch && (
              <p className="hint hint-error">Passwords don`t match.</p>
            )}
          </div>

          <div className="actions">
            <button className="btn btn-primary" disabled={isFormInvalid()}>
              Sign Up
            </button>
            <button className="btn btn-ghost"
              type="button"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignUpForm;
