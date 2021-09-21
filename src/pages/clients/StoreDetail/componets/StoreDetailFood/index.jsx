import { Affix, Col, Row, Select, Spin, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdRemoveShoppingCart } from 'react-icons/all';

import FoodDetailCarousel from '../../../../../components/clients/FoodDeatilCarousle';
import { FoodStore } from '../../../../../components/clients/FoodItem';
import { getFoodListAction, updateCartAction } from '../../../../../redux/actions';
import history from '../../../../../utils/history';
import { Filter as FilterStyle } from '../../../../../styles';

import * as StoreDetailStyle from '../../style';

const StoreDetailFood = ({ showFoodDetail, setShowLogin, setShowFoodDetail, slug }) => {
  const dispatch = useDispatch();
  const {
    foodList: {
      currentPage,
      data: foodData,
      lastPage,
      load: foodLoad,
      total,
    },
  } = useSelector(({ foodReducer }) => foodReducer);
  const { tagList: { data: tagList } } = useSelector(({ tagReducer }) => tagReducer);
  const { userInfo: { data: { id: userId } } } = useSelector(({ userReducer }) => userReducer);
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
        page: 1,
      };
    }
    setFilterFood(filter);
  }, [history.location.pathname]);

  useEffect(() => {
    if (filterFood && storeId) {
      dispatch(getFoodListAction({
        store: storeId,
        page: 1,
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
    return tagList.map(({ id, tagActive, tagName }) => {
      if (tagActive === 1) {
        return {
          value: id,
          label: tagName,
        };
      }
    });
  };
  const renderFoodList = (span = 6) => {
    return foodData.map((food, index) => {
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
        <FilterStyle>
          <StoreDetailStyle.StoreFilterTitle>
            {history.location.pathname.match('/promotion') ? 'Khuyến mãi' : 'Đặt món'}
          </StoreDetailStyle.StoreFilterTitle>
          {total > 0 &&
          <ul className='d-flex vertical-center m-0 pr-2r'>
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
                    page: 1,
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
                    page: 1,
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
        </FilterStyle>
      </Affix>
      <StoreDetailStyle.StoreContent>
        <Row>
          {total === 0
            ?
            <Col
              className='d-flex horizontal-center vertical-center t-center fw-b'
              span={24}
              style={{
                minHeight: '200px',
                fontSize: '150%',
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
            renderFoodList(12, foodLoad)
          }
          {foodLoad && (
            <div className='d-flex horizontal-center vertical-center' style={{ width: '100%' }}>
              <Spin />
            </div>
          )}
          <StoreDetailStyle.ModalCustom
            closable={false}
            footer={
              <button
                onClick={() => {
                  if (!userId) {
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
              foodList={foodData}
              index={foodIndex}
              setIndex={setFoodIndex}
              setFoodId={setFoodId}
            />
          </StoreDetailStyle.ModalCustom>
        </Row>
        {currentPage < lastPage &&
        <div className='d-flex horizontal-center vertical-center mt-3r'>
          <StoreDetailStyle.ViewOther
            onClick={() => setFilterFood({
              ...filterFood,
              page: currentPage + 1,
            })}
          >
            Xem thêm
          </StoreDetailStyle.ViewOther>
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
