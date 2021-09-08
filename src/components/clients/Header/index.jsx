import {
  AiFillSkype,
  FaFacebookF,
  FaHistory,
  FiActivity,
  GrGooglePlus,
  RiMapPin2Fill,
} from 'react-icons/all';
import {
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Affix, Badge, Button, Dropdown, Form, Input, Menu, Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import * as HeaderStyle from './styles';

import history from '../../../utils/history';
import { logoutAction } from '../../../redux/actions';
import { ROOT_PATH } from '../../../contants';

import { useState } from 'react';

function Header({ setShowModalLogin }) {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [searchForm] = Form.useForm();
  const [searchType, setSearchType] = useState('stores');
  const { userInfo } = useSelector((state) => state.userReducer);
  const { total: totalCart } = useSelector((state) => state.cartReducer);

  const handleLogout = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    dispatch(
      logoutAction({
        data: userInfo.accessToken,
      }),
    );
  };
  const handleSearch = ({ searchType, search }) => {
    searchForm.resetFields();
    history.push({
      pathname: searchType,
      search: `?search=${search}`,
    });
  };
  const userMenu = (
    <Menu style={{ width: '250px', display: 'fixed' }}>
      {userInfo.data.id ? (
        <div>
          <Menu.Item
            key='1'
            style={{ padding: '1rem 2rem' }}
            onClick={() => {
              history.push('/profile/user-info');
            }}
          >
            <Space>
              <HeaderStyle.UserAvatar
                size='large'
                src={userInfo.data.avatar && `${ROOT_PATH}${userInfo.data.avatar}`}
              >
                {!userInfo.data.avatar && (
                  <span style={{ fontSize: '2rem' }}>
                    {userInfo.data.lastName[0].toUpperCase()}
                  </span>
                )}
              </HeaderStyle.UserAvatar>
              <div style={{ marginLeft: '1rem' }}>
                <div>{`${userInfo.data.firstName} ${userInfo.data.lastName}`}</div>
                <small style={{ color: '#ccc' }}>{userInfo.data.phone}</small>
              </div>
            </Space>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key='2'
            style={{ padding: '1rem 2rem' }}
            icon={<FaHistory />}
            onClick={() => {
              history.push('/profile/order');
            }}
          >
            Lịch sử giao dịch
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key='3'
            style={{ padding: '1rem 2rem' }}
            icon={<FiActivity />}
            onClick={() => {
              history.push('/profile/history-comment');
            }}
          >
            Hoạt động cá nhân
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            key='4'
            style={{ padding: '1rem 2rem' }}
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Đăng xuất
          </Menu.Item>
        </div>
      ) : (
        <>
          <Menu.Item key='0' style={{ padding: '1rem 2rem' }}>
            <Link to='/login'>Đăng nhập</Link>
          </Menu.Item>
          <Menu.Item key='1' style={{ padding: '1rem 2rem' }}>
            <Link to='/register'>Đăng ký</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <HeaderStyle.TopBar>
        <div>
          <ul>
            <li>
              <RiMapPin2Fill />
              K5/22 Nam Cao - Hoa Khanh Nam
            </li>
            <li>
              <PhoneOutlined />
              +84 935 906 860
            </li>
            <li>
              <MailOutlined />
              huyhuanhg@gmail.com
            </li>
          </ul>
          <div>
            <p>Flow us:</p>
            <div>
              <FaFacebookF />
            </div>
            <div>
              <GrGooglePlus />
            </div>
            <div>
              <AiFillSkype />
            </div>
          </div>
        </div>
      </HeaderStyle.TopBar>
      <Affix offsetTop={0}>
        <HeaderStyle.Header>
          <HeaderStyle.MenuWrap>
            <HeaderStyle.Logo to='/'>FoodBooking</HeaderStyle.Logo>
            <HeaderStyle.SearchWrap>
              {/*<HeaderStyle.Search/>*/}
              <Form
                layout='inline'
                onFinish={handleSearch}
                form={searchForm}
                initialValues={{
                  searchType: 'stores',
                  search: '',
                }}
              >
                <Form.Item
                  name='searchType'
                  style={{
                    margin: '0 8px 0 0',
                    flexBasis: '20%',
                  }}
                >
                  <HeaderStyle.SearchType
                    size='large'
                    defaultValue={'stores'}
                    onChange={(value) => {
                      setSearchType(value);
                    }}
                  >
                    <Option value='stores'>Cửa hàng</Option>
                    <Option value='foods'>Món ăn</Option>
                  </HeaderStyle.SearchType>
                </Form.Item>
                <Form.Item
                  name='search'
                  style={{
                    margin: 0,
                    flexBasis: 'calc(100% - 16px - 20%)',
                  }}
                >
                  <Input
                    size='large'
                    placeholder={`Tìm kiếm ${searchType === 'stores' ? 'cửa hàng' : 'món ăn'}`}
                    style={{ background: 'unset' }}
                  />
                </Form.Item>
                <Button htmlType='submit' style={{ display: 'none' }} />
              </Form>
            </HeaderStyle.SearchWrap>
            <Space>
              <Badge count={totalCart} style={{ right: '5px' }}>
                <HeaderStyle.Btn
                  onClick={() => {
                    if (userInfo.data.id) {
                      history.push('/cart');
                    } else {
                      setShowModalLogin(true);
                    }
                  }}
                  disabled={history.location.pathname === '/cart'}
                >
                  <ShoppingCartOutlined />
                  Giỏ hàng
                </HeaderStyle.Btn>
              </Badge>
              <Dropdown
                overlay={userMenu}
                trigger={['click']}
                placement='bottomRight'
                className='dropdown-user-profile'
                getPopupContainer={(trigger) => {
                  return trigger.parentNode;
                }}
              >
                <a
                  className='ant-dropdown-link'
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {userInfo.data.id ? (
                    <HeaderStyle.UserAvatar
                      size='large'
                      src={
                        userInfo.data.avatar && `${ROOT_PATH}${userInfo.data.avatar}`
                      }
                    >
                      {!userInfo.data.avatar && (
                        <span style={{ fontSize: '2rem' }}>
                          {userInfo.data.lastName[0].toUpperCase()}
                        </span>
                      )}
                    </HeaderStyle.UserAvatar>
                  ) : (
                    <HeaderStyle.UserAvatar size='large' icon={<UserOutlined />} />
                  )}
                </a>
              </Dropdown>
            </Space>
          </HeaderStyle.MenuWrap>
        </HeaderStyle.Header>
      </Affix>
    </>
  );
}

export default Header;

Header.propTypes = {
  setShowModalLogin: PropTypes.func,
};
