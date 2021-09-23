import { useEffect, useState } from 'react';
import { Affix, Col, Menu, Row } from 'antd';
import { AiOutlineHeart, FiPercent, GrGroup, IoFastFoodOutline, MdNavigateNext } from 'react-icons/all';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import history from '../../../utils/history';
import { PATH } from '../../../contants';

import StoreList from './components/StoreList';
import FoodList from './components/FoodList';

import * as ClientStyle from '../styles';
import * as S from './style';
import { ShopOutlined } from '@ant-design/icons';

const ClientList = ({ setShowLogin }) => {
  const [menuActive, setMenuActive] = useState('foods');
  const [mobileActive, setMobileActive] = useState(false);
  useEffect(() => {
    setMenuActive(history.location.pathname);
  }, [history.location.pathname]);
  return (
    <ClientStyle.Section style={{ backgroundColor: '#f3f3f3' }}>
      <ClientStyle.Container>
        <Row gutter={20}>
          <Col lg={4} md={4}>
            <Affix offsetTop={88.375}>
              <S.ListMenu
                id='menu_list_page'
                theme='light'
                selectedKeys={[menuActive]}
                mode='inline'
                mobileActive={mobileActive}
              >
                <Menu.Item
                  key='/stores'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    setMobileActive(false);
                    history.push(PATH.STORE);
                  }}
                >
                  <ShopOutlined className='mobile-icon' />
                  <span className='menu-title'>Ở đâu</span>
                </Menu.Item>
                <Menu.Item
                  key='/foods'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    setMobileActive(false);
                    history.push(PATH.FOOD);
                  }}
                >
                  <IoFastFoodOutline className='mobile-icon' />
                  <span className='menu-title'>Ăn gì</span>
                </Menu.Item>
                <Menu.Item
                  key='/promotions'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    setMobileActive(false);
                    history.push(PATH.PROMOTION);
                  }}
                >
                  <FiPercent className='mobile-icon' />
                  <span className='menu-title'>Khuyến mãi</span>
                </Menu.Item>
                <Menu.Item
                  key='/crowded'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    setMobileActive(false);
                    history.push(PATH.CROWDED);
                  }}
                >
                  <GrGroup className='mobile-icon' />
                  <span className='menu-title'>Đông khách</span>
                </Menu.Item>
                <Menu.Item
                  key='/favorite'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    setMobileActive(false);
                    history.push(PATH.FAVORITE);
                  }}
                >
                  <AiOutlineHeart className='mobile-icon' />
                  <span className='menu-title'>Yêu thích</span>
                </Menu.Item>
                <span
                  className='mobile-override'
                  onClick={() => {
                    setMobileActive(!mobileActive);
                  }}
                />
              </S.ListMenu>
            </Affix>
          </Col>
          <Col ld={20} md={20} sm={24} xs={24} className='list-content'>
            <Switch>
              <Route exact path={PATH.STORE} component={StoreList} />
              <Route
                exact
                path={PATH.FOOD}
                setShowLogin={setShowLogin}
                component={FoodList}
              />
              <Route
                exact
                path={PATH.PROMOTION}
                setShowLogin={setShowLogin}
                component={FoodList}
              />
              <Route
                exact
                path={PATH.CROWDED}
                component={StoreList}
              />
              <Route exact path={PATH.FAVORITE} component={FoodList} />
            </Switch>
          </Col>
        </Row>
      </ClientStyle.Container>
    </ClientStyle.Section>
  );
};
export default ClientList;

ClientList.propTypes = {
  setShowLogin: PropTypes.func,
};
