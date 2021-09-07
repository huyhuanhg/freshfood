import { TITLE } from '../../../../contants';
import FoodPage from '../components/FoodPage';
import PropTypes from 'prop-types';

function FavoritesList({ match }) {
  document.title = TITLE.FAVORITES_LIST;
  return (
    <FoodPage match={match} />
  );
}

export default FavoritesList;

FavoritesList.propTypes = {
  match: PropTypes.object.isRequired,
};
