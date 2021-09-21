import { useEffect, useState } from 'react';
import { Affix, Col, Menu, Row } from 'antd';
import { MdNavigateNext } from 'react-icons/all';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import history from '../../../utils/history';
import { PATH } from '../../../contants';

import StoreList from './components/StoreList';
import FoodList from './components/FoodList';

import * as ClientStyle from '../styles';

const ClientList = ({ setShowLogin }) => {
  const [menuActive, setMenuActive] = useState('foods');
  useEffect(() => {
    setMenuActive(history.location.pathname);
  }, [history.location.pathname]);
  return (
    <ClientStyle.Section style={{ backgroundColor: '#f3f3f3' }}>
      <ClientStyle.Container>
        <Row gutter={20}>
          <Col span={4}>
            <Affix offsetTop={61.188}>
              <Menu
                theme='light'
                style={{
                  background: '#fff',
                  height: 'auto',
                }}
                selectedKeys={[menuActive]}
                mode='inline'
              >
                <Menu.Item
                  key='/stores'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push(PATH.STORE);
                  }}
                >
                  Ở đâu
                </Menu.Item>
                <Menu.Item
                  key='/foods'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push(PATH.FOOD);
                  }}
                >
                  Ăn gì
                </Menu.Item>
                <Menu.Item
                  key='/promotions'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push(PATH.PROMOTION);
                  }}
                >
                  Khuyến mãi
                </Menu.Item>
                <Menu.Item
                  key='/crowded'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push(PATH.CROWDED);
                  }}
                >
                  Đông khách
                </Menu.Item>
                <Menu.Item
                  key='/favorite'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push(PATH.FAVORITE);
                  }}
                >
                  Yêu thích
                </Menu.Item>
              </Menu>
            </Affix>
          </Col>
          <Col span={20}>
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
