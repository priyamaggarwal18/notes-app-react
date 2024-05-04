import React from 'react';
import './ImageComponent.css'; // Import the CSS file
import exampleImage from '../Assets/illustration.png';
import image from '../Assets/logo_notesphere.png';
import { useNavigate } from 'react-router-dom';
function ImageComponent() {
  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate('/signup');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };


  return (
    <div className="image-container">
      
      <div className="text-container">
        
        <img src={image} alt="LOGO" className='notesphere'></img>
        
        <h1>Capture, organize, and explore your thoughts effortlessly.</h1>
        <br></br>
        <p>
          Whether you're a student, professional, or creative soul, NoteSphere
          empowers you to craft, refine, and share your ideas with ease. Join us
          today and elevate your note-taking experience to new heights of
          productivity and creativity.
        </p>
        <div className="button-container">
          <button className='signup' onClick={handleSignupClick}>Signup</button>
          <button className='login' onClick={handleLoginClick}>Login</button>
        </div>
        
      </div>
      <img src={exampleImage}  alt="Notesphere" className='logoimg'/>
    </div>
  );
}

export default ImageComponent;