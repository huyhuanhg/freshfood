import { Affix, Button, Col, Menu, Row, Select, Spin } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as HomeS from '../../styles';
import { useEffect, useState } from 'react';
import { MdNavigateNext, MdRemoveShoppingCart } from 'react-icons/all';
import { getFoodListAction } from '../../../../../redux/actions';

const SectionFoodList = ({ render }) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const { foodList } = useSelector((state) => state.foodReducer);
  const { tagList } = useSelector((state) => state.tagReducer);

  const [menuActive, setMenuActive] = useState('created_at');
  const [sortPrice, setSortPrice] = useState('');
  const [request, setRequest] = useState({
    group: null,
    sort: 'created_at',
    sortType: -1,
    page: 1,
    tags: [],
  });

  useEffect(() => {
    dispatch(getFoodListAction(request));
  }, [request]);

  const handleChaneTag = (key) => {
    let tagsActive = [...request.tags];
    if (key === '') {
      tagsActive = [];
    } else {
      const tagIndex = tagsActive.indexOf(key);
      if (tagIndex !== -1) {
        tagsActive.splice(tagIndex, 1);
      } else {
        tagsActive.push(key);
      }
    }
    setRequest({
      ...request,
      tags: tagsActive,
    });
  };
  const handleChangeMenu = (key) => {
    setMenuActive(key);
    let menuRequest = {
      ...request,
      page: 1
    };
    if (key === 'promotion') {
      menuRequest = {
        ...menuRequest,
        sort: null,
        group: key,
      };
    } else {
      setSortPrice('');
      menuRequest = {
        ...menuRequest,
        sort: key,
        sortType: -1,
        group: null,
      };
    }
    setRequest(menuRequest);
  };

  const renderTagListMenu = () => {
    return tagList.data.map((tag) => {
      if (tag.tagActive === 1) {
        return (
          <Menu.Item
            key={tag.id}
            icon={<MdNavigateNext className='custom-icon-position' />}
            onClick={({ key }) => handleChaneTag(key)}
          >
            {tag.tagName}
          </Menu.Item>
        );
      }
    });
  };
  return (
    <Row gutter={20}>
      <Col span={4}>
        <Affix offsetTop={52.7}>
          <Menu
            theme='light'
            style={{
              background: '#fff',
              height: 'auto',
            }}
            selectedKeys={request.tags.length === 0 ? [''] : request.tags}
            mode='inline'
          >
            <Menu.Item
              key=''
              icon={<MdNavigateNext className='custom-icon-position' />}
              onClick={({ key }) => handleChaneTag(key)}
            >
              Tất cả
            </Menu.Item>
            {renderTagListMenu()}
          </Menu>
        </Affix>
      </Col>
      <Col span={20}>
        <HomeS.AffixIndex offsetTop={52.7}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              backgroundColor: '#ddd',
            }}
          >
            <Menu
              mode='horizontal'
              selectedKeys={[menuActive]}
              style={{
                flexBasis: '50%',
              }}
            >
              <Menu.Item key='created_at' onClick={({ key }) => {handleChangeMenu(key);}}>
                Mới nhất
              </Menu.Item>
              <Menu.Item key='promotion' onClick={({ key }) => {handleChangeMenu(key);}}>
                Khuyến mãi
              </Menu.Item>
              <Menu.Item key='food_consume' onClick={({ key }) => {handleChangeMenu(key);}}>
                Bán chạy
              </Menu.Item>
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
                <Select
                  value={sortPrice}
                  style={{ width: 120, margin: '0 5px' }}
                  getPopupContainer={(trigger) => trigger.parentNode}
                  onChange={(value) => {
                    setSortPrice(value);
                    if (menuActive === 'created_at' || menuActive === 'food_consume') {
                      setMenuActive('');
                    }
                    setRequest({
                      ...request,
                      sort: 'price',
                      sortType: value,
                      page: 1,
                    });
                  }}
                >
                  <Option value='' selected hidden disabled>
                    Giá
                  </Option>
                  <Option value='1'>Giá tăng dần</Option>
                  <Option value='-1'>Giá giảm dần</Option>
                </Select>
              </li>
            </ul>
          </div>
        </HomeS.AffixIndex>
        <div style={{ paddingTop: 20, position: 'relative' }}>
          {foodList.total === 0
            ?
            <div
              style={{
                minHeight: '400px',
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
            render(foodList.data, 6)
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
                page: request.page + 1,
              })}
            >
              Xem thêm
            </Button>
          </div>
          }
        </div>
      </Col>
    </Row>
  );
};
export default SectionFoodList;

SectionFoodList.propTypes = {
  render: PropTypes.func,
};
