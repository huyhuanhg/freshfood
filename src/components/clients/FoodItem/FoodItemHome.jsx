import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Skeleton, Space } from 'antd';
import NumberFormat from 'react-number-format';

import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as S from './style';

import storeLoading from '../../../assets/images/loadStore.png';
import { ROOT_PATH } from '../../../contants';
import { getFoodDetailAction } from '../../../redux/actions';
import handleStopPropagation from '../../../utils/common';

const MetaTitle = ({ name, store, slug }) => {
  return (
    <>
      <S.FoodTitle>{name}</S.FoodTitle>
      <S.FoodStoreWrap to={`/stores/${slug}`} onClick={(e) => e.stopPropagation()}>
        <S.StoreName>{store}</S.StoreName>
      </S.FoodStoreWrap>
    </>
  );
};

const MetaDescription = ({ price, priceAfter }) => {
  return (
    <Space>
      <p>
        <S.AfterPrice>
          <NumberFormat
            value={priceAfter}
            displayType={'text'}
            thousandSeparator
            suffix={'đ'}
          />
        </S.AfterPrice>
      </p>
      <p style={{ paddingLeft: 10 }}>
        <S.Price>
          <NumberFormat
            value={price}
            displayType={'text'}
            thousandSeparator
            suffix={'đ'}
          />
        </S.Price>
      </p>
    </Space>
  );
};
export const FoodItemHome = ({
  id,
  foodAvatar,
  foodName,
  storeId,
  storeName,
  storeNotMark,
  price,
  discount,
  loading,
  setShowDetail,
  setShowLogin,
}) => {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userReducer);
  return (
    <S.CardItem
      hoverable
      cover={
        <S.CardImage avatar={loading ? storeLoading : `${ROOT_PATH}${foodAvatar}`} />
      }
      onClick={() => {
        if (!loading) {
          dispatch(
            getFoodDetailAction({
              data: {
                id,
              },
            })
          );
          setShowDetail(true);
        }
      }}
    >
      <Skeleton loading={loading} active>
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
              price={discount?.value && price}
              priceAfter={discount?.value ? discount?.value : price}
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
  priceAfter: PropTypes.number,
};

FoodItemHome.propTypes = {
  id: PropTypes.number,
  foodAvatar: PropTypes.string,
  foodName: PropTypes.string,
  storeId: PropTypes.number,
  storeName: PropTypes.string,
  storeNotMark: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.shape({
    value: PropTypes.number
  }),
  loading: PropTypes.bool,
  setShowDetail: PropTypes.func,
  setShowLogin: PropTypes.func,
};
