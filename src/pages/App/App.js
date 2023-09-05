import { Routes, Route, } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import AllJournal from '../Journal/AllJournal';
import NewJournal from '../Journal/NewJournal';
import EditJournel from '../Journal/EditJournal';

export default function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/journal" element={<AllJournal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/journal/new" element={<NewJournal />} />
      <Route path="/journal/edit/:id" element={<EditJournel />} />
    </Routes>
  )
}
