import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './NotesList';
import Search from './Search';
import Header from './Header';
import '../index.css';

function Main() {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userNotes = JSON.parse(localStorage.getItem(loggedInUser)) || [];
    setNotes(userNotes);
  }, []);

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

    const loggedInUser = localStorage.getItem('loggedInUser');
    const userNotes = JSON.parse(localStorage.getItem(loggedInUser)) || [];
    localStorage.setItem(loggedInUser, JSON.stringify([...userNotes, newNote]));
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    const loggedInUser = localStorage.getItem('loggedInUser');
    // const userNotes = JSON.parse(localStorage.getItem(loggedInUser)) || [];
    localStorage.setItem(loggedInUser, JSON.stringify(newNotes));
  };

  const editNote = (id, newText) => {
    const editedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(editedNotes);
    setSelectedNote(null);
    const loggedInUser = localStorage.getItem('loggedInUser');
    localStorage.setItem(loggedInUser, JSON.stringify(editedNotes));
  };

  return (
    <div>
      <div className='container'>
        <Header handleToggleDarkMode={setDarkMode} />
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
    </div>
  );
};

export default Main;