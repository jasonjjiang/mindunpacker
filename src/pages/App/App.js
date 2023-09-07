import { Routes, Route, } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import AllJournal from '../Journal/AllJournal';
import NewJournal from '../Journal/NewJournal';
import EditJournal from '../Journal/EditJournal';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthCtx';

export default function App() {

  const AuthCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {AuthCtx.isLoggedIn &&
        <>
          <Route path="/journal" element={<AllJournal />} />
          <Route path="/journal/new" element={<NewJournal />} />
          <Route path="/journal/edit/:id" element={<EditJournal />} />
        </>
      }
      {!AuthCtx.isLoggedIn && <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </>}
    </Routes>
  )
}
