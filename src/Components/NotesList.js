import React, { useState } from 'react';
import AddNote from './AddNote';
const Note = ({ id, text, date, handleDeleteNote, handleEditNote }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedText, setEditedText] = useState(text);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		handleEditNote(id, editedText);
		setIsEditing(false);
	};
	const currentDate = new Date().toLocaleDateString();

	return (
		<div className='note'>
			<span>{currentDate}</span>
			<div>
				{isEditing ? (
					<>
						<textarea
							value={editedText}
							onChange={(e) => setEditedText(e.target.value)}
						/>
						<button onClick={handleSaveClick}>Save</button>
					</>
				) : (
						<textarea value={text}></textarea>
				)}
			</div>
			<div className='footer-button'>
			<button onClick={handleEditClick} className='editbutton'>Edit</button>
			<button onClick={() => handleDeleteNote(id)}className='deletebutton'>Delete</button>
			</div>
		</div>
	);
};

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
	handleEditNote,
}) => {
	return (
		<div className='notes-list'>
			{notes.map((note) => (
				<Note
					key={note.id}
					id={note.id}
					text={note.text}
					date={note.date}
					handleDeleteNote={handleDeleteNote}
					handleEditNote={handleEditNote}
				/>
			))}
			<AddNote handleAddNote={handleAddNote} />
		</div>
	);
};

export default NotesList;