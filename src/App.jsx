import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { supabase } from './supabaseClient';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Collection from './components/Collection.jsx';
import Item from './components/Item.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import FormCreateCollection from './pages/FormCreateCollection.jsx';
import FormCreateItem from './pages/FormCreateItem.jsx';
import AuthContext from './context/AuthContext.jsx';

import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('dark');

  // чтобы между рендерингами не вызывать функцию создания темы заново
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: currentTheme,
        },
      }),
    [currentTheme]
  );

  useEffect(() => {
    // попробовать получить текущую сессию
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // добавить подписку на изменение состояния сессии
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ supabase, session }}>
        {/* // взять часть адресной строки из переменной окружения */}
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={<MainLayout setCurrentTheme={setCurrentTheme} />}
              >
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="collections" element={<CollectionsPage />} />
                <Route path="collections/:title" element={<Collection />} />
                <Route path="items/:id" element={<Item />} />
                <Route
                  path="create-collection"
                  element={
                    <ProtectedRoute session={session}>
                      <FormCreateCollection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="create-item"
                  element={
                    <ProtectedRoute session={session}>
                      <FormCreateItem />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
