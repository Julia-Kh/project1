import LastItems from '../components/LastItems';
import Example from '../components/Wordcloud';
import BiggestCollections from '../components/BiggestCollections';

const Home = () => {
  return (
    <>
      <LastItems />
      <BiggestCollections />
      <Example width={400} height={400}></Example>
    </>
  );
};

export default Home;
