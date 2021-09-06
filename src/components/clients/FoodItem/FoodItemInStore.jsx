import NumberFormat from 'react-number-format';

import { BsImage, HiShoppingCart } from 'react-icons/all';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ROOT_PATH } from '../../../contants';
import * as S from './style';

export const FoodStore = ({
  foodAvatar,
  foodName,
  foodDescription,
  totalOrder,
  price,
  discount,
  loading,
  handleClick,
  setIndex,
  index,
  setShowLogin,
}) => {
  const { userInfo } = useSelector((state) => state.userReducer);
  return (
    <S.FoodStore
      onClick={() => {
        handleClick(true);
        setIndex(index);
      }}
    >
      <S.FoodStoreAvatar>
        {loading ? <BsImage /> : <img src={`${ROOT_PATH}${foodAvatar}`} />}
      </S.FoodStoreAvatar>
      <S.FoodStoreItemRight>
        <S.SkeletonCustom loading={loading} active>
          <S.FoodStoreTitle>{foodName}</S.FoodStoreTitle>
          <S.FoodStoreDescription>{foodDescription}</S.FoodStoreDescription>
          <p>
            <S.TotalOrder>Lượt đặt: {totalOrder}</S.TotalOrder>
          </p>
          <S.FoodStorePrice>
            <div className="price-discount">
              <NumberFormat
                value={discount?.value ?? price}
                displayType={'text'}
                thousandSeparator
                suffix={'đ'}
              />
            </div>
            <span className="price">
              <NumberFormat
                value={discount?.value ? discount?.value : price}
                displayType={'text'}
                thousandSeparator
                suffix={'đ'}
              />
            </span>
            <span
              className="btn-adding"
              onClick={(e) => {
                e.stopPropagation();
                if (!userInfo.data.id) {
                  setShowLogin(true);
                }
              }}
            >
              <HiShoppingCart />
            </span>
          </S.FoodStorePrice>
        </S.SkeletonCustom>
      </S.FoodStoreItemRight>
    </S.FoodStore>
  );
};

FoodStore.propTypes = {
  foodAvatar: PropTypes.string,
  foodName: PropTypes.string,
  foodDescription: PropTypes.string,
  totalOrder: PropTypes.number,
  price: PropTypes.number,
  discount: PropTypes.number,
  loading: PropTypes.bool,
  handleClick: PropTypes.func,
  setIndex: PropTypes.func,
  index: PropTypes.number,
  setShowLogin: PropTypes.func,
};
