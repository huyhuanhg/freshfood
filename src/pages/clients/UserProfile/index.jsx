import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Affix, Col, Menu, Row, Spin } from 'antd';
import {
  AiFillEdit,
  AiOutlinePoweroff, BsFillBookmarkFill,
  BsPencilSquare,
  FaComment,
  FaHistory,
  FaUserAlt,
  FiActivity,
  FiSettings,
  GiRank3,
} from 'react-icons/all';
import PropTypes from 'prop-types';

import * as ClientStyle from '../styles';
import * as S from './style';

import { ROOT_PATH, TITLE } from '../../../contants';

import Profile from './Profile';
import HistoryOrder from './HistoryOrder';
import HistoryRating from './HistoryRating';
import ChangePassword from './ChangePassword';
import HistoryComment from './HistoryComment';
import Bookmarks from './Bookmarks';
import EditProfile from './EditProfile';

import history from '../../../utils/history';
import { changeAvatarAction, logoutAction } from '../../../redux/actions';

const UserProfile = ({ match }) => {
  document.title = TITLE.USER_PROFILE;
  const { SubMenu } = Menu;
  const userToken = localStorage.userInfo;
  const { userInfo } = useSelector(({ userReducer }) => userReducer);
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState({
    subMenu: [],
    menuItem: 'order',
  });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const menuInfo = match.params.page;
    const menuArr = menuInfo.split('-');
    if (menuArr.length > 1) {
      setActiveMenu({
        subMenu: [menuArr[0]],
        menuItem: menuInfo,
      });
    }
  }, []);
  useEffect(() => {
    if (!userToken || userInfo.error) {
      setRedirect(true);
    }
  }, [userInfo]);
  useEffect(() => {
    const menuInfo = match.params.page;
    const menuArr = menuInfo.split('-');
    if (menuArr.length > 1) {
      setActiveMenu({
        subMenu: [menuArr[0]],
        menuItem: menuInfo,
      });
    } else {
      setActiveMenu({
        subMenu: [],
        menuItem: 'order',
      });
    }
  }, [match.params.page]);

  const handleSubMenuClick = ({ key }) => {
    const currentSubMenu = [...activeMenu.subMenu];
    const keyIndex = currentSubMenu.findIndex((subMenuKey) => subMenuKey === key);
    if (keyIndex === -1) {
      currentSubMenu.push(key);
    } else {
      currentSubMenu.splice(keyIndex, 1);
    }
    setActiveMenu({
      ...activeMenu,
      subMenu: currentSubMenu,
    });
  };
  const handleMenuItemClick = ({ key }) => {
    setActiveMenu({
      ...activeMenu,
      menuItem: key,
    });
    history.push(`/profile/${key}`);
  };
  const handleLogout = () => {
    const { accessToken } = JSON.parse(userToken);
    dispatch(
      logoutAction({
        data: accessToken,
      }),
    );
  };
  if (redirect) {
    return <Redirect to='/' />;
  } else {
    if (userInfo.load) {
      return (
        <Spin
          size={'large'}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    } else {
      return (
        <ClientStyle.Section>
          <ClientStyle.Container>
            <S.ProfileWrap>
              <Row gutter={16}>
                <Col span={6}>
                  <Affix offsetTop={81.188}>
                    <S.ProfileSidebar>
                      <S.ProfileAvatarWrap>
                        <label htmlFor='avatar'>
                          <img src={`${ROOT_PATH}${userInfo.data.avatar}`} alt='' />
                          <AiFillEdit />
                          <input
                            type='file'
                            id='avatar'
                            hidden
                            onChange={(e) => {
                              const { accessToken } = JSON.parse(userToken);
                              dispatch(changeAvatarAction({
                                accessToken,
                                data: {
                                  image: e.target.files[0],
                                },
                              }));
                            }}
                          />
                        </label>
                      </S.ProfileAvatarWrap>
                      <S.ProfileFullName>
                        <div className='profile-usertitle-name'>
                          {`${userInfo.data.firstName} ${userInfo.data.lastName}`}
                        </div>
                      </S.ProfileFullName>
                      <Menu
                        theme='light'
                        style={{
                          background: '#fff',
                          height: 'auto',
                        }}
                        selectedKeys={[activeMenu.menuItem]}
                        openKeys={activeMenu.subMenu}
                        mode='inline'
                      >
                        <Menu.Item
                          key='order'
                          icon={<FaHistory className='custom-icon-profile' />}
                          onClick={handleMenuItemClick}
                        >
                          Lịch sử giao dịch
                        </Menu.Item>
                        <SubMenu
                          key='history'
                          icon={<FiActivity />}
                          title='Hoạt động cá nhân'
                          onTitleClick={handleSubMenuClick}
                        >
                          <Menu.Item
                            key='history-bookmark'
                            icon={<BsFillBookmarkFill className='custom-icon-profile' />}
                            onClick={handleMenuItemClick}
                          >
                            Bộ sưu tập
                          </Menu.Item>
                          <Menu.Item
                            key='history-comment'
                            icon={<FaComment className='custom-icon-profile' />}
                            onClick={handleMenuItemClick}
                          >
                            Bình luận
                          </Menu.Item>
                          <Menu.Item
                            key='history-rating'
                            icon={<GiRank3 className='custom-icon-profile' />}
                            onClick={handleMenuItemClick}
                          >
                            Đánh giá
                          </Menu.Item>
                        </SubMenu>
                        <SubMenu
                          key='user'
                          icon={<FiSettings />}
                          title='Cài đặt tài khoản'
                          onTitleClick={handleSubMenuClick}
                        >
                          <Menu.Item
                            key='user-info'
                            icon={<BsPencilSquare className='custom-icon-profile' />}
                            onClick={handleMenuItemClick}
                          >
                            Thông tin tài khoản
                          </Menu.Item>
                          <Menu.Item
                            key='user-password'
                            icon={<FaUserAlt className='custom-icon-profile' />}
                            onClick={handleMenuItemClick}
                          >
                            Đổi mật khẩu
                          </Menu.Item>
                        </SubMenu>
                        <Menu.Item
                          key='1'
                          icon={<AiOutlinePoweroff className='custom-icon-profile' />}
                          onClick={handleLogout}
                        >
                          Đăng xuất
                        </Menu.Item>
                      </Menu>
                    </S.ProfileSidebar>
                  </Affix>
                </Col>
                <Col span={18}>
                  <S.ProfileContent>
                    <Switch>
                      <Route exact path='/profile/user-info'>
                        <Profile />
                      </Route>
                      <Route exact path='/profile/user-info/edit'>
                        <EditProfile />
                      </Route>
                      <Route exact path='/profile/order'>
                        <HistoryOrder />
                      </Route>
                      <Route exact path='/profile/history-comment'>
                        <HistoryComment />
                      </Route>
                      <Route exact path='/profile/history-bookmark'>
                        <Bookmarks />
                      </Route>
                      <Route exact path='/profile/history-rating'>
                        <HistoryRating />
                      </Route>
                      <Route exact path='/profile/user-password'>
                        <ChangePassword />
                      </Route>
                      <Route
                        render={() => {
                          return <Redirect to='/profile/order' />;
                        }}
                      />
                    </Switch>
                  </S.ProfileContent>
                </Col>
              </Row>
            </S.ProfileWrap>
          </ClientStyle.Container>
        </ClientStyle.Section>
      );
    }
  }
};
export default UserProfile;

UserProfile.propTypes = {
  match: PropTypes.object,
};
