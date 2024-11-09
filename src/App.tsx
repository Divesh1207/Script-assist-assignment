

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Login from './components/Login';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import { useAuthStore } from './store/app.store';

import ProtectedRoute from './components/route/ProtectedRoute';
 
import './App.scss';
import Layout from './components/Layout';

const queryClient = new QueryClient();

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {
            customPinkPurple: ['#f7e8ff'], 
          },
          globalStyles: () => ({
            body: {
              background: 'linear-gradient(135deg, #8e2de2 0%, #7741e3 100%)', // Gradient background
              fontFamily: 'Arial, sans-serif',
              margin: 0,
              padding: 0,
              boxSizing: 'border-box',
            },
          }),
        }}
      >
        <Router>
          <Routes>
             
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/characters" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/characters" replace /> : <Login />}
            />
             
            <Route element={<Layout />}>
              <Route
                path="/characters"
                element={
                  <ProtectedRoute>
                    <CharacterList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/character/:id"
                element={
                  <ProtectedRoute>
                    <CharacterDetail />
                  </ProtectedRoute>
                }
              />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </MantineProvider>
    </QueryClientProvider>
  );
}
