import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from './components/ThemeContext';
import RequireAuth from './components/RequireAuth';
import { Provider } from 'react-redux';
import store from './app/store'
import { AuthProvider } from './components/AuthContext';
import { UserRole } from './components/roles';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route element={<RequireAuth allowedRoles={Object.values(UserRole)} />} >
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
