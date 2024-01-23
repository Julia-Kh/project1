import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Collection from './components/Collection';
import Item from './components/Item';
import CollectionsPage from './pages/CollectionsPage';
import FormCreateCollection from './pages/FormCreateCollection'

import './App.css';

function App() {
  return (
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
            <Route path="create-collection" element={<FormCreateCollection />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
