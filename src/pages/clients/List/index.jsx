import { useEffect, useState } from 'react';
import { Affix, Col, Menu, Row } from 'antd';
import { MdNavigateNext } from 'react-icons/all';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import history from '../../../utils/history';
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
                    history.push('/stores');
                  }}
                >
                  Ở đâu
                </Menu.Item>
                <Menu.Item
                  key='/foods'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push('/foods');
                  }}
                >
                  Ăn gì
                </Menu.Item>
                <Menu.Item
                  key='/promotions'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push('/promotions');
                  }}
                >
                  Khuyến mãi
                </Menu.Item>
                <Menu.Item
                  key='/crowded'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push('/crowded');
                  }}
                >
                  Đông khách
                </Menu.Item>
                <Menu.Item
                  key='/favorite'
                  icon={<MdNavigateNext className='custom-icon-position' />}
                  onClick={() => {
                    history.push('/favorite');
                  }}
                >
                  Yêu thích
                </Menu.Item>
              </Menu>
            </Affix>
          </Col>
          <Col span={20}>
            <Switch>
              <Route exact path='/stores' component={StoreList} />
              <Route
                exact
                path='/foods'
                setShowLogin={setShowLogin}
                component={FoodList}
              />
              <Route
                exact
                path='/promotions'
                setShowLogin={setShowLogin}
                component={FoodList}
              />
              <Route
                exact
                path='/crowded'
                component={StoreList}
              />
              <Route exact path='/favorite' component={FoodList} />
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
