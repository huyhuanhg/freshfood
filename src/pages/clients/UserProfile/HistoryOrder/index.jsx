import { MdRemoveShoppingCart } from 'react-icons/all';
import * as S from '../style';

const HistoryOrder = () => {
  return (
    <S.ProfileEmpty>
      <div>
        <MdRemoveShoppingCart />
      </div>
      <div>Lịch sử giao dịch trống</div>
    </S.ProfileEmpty>
  );
};
export default HistoryOrder;
