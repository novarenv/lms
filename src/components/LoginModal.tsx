import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => void;
  errorMessage?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
  disabledButtonColor?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  errorMessage = '',
  buttonColor = '#5264AE',
  buttonHoverColor = '#6373b6',
  disabledButtonColor = '#a8b1d6'
}) => {
  const [isLoginView, setIsLoginView] = useState(true);

  if (!isOpen) return null;

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        'Password must contain at least one letter and one number'
      ),
    email: !isLoginView ? Yup.string()
      .email('Invalid email format')
      .required('Email is required') : Yup.string(),
    confirmPassword: !isLoginView ? Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required') : Yup.string()
  });

  const handleSubmit = (values: {username: string, password: string}) => {
    if (isLoginView) {
      onLogin(values.username, values.password);
    } else {
      // Handle signup logic here
      console.log('Signup:', values.username, values.password);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <button className="closeButton" onClick={onClose}>×</button>
        
        <div className="modalHeader">
          <h2>{isLoginView ? 'Login' : 'Sign Up'}</h2>
          <div className="modalTabs">
            <button 
              className={isLoginView ? 'activeTab' : 'inactiveTab'} 
              onClick={() => setIsLoginView(true)}
            >
              Login
            </button>
            <button 
              className={!isLoginView ? 'activeTab' : 'inactiveTab'} 
              onClick={() => setIsLoginView(false)}
            >
              Sign Up
            </button>
          </div>
        </div>

        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty }) => (
            <Form className="modalForm">
              <div className="formGroup">
                <label htmlFor="username">Username</label>
                <Field 
                  type="text" 
                  name="username" 
                  id="username" 
                  className="formControl" 
                />
                <ErrorMessage name="username" component="div" className="errorMessage" />
              </div>

              {!isLoginView && (
                <div className="formGroup">
                  <label htmlFor="email">Email</label>
                  <Field 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="formControl" 
                  />
                  <ErrorMessage name="email" component="div" className="errorMessage" />
                </div>
              )}

              <div className="formGroup">
                <label htmlFor="password">Password</label>
                <Field 
                  type="password" 
                  name="password" 
                  id="password" 
                  className="formControl" 
                />
                <ErrorMessage name="password" component="div" className="errorMessage" />
              </div>

              {!isLoginView && (
                <div className="formGroup">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Field 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword" 
                    className="formControl" 
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="errorMessage" />
                </div>
              )}

              {errorMessage && <div className="authError">{errorMessage}</div>}

              <button
                type="submit"
                className="submitButton"
                disabled={!(isValid && dirty)}
                style={{
                  backgroundColor: isValid && dirty ? buttonColor : disabledButtonColor,
                }}
              >
                {isLoginView ? 'Login' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginModal;