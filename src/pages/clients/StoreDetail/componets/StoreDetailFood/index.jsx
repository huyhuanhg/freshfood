import { Affix, Col, Row, Select, Spin, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdRemoveShoppingCart } from 'react-icons/all';

import FoodDetailCarousel from '../../../../../components/clients/FoodDeatilCarousle';
import { FoodStore } from '../../../../../components/clients/FoodItem';
import { getFoodListAction, updateCartAction } from '../../../../../redux/actions';
import history from '../../../../../utils/history';

import * as StoreDetailStyle from '../../style';

const StoreDetailFood = ({ showFoodDetail, setShowLogin, setShowFoodDetail, slug }) => {
  const dispatch = useDispatch();
  const { foodList } = useSelector((state) => state.foodReducer);
  const { tagList } = useSelector((state) => state.tagReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const [foodId, setFoodId] = useState(null);
  const [filterFood, setFilterFood] = useState(null);
  const [foodIndex, setFoodIndex] = useState(0);
  const storeId = slug.slice(slug.lastIndexOf('.') + 1);

  useEffect(() => {
    const pathname = history.location.pathname;
    let filter = {};
    if (pathname.match('/promotion')) {
      filter = {
        group: 'promotion',
      };
    }
    setFilterFood(filter);
  }, [history.location.pathname]);

  useEffect(() => {
    if (filterFood && storeId) {
      dispatch(getFoodListAction({
        store: storeId,
        ...filterFood,
      }));
    }
  }, [filterFood]);
  const tagRender = ({ label, value, closable, onClose }) => {
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color='green'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
        value={value}
      >
        {label}
      </Tag>
    );
  };
  const renderTagList = () => {
    return tagList.data.map((tag) => {
      if (tag.tagActive === 1) {
        return {
          value: tag.id,
          label: tag.tagName,
        };
      }
    });
  };
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
    <div>
      <Affix offsetTop={59.188 + 54}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#ddd',
          }}
        >
          <StoreDetailStyle.StoreContentTitle>
            {history.location.pathname.match('/promotion') ? 'Khuyến mãi' : 'Đặt món'}
          </StoreDetailStyle.StoreContentTitle>
          {foodList.total > 0 &&
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

              <Select
                value={filterFood?.tags}
                mode='multiple'
                showArrow
                placeholder='Chọn danh mục'
                tagRender={tagRender}
                style={{ width: '370px' }}
                options={renderTagList()}
                maxTagCount={3}
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(value) => {
                  setFilterFood({
                    ...filterFood,
                    tags: value,
                  });
                }}
              />
            </li>
            <li>
              <Select
                defaultValue=''
                style={{ width: 160 }}
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(value) => {
                  setFilterFood({
                    ...filterFood,
                    sort: 'price',
                    sortType: value,
                  });
                }}
              >
                <Select.Option value='' selected hidden disabled>
                  -Giá-
                </Select.Option>
                <Select.Option value='1'>Giá tăng dần</Select.Option>
                <Select.Option value='-1'>Giá giảm dần</Select.Option>
              </Select>
            </li>
          </ul>
          }
        </div>
      </Affix>
      <StoreDetailStyle.StoreContent>
        <Row>
          {foodList.total === 0
            ?
            <Col
              span={24}
              style={{
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontSize: '150%',
                fontWeight: 'bold',
              }}
            >
              <div>
                <MdRemoveShoppingCart
                  style={{
                    color: 'red',
                    fontSize: '200%',
                  }}
                /><br />
                Không có món ăn nào!
              </div>
            </Col>
            :
            renderFoodList(12, foodList.load)
          }
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
                        isDisplayMessage: true,
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
    </div>
  );
};
export default StoreDetailFood;

StoreDetailFood.propTypes = {
  slug: PropTypes.string,
  showFoodDetail: PropTypes.bool,
  setShowLogin: PropTypes.func,
  setShowFoodDetail: PropTypes.func,
};
