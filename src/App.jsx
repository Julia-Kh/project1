import { useState } from "react";
// import './App.css'
import PrimarySearchAppBar from "./components/Header";
import ItemsList from './components/ItemsList';
import items from "./items";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <PrimarySearchAppBar />
            <ItemsList items={ items }></ItemsList>
        </>
    );
}

export default App;
