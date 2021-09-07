import { TITLE } from '../../../../contants';
import FoodPage from '../components/FoodPage';

function FoodList() {
  document.title = TITLE.FOOD_LIST;
  return (
    <FoodPage />
  );
}

export default FoodList;
