import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

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

    return (
        <div className='note'>
            {isEditing ? (
                <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                />
            ) : (
                <span>{text}</span>
            )}
            <div className='note-footer'>
                <small>{date}</small>
                <div className="button-container">
                {isEditing ? (
                    <button className='save' onClick={handleSaveClick}>Save</button>
                ) : (
                    <button onClick={handleEditClick} className='edit-button'>Edit</button>
                )}
                <MdDeleteForever
                    onClick={() => handleDeleteNote(id)}
                    className='delete-icon'
                    size='1.3em'
                />
                </div>
            </div>
        </div>
    );
};

export default Note;
