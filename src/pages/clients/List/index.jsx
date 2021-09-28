import { useEffect, useState } from 'react';
import { Col, Menu, Row } from 'antd';
import { MdNavigateNext } from 'react-icons/all';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import history from '../../../utils/history';
import { PATH } from '../../../contants';

import StoreList from './components/StoreList';
import FoodList from './components/FoodList';

import * as ClientStyle from '../styles';
import * as S from './style';

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
          <Col lg={4} md={4} sm={24} xs={24}>
            <S.MenuList offsetTop={88.375}>
              <Menu
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
                  Ở đâu
                </Menu.Item>
                <Menu.Item
                  key='/foods'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    setMobileActive(false);
                    history.push(PATH.FOOD);
                  }}
                >
                  Ăn gì
                </Menu.Item>
                <Menu.Item
                  key='/promotions'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    setMobileActive(false);
                    history.push(PATH.PROMOTION);
                  }}
                >
                  Khuyến mãi
                </Menu.Item>
                <Menu.Item
                  key='/crowded'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    setMobileActive(false);
                    history.push(PATH.CROWDED);
                  }}
                >
                  Đông khách
                </Menu.Item>
                <Menu.Item
                  key='/favorite'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    setMobileActive(false);
                    history.push(PATH.FAVORITE);
                  }}
                >
                  Yêu thích
                </Menu.Item>
                <span
                  className='mobile-override'
                  onClick={() => {
                    setMobileActive(!mobileActive);
                  }}
                />
              </Menu>
            </S.MenuList>
          </Col>
          <Col ld={20} md={20} sm={24} xs={24} className='list-content'>
            <Switch>
              <Route exact path={PATH.STORE} component={StoreList} />
              <Route
                exact
                path={PATH.FOOD}
                setShowLogin={setShowLogin}
                render={() => <FoodList setShowLogin={setShowLogin} />}
              />
              <Route
                exact
                path={PATH.PROMOTION}
                render={() => <FoodList setShowLogin={setShowLogin} />}
              />
              <Route
                exact
                path={PATH.CROWDED}
                component={StoreList}
              />
              <Route exact path={PATH.FAVORITE} render={() => <FoodList setShowLogin={setShowLogin} />} />
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
