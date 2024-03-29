import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { supabase } from './supabaseClient';
import { CssBaseline } from '@mui/material';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import ItemsPage from './pages/ItemsPage.jsx';
import CollectionPage from './pages/CollectionPage.jsx';
import ItemPage from './pages/ItemPage.jsx';
import AuthContext from './context/AuthContext.jsx';
import MyCollections from './pages/MyCollections.jsx';
import CreateCollectionPage from './pages/CreateCollectionPage.jsx';
import CreateItemPage from './pages/CreateItemPage.jsx';
import EditCollectionPage from './pages/EditCollectionPage.jsx';
import EditItemPage from './pages/EditItemPage.jsx';

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
      <CssBaseline />
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
                <Route
                  path="login"
                  element={<Login currentTheme={currentTheme} />}
                />
                <Route path="error" element={<ErrorPage />} />
                <Route path="collections" element={<CollectionsPage />} />
                <Route path="items" element={<ItemsPage />} />
                <Route path="collections/:id" element={<CollectionPage />} />
                <Route path="items/:id" element={<ItemPage />} />
                <Route
                  path="my-collections"
                  element={
                    <ProtectedRoute session={session}>
                      <MyCollections />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="create-collection"
                  element={
                    <ProtectedRoute session={session}>
                      <CreateCollectionPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="create-item"
                  element={
                    <ProtectedRoute session={session}>
                      <CreateItemPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="edit-collection/:id"
                  element={
                    <ProtectedRoute session={session}>
                      <EditCollectionPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="edit-item/:id"
                  element={
                    <ProtectedRoute session={session}>
                      <EditItemPage />
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
