import LastItems from '../components/LastItems';
import WordCloud from '../components/Wordcloud';
import BiggestCollections from '../components/BiggestCollections';

const Home = () => {
  return (
    <>
      <LastItems />
      <BiggestCollections />
      <WordCloud width={400} height={400}></WordCloud>
    </>
  );
};

export default Home;
