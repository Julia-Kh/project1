import { useParams } from 'react-router-dom';

const ItemPage = () => {
  const { id } = useParams();
  return <div>ItemPage {id}</div>;
};

export default ItemPage;
