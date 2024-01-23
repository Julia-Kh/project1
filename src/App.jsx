import BiggestCollections from './components/BiggestCollections';
import PrimarySearchAppBar from './components/Header';
import LastItems from './components/LastItems';
import Example from './components/Wordcloud';

function App() {
  return (
    <>
      <PrimarySearchAppBar />
      <LastItems />
      <BiggestCollections />
      <Example width={400} height={400}></Example>
    </>
  );
}

export default App;
