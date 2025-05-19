import React, { useState } from 'react';
import LoginModal from '../../components/LoginModal';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const navigate = useNavigate();
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setAuthError('');
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleLogin = (username: string, password: string) => {
    console.log('Login attempt:', username, password);
    
    // Mock authentication - replace with your actual authentication logic
    if (username === 'admin' && password === 'password123') {
      setAuthError('');
      setIsModalOpen(false);
      navigate('/about')
    } else {
      setAuthError('Invalid username or password');
    }
  };
  
  return (
    <div className="app">
      <header>
        <h1>My React Application</h1>
        <button onClick={handleOpenModal}>Login</button>
      </header>
      
      <LoginModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLogin={handleLogin}
        errorMessage={authError}
        buttonColor="#5264AE"
        buttonHoverColor="#6373b6"
        disabledButtonColor="#a8b1d6"
      />
    </div>
  );
};

export default Login;