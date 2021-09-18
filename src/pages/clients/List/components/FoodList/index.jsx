import { Button, Row, Col, Menu, Select, Spin, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as S from '../../style';
import { MdRemoveShoppingCart } from 'react-icons/all';
import { FoodItemHome } from '../../../../../components/clients/FoodItem';
import history from '../../../../../utils/history';
import { useEffect, useState } from 'react';
import { getFoodListAction, getLikesAction } from '../../../../../redux/actions';
import FoodDetailModal from '../../../../../components/clients/FoodDetailModal';
import PropTypes from 'prop-types';

const FoodList = ({ setShowLogin }) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [showFoodDetail, setShowFoodDetail] = useState(false);
  const { foodList } = useSelector((state) => state.foodReducer);
  const { tagList } = useSelector((state) => state.tagReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const [filterActive, setFieldActive] = useState('created_at');
  const [sortPriceType, setSortPriceType] = useState('');

  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (userInfo.data.id) {
      let foodIds = [];
      const { accessToken } = JSON.parse(localStorage.userInfo);
      if (!foodList.likeLoaded && foodList.data.length > 0) {
        foodIds = foodList.data.map((foodItem) => {
          return foodItem.id;
        });
        dispatch(getLikesAction({
          accessToken,
          data: { foodIds },
        }));
      }
    }
  }, [userInfo, foodList]);

  useEffect(() => {
    const { pathname, search } = history.location;
    const group = pathname === '/promotions' ? 'promotion' : pathname === '/favorite' && 'liked';
    const { origin } = window.location;
    const url = new URL(`${origin}/${pathname}${search}`);
    const searchKey = url.searchParams.get('search');
    let foodRequest = {
      ...request,
      sort: 'created_at',
      sortType: -1,
      page: 1,
      tags: [],
      group,
    };
    if (pathname === '/foods') {
      foodRequest = {
        ...foodRequest,
        search: searchKey,
      };
    }
    setFieldActive('created_at');
    setSortPriceType('');
    setRequest(foodRequest);
  }, [history.location.pathname, history.location.search]);

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname !== '/favorite') {
      if (request) {
        dispatch(getFoodListAction(request));
      }
    }
  }, [request]);

  useEffect(() => {
    const { pathname } = history.location;
    if (pathname === '/favorite') {
      if (userInfo.data.id) {
        dispatch(getFoodListAction({
          ...request,
          user: userInfo.data.id,
        }));
      }
    }
  }, [userInfo, request]);

  const handleChangeMenuFilter = (key) => {
    setFieldActive(key);
    setSortPriceType('');
    setRequest({
      ...request,
      page: 1,
      sort: key,
      sortType: -1,
    });
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
  const renderFoodList = (span = 4) => {
    return foodList.data.map((food) => {
      return (
        <Col span={span} key={food.id}>
          <FoodItemHome
            {...food}
            setShowDetail={setShowFoodDetail}
            setShowLogin={setShowFoodDetail}
          />
        </Col>
      );
    });
  };
  return (
    <div>
      <FoodDetailModal
        show={showFoodDetail}
        setShow={setShowFoodDetail}
        setShowLogin={setShowLogin}
      />
      <S.AffixIndex offsetTop={61.188}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#ddd',
            zIndex: 10,
          }}
        >
          {history.location.pathname === '/favorite'
            ?
            <h3
              style={{
                flexBasis: '50%',
                display: 'flex',
                alignItems: 'center',
                height: 46,
                margin: '0 20px',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              Món ăn đã thích
            </h3>
            :
            <Menu
              mode='horizontal'
              selectedKeys={[filterActive]}
              style={{
                flexBasis: '50%',
              }}
            >
              <Menu.Item key='created_at' onClick={({ key }) => {
                handleChangeMenuFilter(key);
              }}>
                Mới nhất
              </Menu.Item>
              <Menu.Item key='food_consume' onClick={({ key }) => {
                handleChangeMenuFilter(key);
              }}>
                Bán chạy
              </Menu.Item>
            </Menu>
          }
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
                value={request?.tags}
                mode='multiple'
                showArrow
                placeholder='Chọn danh mục'
                tagRender={tagRender}
                style={{ width: '370px' }}
                options={renderTagList()}
                maxTagCount={3}
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(value) => {
                  setRequest({
                    ...request,
                    tags: value,
                    page: 1,
                  });
                }}
              />
            </li>
            <li>
              <Select
                value={sortPriceType}
                style={{ width: 120, margin: '0 5px' }}
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(value) => {
                  setSortPriceType(value);
                  if (filterActive !== 'liked') {
                    setFieldActive(null);
                  }
                  setRequest({
                    ...request,
                    sort: 'price',
                    sortType: value,
                    page: 1
                  });
                }}
              >
                <Option value='' selected hidden disabled>Giá </Option>
                <Option value='1'>Giá tăng dần</Option>
                <Option value='-1'>Giá giảm dần</Option>
              </Select>
            </li>
          </ul>
        </div>
      </S.AffixIndex>
      <div style={{
        paddingTop: 20,
        position: 'relative',
        minHeight: '500px',
      }}
      >
        {foodList.total === 0
          ?
          <div
            style={{
              minHeight: '500px',
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
          </div>
          :
          (
            <Row gutter={[16, 16]}>
              {renderFoodList(6)}
            </Row>
          )

        }
        {
          foodList.load &&
          <Spin
            size='large'
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translate(-50%, -200%)',
            }}
          />
        }
        {foodList.currentPage < foodList.lastPage &&
        <div
          style={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
            marginTop: '3rem',
          }}
        >
          <Button
            onClick={() => setRequest({
              ...request,
              page: request?.page + 1,
            })}
          >
            Xem thêm
          </Button>
        </div>
        }
      </div>
    </div>
  );
};
export default FoodList;

FoodList.propTypes = {
  setShowLogin: PropTypes.func,
};
