import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import NotesList from '../Components/NotesList';
import Search from '../Components/Search';
import Header from '../Components/Header';
import '../index.css';
import img from '../Assets/logo_notesphere.png'

const Home = ({ loggedIn, setLoggedIn }) => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const loggedInUser = localStorage.getItem('loggedInUser');
  const navigate = useNavigate();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    const userNotes = JSON.parse(localStorage.getItem(loggedInUser)) || [];
    setNotes(userNotes);
  }, [loggedInUser]);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);

    const userNotes = JSON.parse(localStorage.getItem(loggedInUser)) || [];
    localStorage.setItem(loggedInUser, JSON.stringify([...userNotes, newNote]));
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);

    localStorage.setItem(loggedInUser, JSON.stringify(newNotes));
  };

  const editNote = (id, newText) => {
    const editedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(editedNotes);
    setSelectedNote(null);

    localStorage.setItem(loggedInUser, JSON.stringify(editedNotes));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedIn(false);
    navigate('/');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };
  return (
    <div>
      {loggedIn ? (
        <>
          <button onClick={handleLogout} className='button'>Logout</button>
          <div className='container'>
            <Header handleToggleDarkMode={setDarkMode} loggedInUser={loggedInUser} />
            <Search handleSearchNote={setSearchText} />
            <NotesList
              notes={notes.filter((note) =>
                note.text.toLowerCase().includes(searchText)
              )}
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
              handleEditNote={editNote}
              selectedNote={selectedNote}
              setSelectedNote={setSelectedNote}
            />
          </div>
        </>
         ) : (
          <>
          <p>Please login to access the home page</p>
          <button onClick={handleLoginClick} className='b1'>Login</button>
          
          </>
         )}
    </div>
  );
};

export default Home;