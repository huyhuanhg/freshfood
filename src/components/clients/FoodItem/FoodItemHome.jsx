import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Skeleton, Space } from 'antd';
import NumberFormat from 'react-number-format';

import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as S from './style';

import foodLoading from '../../../assets/images/food_logo.png';
import { ROOT_PATH } from '../../../contants';
import { getFoodDetailAction } from '../../../redux/actions';
import handleStopPropagation from '../../../utils/common';

const MetaTitle = ({ name, store, slug }) => {
  return (
    <div>
      <S.FoodTitle>{name}</S.FoodTitle>
      <S.FoodStoreWrap to={`/stores/${slug}`} onClick={(e) => e.stopPropagation()}>
        <S.StoreName>{store}</S.StoreName>
      </S.FoodStoreWrap>
    </div>
  );
};

const MetaDescription = ({ price, discount }) => {
  return (
    <Space>
      <p>
        <S.AfterPrice>
          <NumberFormat
            value={discount}
            displayType={'text'}
            thousandSeparator
            suffix={'đ'}
          />
        </S.AfterPrice>
      </p>
      <p style={{ paddingLeft: 10 }}>
        <S.Price>
          {price > discount &&
          <NumberFormat
            value={price}
            displayType={'text'}
            thousandSeparator
            suffix={'đ'}
          />
          }
        </S.Price>
      </p>
    </Space>
  );
};
export const FoodItemHome = (
  {
    id,
    foodAvatar,
    foodName,
    storeId,
    storeName,
    storeNotMark,
    price,
    discount,
    load,
    setShowDetail,
    setShowLogin,
  },
) => {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  return (
    <S.CardItem
      hoverable
      cover={
        <S.CardImage avatar={load ? foodLoading : `${ROOT_PATH}${foodAvatar}`} />
      }
      onClick={() => {
        if (!load) {
          dispatch(
            getFoodDetailAction({
              data: {
                id,
              },
            }),
          );
          setShowDetail(true);
        }
      }}
    >
      <Skeleton loading={load} active>
        <Meta
          title={
            <MetaTitle
              name={foodName}
              store={storeName}
              slug={`${storeNotMark}.${storeId}`}
            />
          }
          description={
            <MetaDescription
              price={price}
              discount={discount}
            />
          }
          avatar={
            <S.AddCard
              onClick={(e) => {
                handleStopPropagation(e);
                if (!userInfo.data.id) {
                  setShowLogin(true);
                }
              }}
            >
              <ShoppingCartOutlined />
            </S.AddCard>
          }
        />
      </Skeleton>
    </S.CardItem>
  );
};

MetaTitle.propTypes = {
  name: PropTypes.string,
  store: PropTypes.string,
  slug: PropTypes.string,
};

MetaDescription.propTypes = {
  price: PropTypes.number,
  discount: PropTypes.number,
};

FoodItemHome.propTypes = {
  id: PropTypes.number,
  foodAvatar: PropTypes.string,
  foodName: PropTypes.string,
  storeId: PropTypes.number,
  storeName: PropTypes.string,
  storeNotMark: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.number,
  load: PropTypes.bool,
  setShowDetail: PropTypes.func,
  setShowLogin: PropTypes.func,
};
