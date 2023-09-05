import React from 'react'
import styles from './Home.module.css';
import NavBar from '../../components/NavBar/NavBar';

function Home() {
  return (
    <div className={styles.container}>
      <NavBar />
    </div>
  )
}

export default Home