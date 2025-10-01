import { useContext } from 'react';
import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className='site-header'>
      <Link to="/" className='brand'>Cook<span>'</span>Up</Link>
      {user ? (
        <ul className="nav-items">
          <li><Link to='/recipe/new'>Generate Recipe</Link></li>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/" onClick={handleSignOut}>Sign Out</Link></li>
        </ul>
      ) : (
        <ul className='nav-items'>
          <li><Link to='/sign-in' className='sign-in-nav'>Sign In</Link></li>
          <li><Link to='/sign-up' className='sign-up-nav'>Sign Up</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
