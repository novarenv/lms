// actions/userActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFailure, logout, updateUser } from '../reducers/user/user';
import { User } from '../../components/roles';

// Define Credentials interface
export interface Credentials {
  username: string;
  password: string;
}

// Standard thunk action for login
export const loginUser = (credentials: Credentials) => {
  return async (dispatch: any) => {
    dispatch(loginRequest());
    try {
      // Replace with your actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const user = await response.json() as User;
      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  };
};

// Alternative: Using createAsyncThunk
export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return await response.json() as User;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Unknown error occurred'
      );
    }
  }
);

// Logout action
export const logoutUser = () => {
  return (dispatch: any) => {
    // Perform any logout operations like clearing tokens
    localStorage.removeItem('token'); // If you're using token-based auth
    dispatch(logout());
  };
};

// Update user profile
export const updateUserProfile = (userData: Partial<User>) => {
  return async (dispatch: any) => {
    try {
      // Replace with your API call to update user profile
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // If using token auth
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json() as User;
      dispatch(updateUser(updatedUser));
      return updatedUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      // You might want to dispatch a specific failure action for updates
      console.error('Update profile error:', errorMessage);
      throw error;
    }
  };
};

// Check authentication status (useful when app loads)
export const checkAuthStatus = () => {
  return async (dispatch: any) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return dispatch(logout());
    }
    
    dispatch(loginRequest());
    try {
      // Replace with your API call to validate token and get user data
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Session expired');
      }

      const user = await response.json() as User;
      dispatch(loginSuccess(user));
      return user;
    } catch (error) {
      localStorage.removeItem('token');
      dispatch(loginFailure('Session expired. Please login again.'));
    }
  };
};