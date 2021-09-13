import { Affix, Col, Menu, Row, Select, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as StoreDetailStyle from '../../style';
import FoodDetailCarousel from '../../../../../components/clients/FoodDeatilCarousle';
import { FoodStore } from '../../../../../components/clients/FoodItem';
import { getFoodListAction, updateCartAction } from '../../../../../redux/actions';

const StoreDetailFood = ({ showFoodDetail, setShowLogin, setShowFoodDetail, match }) => {
  const dispatch = useDispatch();
  const { foodList } = useSelector((state) => state.foodReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const [foodId, setFoodId] = useState(null);

  const [foodIndex, setFoodIndex] = useState(0);

  useEffect(() => {
    const store = match.params.slug.slice(match.params.slug.lastIndexOf('.') + 1);
    if (store) {
      dispatch(getFoodListAction({
        store,
      }));
    }
  }, []);

  const renderFoodList = (span = 6) => {
    return foodList.data.map((food, index) => {
      return (
        <Col span={span} key={food.id}>
          <FoodStore
            {...food}
            handleClick={setShowFoodDetail}
            index={index}
            setIndex={setFoodIndex}
            setShowLogin={setShowLogin}
            setFoodId={setFoodId}
          />
        </Col>
      );
    });
  };
  return (
    <>
      <Affix offsetTop={125} style={{ display: 'none' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#ddd',
          }}
        >
          <Menu
            mode='horizontal'
            defaultSelectedKeys={['mail']}
            style={{
              flexBasis: '50%',
            }}
          >
            <Menu.Item key='mail'>Mới nhất </Menu.Item>
            <Menu.Item key='app'>Đã lưu</Menu.Item>
          </Menu>
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
              paddingRight: '20px',
              margin: 0,
            }}
          >
            <li>
              <Select defaultValue={''} style={{ width: 160, margin: '0 5px' }}>
                <Select.Option value='' selected hidden disabled>
                  -Danh mục-
                </Select.Option>
                <Select.Option value='0'>Sang trọng</Select.Option>
                <Select.Option value='1'>Vỉa hè</Select.Option>
                <Select.Option value='2'>Buffet</Select.Option>
                <Select.Option value='3'>Nhà hàng</Select.Option>
                <Select.Option value='4'>Quán ăn</Select.Option>
                <Select.Option value='5'>Quán nhậu</Select.Option>
              </Select>
            </li>
            <li>
              <Select defaultValue='' style={{ width: 160 }}>
                <Select.Option value='' selected hidden disabled>
                  -Đánh giá-
                </Select.Option>
                <Select.Option value='0'>Đánh giá tăng dần</Select.Option>
                <Select.Option value='1'>Đánh giá giảm dần</Select.Option>
              </Select>
            </li>
          </ul>
        </div>
      </Affix>
      <StoreDetailStyle.StoreContent>
        <StoreDetailStyle.StoreContentTitle>
          Đặt món
        </StoreDetailStyle.StoreContentTitle>
        <Row>
          {renderFoodList(12, foodList.load)}
          {foodList.load && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Spin />
            </div>
          )}
          <StoreDetailStyle.ModalCustom
            closable={false}
            footer={
              <button
                onClick={() => {
                  if (!userInfo.data.id) {
                    setShowFoodDetail(false);
                    setShowLogin(true);
                  } else {
                    const userToken = localStorage.userInfo;
                    dispatch(updateCartAction({
                      data: {
                        accessToken: JSON.parse(userToken).accessToken,
                        food: foodId,
                      },
                    }));
                    setShowFoodDetail(false);
                  }
                }}
              >
                <span>+&nbsp;</span>Thêm vào giỏ
              </button>
            }
            visible={showFoodDetail}
            onCancel={() => setShowFoodDetail(false)}
          >
            <FoodDetailCarousel
              foodList={foodList.data}
              index={foodIndex}
              setIndex={setFoodIndex}
              setFoodId={setFoodId}
            />
          </StoreDetailStyle.ModalCustom>
        </Row>
        {foodList.currentPage < foodList.lastPage &&
        <div
          style={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <StoreDetailStyle.ViewOther>Xem thêm</StoreDetailStyle.ViewOther>
        </div>
        }

      </StoreDetailStyle.StoreContent>
    </>
  );
};
export default StoreDetailFood;

StoreDetailFood.propTypes = {
  showFoodDetail: PropTypes.bool,
  setShowLogin: PropTypes.func,
  setShowFoodDetail: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }),
};
