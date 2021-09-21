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
import { PATH, ROOT_PATH } from '../../../contants';
import toNotMark from '../../../utils/toNotMark';

function Header({ setShowModalLogin }) {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [searchForm] = Form.useForm();
  const [searchType, setSearchType] = useState(PATH.STORE);
  const {
    userInfo: {
      data: {
        avatar,
        firstName,
        id: userId,
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
        pathname: `${searchType}`,
        search: `?search=${toNotMark(search)}`,
      });
    } else {
      searchForm.resetFields();
    }
  };
  useEffect(() => {
    const pathname = history.location.pathname;
    if (pathname === PATH.FOOD || pathname === PATH.STORE) {
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
    <Menu style={{ width: '250px', display: 'fixed', top: 22 }}>
      {userId ? (
        <div>
          <Menu.Item
            key='1'
            style={{ padding: '1rem 2rem' }}
            onClick={() => {
              history.push(PATH.SUP_PROFILE(PATH.PROFILE_INFO));
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
              history.push(PATH.SUP_PROFILE(PATH.PROFILE_ORDER));
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
              history.push(PATH.SUP_PROFILE(PATH.PROFILE_BOOKMARKS));
            }}
          >
            Bộ sưu tập
          </Menu.Item>
          <Menu.Item
            key='3'
            style={{ padding: '1rem 2rem' }}
            icon={<FiActivity />}
            onClick={() => {
              history.push(PATH.SUP_PROFILE(PATH.PROFILE_COMMENTS));
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
            <Link to={PATH.LOGIN}>Đăng nhập</Link>
          </Menu.Item>
          <Menu.Item key='1' style={{ padding: '1rem 2rem' }}>
            <Link to={PATH.REGISTER}>Đăng ký</Link>
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
              <a>
                <RiMapPin2Fill />
                K5/22 Nam Cao - Hoa Khanh Nam
              </a>
            </li>
            <li>
              <a href='tel:0935906860'>
                <PhoneOutlined />
                +84 935 906 860
              </a>
            </li>
            <li>
              <a href='mailto:huyhuanhg@gmail.com'>
                <MailOutlined />
                huyhuanhg@gmail.com
              </a>
            </li>
          </ul>
          <div>
            <p>Flow us:</p>
            <div className='facebook'>
              <a href='https://www.facebook.com/danlangvan/'><FaFacebookF /></a>
            </div>
            <div className='google'>
              <a href='https://www.google.com.vn/'><GrGooglePlus /></a>
            </div>
            <div className='skype'>
              <a href='https://www.skype.com/'><AiFillSkype /></a>
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
                  searchType: PATH.STORE,
                  search: '',
                }}
              >

                <Form.Item
                  name='search'
                  noStyle
                >
                  <Input
                    placeholder={`Tìm kiếm ${searchType === PATH.STORE ? 'cửa hàng' : 'món ăn'}`}
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
                          defaultValue={PATH.STORE}
                          onChange={(value) => {
                            setSearchType(value);
                          }}
                        >
                          <Option value={PATH.STORE}>Cửa hàng</Option>
                          <Option value={PATH.FOOD}>Món ăn</Option>
                        </HeaderStyle.SearchType>
                      </Form.Item>
                    }
                  />
                </Form.Item>
                <Button htmlType='submit' style={{ display: 'none' }} />
              </Form>
            </HeaderStyle.SearchWrap>
            <Space className='p-relative'>
              <Badge count={totalCart} style={{ right: '5px' }}>
                <HeaderStyle.Btn
                  onClick={() => {
                    if (userId) {
                      history.push(PATH.CART);
                    } else {
                      setShowModalLogin(true);
                    }
                  }}
                  disabled={history.location.pathname === PATH.CART}
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
