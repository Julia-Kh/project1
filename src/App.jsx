import { useState } from 'react';
// import './App.css'
import PrimarySearchAppBar from './components/Header';
import ItemsList from './components/ItemsList';
import items from './items';
import the_biggest_collections from './the_biggest_collections';
import CollectionsList from './components/CollectionsList';
import Example from './components/Wordcloud';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PrimarySearchAppBar />
      <ItemsList items={items}></ItemsList>
      <CollectionsList collections={the_biggest_collections}></CollectionsList>
      <Example width={400} height={400}></Example>
    </>
  );
}

export default App;
