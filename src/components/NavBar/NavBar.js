import { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthCtx';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

import styles from './NavBar.module.css';

export default function NavBar({ coloured }) {

  const AuthCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [opened, setOpened] = useState();

  const clickHandler = () => {
    setOpened((prev) => !prev)
  }


  function handleLogOut() {
    AuthCtx.logout();
    navigate("/");
  }

  return (
    <div className={`${styles.container} ${coloured && styles.coloured}`}>
      <div className={styles.res}>
        <div className={`${styles.logo}`}>
          <h1>The Mind Unpacker</h1>
        </div>
        <button className={styles.resBtn} onClick={clickHandler} >
          <div className={styles.barsContainer}>
            <MenuIcon sx={{ color: 'white' }} />
          </div>
        </button>
      </div>
      <nav className={`${styles.links} ${opened ? styles.opened : styles.closed}`}>
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
          <Link to="/" onClick={handleLogOut}>Leave The Mind Unpacker</Link>
        }
      </nav>
    </div>
  );
}