import { useState } from 'react';
import { Routes, Route, } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import Home from '../Home/Home';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import AllJournal from '../Journal/AllJournal';

export default function App() {

  const [user, setUser] = useState(getUser());

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/journal" element={<AllJournal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}
