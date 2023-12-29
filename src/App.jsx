import { useState } from "react";
// import './App.css'
import PrimarySearchAppBar from "./components/Header";
import ItemsList from './components/ItemsList';
import items from "./items";
import the_biggest_collections from "./the_biggest_collections"
import CollectionsList from "./components/CollectionsList"

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <PrimarySearchAppBar />
            <ItemsList items={ items }></ItemsList>
            <CollectionsList collections={ the_biggest_collections }></CollectionsList>
        </>
    );
}

export default App;
