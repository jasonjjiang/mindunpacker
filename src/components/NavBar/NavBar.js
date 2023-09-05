import { useContext } from 'react';
import AuthContext from '../../contexts/AuthCtx';

import { Link, useNavigate } from 'react-router-dom';

import styles from './NavBar.module.css';

export default function NavBar({ coloured }) {

  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogOut() {
    AuthCtx.logout();
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.logo} ${coloured && styles.colouredLogo}`}>
        <h1>The Mind Unpacker</h1>
      </div>
      <nav className={`${styles.links} ${coloured && styles.coloured}`}>
        <Link to="/">Home</Link>
        {AuthCtx.isLoggedIn && (
          <>
            <Link to="/journal/new">Create Journal Entry</Link>
            <Link to="/journal">View Journal Entries</Link>
          </>
        )}
        {!AuthCtx.isLoggedIn &&
          <>
            <Link to="/login">Enter The Mind Unpacker</Link>
            <Link to="/signup"> Join The Mind Unpacker</Link>
          </>
        }
        {/* <span>Welcome, {user.name}</span> */}
        {AuthCtx.isLoggedIn &&
          <Link to="" onClick={handleLogOut}>Leave The Mind Unpacker</Link>
        }
      </nav>
    </div>
  );
}