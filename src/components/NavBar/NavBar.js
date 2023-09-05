import { Link } from 'react-router-dom';
import * as userService from '../../utilities/users-service';

import styles from './NavBar.module.css';

export default function NavBar({ user, setUser, coloured }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.logo} ${coloured && styles.colouredLogo}`}>
        <h1>The Mind Unpacker</h1>
      </div>
      <nav className={`${styles.links} ${coloured && styles.coloured}`}>
        <Link to="/">Home</Link>
        {user && (
          <>
            <Link to="/orders/new">Create Journal Entry</Link>
            <Link to="/orders/new">View Journal Entries</Link>
          </>
        )}
        <Link to="/login"> Enter The Mind Unpacker</Link>
        <Link to="/signup"> Join The Mind Unpacker</Link>
        {/* <span>Welcome, {user.name}</span> */}
        {user &&
          <Link to="" onClick={handleLogOut}>Leave The Mind Unpacker</Link>
        }
      </nav>
    </div>
  );
}