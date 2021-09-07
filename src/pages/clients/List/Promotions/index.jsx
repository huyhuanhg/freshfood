import { TITLE } from '../../../../contants';
import FoodPage from '../components/FoodPage';

function Promotions() {
  document.title = TITLE.PROMOTIONS;
  return (
    <FoodPage />
  );
}

export default Promotions;
