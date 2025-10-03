import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

import '../../App.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="auth-page">
      <section className="card auth-card">
        <header className="card-header">
          <h1 className="card-title">Welcome back!</h1>
          {message?.trim() && (
            <p className="alert alert-error">{message}</p>
          )}
        </header>

        <form autoComplete="off" onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <label htmlFor="username" className="label">Username</label>
            <input className="input"
              type="text"
              id="username"
              value={formData.username}
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
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="actions">
            <button className="btn btn-primary" type="submit">Sign In</button>
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

export default SignInForm;