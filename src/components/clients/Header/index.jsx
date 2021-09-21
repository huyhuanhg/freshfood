import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Affix, Badge, Button, Dropdown, Form, Input, Menu, Select, Space } from 'antd';
import {
  AiFillSkype, BsFillBookmarkFill,
  FaFacebookF,
  FaHistory,
  FiActivity,
  GrGooglePlus,
  RiMapPin2Fill,
} from 'react-icons/all';

import {
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined, SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

import PropTypes from 'prop-types';

import * as HeaderStyle from './styles';

import history from '../../../utils/history';
import { logoutAction } from '../../../redux/actions';
import { ROOT_PATH } from '../../../contants';
import toNotMark from '../../../utils/toNotMark';

function Header({ setShowModalLogin }) {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [searchForm] = Form.useForm();
  const [searchType, setSearchType] = useState('stores');
  const {
    userInfo: {
      data: {
        avatar,
        firstName,
        id : userId,
        lastName,
        phone,
      },
    },
  } = useSelector(({ userReducer }) => userReducer);
  const { total: totalCart } = useSelector(({ cartReducer }) => cartReducer);
  const handleLogout = () => {
    const { accessToken } = JSON.parse(localStorage.getItem('userInfo'));
    dispatch(
      logoutAction({
        data: accessToken,
      }),
    );
  };
  const handleSearch = ({ searchType, search }) => {
    if (search.trim()) {
      history.push({
        pathname: `/${searchType}`,
        search: `?search=${toNotMark(search)}`,
      });
    } else {
      searchForm.resetFields();
    }
  };
  useEffect(() => {
    const pathname = history.location.pathname;
    if (pathname === '/foods' || pathname === '/stores') {
      let field = {
        searchType: pathname.slice(1),
      };
      if (!history.location.search) {
        field = {
          ...field,
          search: '',
        };
      }
      searchForm.setFieldsValue(field);
    } else {
      searchForm.resetFields();
    }
  }, [history.location.pathname, history.location.search]);
  const userMenu = (
    <Menu style={{ width: '250px', display: 'fixed' }}>
      {userId ? (
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
                src={avatar && `${ROOT_PATH}${avatar}`}
              >
                {!avatar && (
                  <span style={{ fontSize: '2rem' }}>
                    {lastName[0].toUpperCase()}
                  </span>
                )}
              </HeaderStyle.UserAvatar>
              <div style={{ marginLeft: '1rem' }}>
                <div>{`${firstName} ${lastName}`}</div>
                <small style={{ color: '#ccc' }}>{phone}</small>
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
            icon={<BsFillBookmarkFill />}
            onClick={() => {
              history.push('/profile/history-bookmark');
            }}
          >
            Bộ sưu tập
          </Menu.Item>
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
            <div className='facebook'>
              <FaFacebookF />
            </div>
            <div className='google'>
              <GrGooglePlus />
            </div>
            <div className='skype'>
              <AiFillSkype />
            </div>
          </div>
        </div>
      </HeaderStyle.TopBar>
      <Affix offsetTop={0}>
        <HeaderStyle.Header>
          <HeaderStyle.MenuWrap>
            <HeaderStyle.Logo to='/'>FreshFood</HeaderStyle.Logo>

            <HeaderStyle.SearchWrap>
              <Form
                onFinish={handleSearch}
                form={searchForm}
                initialValues={{
                  searchType: 'stores',
                  search: '',
                }}
              >

                <Form.Item
                  name='search'
                  noStyle
                >
                  <Input
                    placeholder={`Tìm kiếm ${searchType === 'stores' ? 'cửa hàng' : 'món ăn'}`}
                    style={{ background: 'unset' }}
                    suffix={
                      <Button
                        htmlType='submit'
                        style={{
                          background: 'unset',
                          border: 0,
                          fontSize: '150%',
                          color: '#ccc',
                          padding: 0,
                        }}
                      >
                        <SearchOutlined />
                      </Button>}
                    addonBefore={
                      <Form.Item
                        name='searchType'
                        noStyle
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
                    }
                  />
                </Form.Item>
                <Button htmlType='submit' style={{ display: 'none' }} />
              </Form>
            </HeaderStyle.SearchWrap>
            <Space>
              <Badge count={totalCart} style={{ right: '5px' }}>
                <HeaderStyle.Btn
                  onClick={() => {
                    if (userId) {
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
                  {userId ? (
                    <HeaderStyle.UserAvatar
                      size='large'
                      src={
                        avatar && `${ROOT_PATH}${avatar}`
                      }
                    >
                      {!avatar && (
                        <span style={{ fontSize: '2rem' }}>
                          {lastName[0].toUpperCase()}
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
