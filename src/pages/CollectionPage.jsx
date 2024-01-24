import { useParams } from 'react-router-dom';

const CollectionPage = () => {
  const { id } = useParams();
  return <div>CollectionPage {id}</div>;
};

export default CollectionPage;
