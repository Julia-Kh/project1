import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Collection from './components/Collection.jsx';
import Item from './components/Item.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import FormCreateCollection from './pages/FormCreateCollection.jsx';
import AuthContext from './context/AuthContext.jsx';
import './App.css';

function App() {
  return (
    <AuthContext.Provider value={{ supabase, session: null }}>
      // взять часть адресной строки из переменной окружения
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="collections" element={<CollectionsPage />} />
              <Route path="collections/:title" element={<Collection />} />
              <Route path="items/:id" element={<Item />} />
              <Route
                path="create-collection"
                element={<FormCreateCollection />}
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
