import {Affix, Avatar, Col, Menu, Row} from "antd";
import * as ClientStyle from '../styles';
import * as S from './style';
import {
    AiFillEdit,
    AiOutlinePoweroff, BsPencilSquare,
    FaComment,
    FaHistory, FaUserAlt,
    FiActivity, FiSettings,
    GiRank3, MdRemoveShoppingCart,
} from "react-icons/all";
import {TITLE} from "../../../contants";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";

import Profile from "./Profile";
import HistoryOrder from "./HistoryOrder";
import HistoryRating from "./HistoryRating";
import ChangePassword from "./ChangePassword";
import HistoryComment from "./HistoryComment";
import history from "../../../utils/history";
import {logoutAction} from "../../../redux/actions";
import {useEffect, useState} from "react";

const UserProfile = ({match}) => {
    document.title = TITLE.USER_PROFILE;
    const {SubMenu} = Menu;
    const {userInfo} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [activeMenu, setActiveMenu] = useState({subMenu: [], menuItem: 'order'});

    useEffect(() => {
        let menuInfo = match.params.page;
        let menuArr = menuInfo.split('-');
        if (menuArr.length > 1) {
            setActiveMenu({
                subMenu: [menuArr[0]],
                menuItem: menuInfo
            });
        }

    }, []);

    const handleSubMenuClick = ({key}) => {
        let currentSubMenu = [...activeMenu.subMenu];
        let keyIndex = currentSubMenu.findIndex((subMenuKey) => subMenuKey === key);
        if (keyIndex === -1) {
            currentSubMenu.push(key);
        } else {
            currentSubMenu.splice(keyIndex, 1);
        }
        setActiveMenu({
            ...activeMenu,
            subMenu: currentSubMenu,
        })
    }
    const handleMenuItemClick = ({key}) => {
        setActiveMenu({
            ...activeMenu,
            menuItem: key
        })
        history.push(`/profile/${key}`)
    }
    const handleLogout = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        dispatch(logoutAction({
            data: userInfo.access_token
        }))
    }
    return (
        <ClientStyle.Section>
            <ClientStyle.Container>
                <S.ProfileWrap>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Affix offsetTop={72.7}>
                                <S.ProfileSidebar>
                                    <S.ProfileAvatarWrap>
                                        <label htmlFor='avatar'>
                                            <img id="imgLeftProfileMemberAvatar"
                                                 src="https://media.foody.vn/usr/g2494/24932664/avt/c200x200/foody-avatar-8ff9c7d3-219e-4be9--fd8f09b8-210828114627.jpeg"
                                                 className="img-responsive" alt=""/>
                                            <AiFillEdit/>
                                            <input type='file' id='avatar' hidden/>
                                        </label>
                                    </S.ProfileAvatarWrap>
                                    <S.ProfileFullName>
                                        <div className="profile-usertitle-name">
                                            {`${userInfo.data.first_name} ${userInfo.data.last_name}`}
                                        </div>
                                    </S.ProfileFullName>
                                    <Menu
                                        theme="light"
                                        style={{
                                            background: '#fff',
                                            height: 'auto'
                                        }}
                                        selectedKeys={[activeMenu.menuItem]}
                                        openKeys={activeMenu.subMenu}
                                        mode="inline"
                                    >
                                        <Menu.Item
                                            key="order"
                                            icon={<FaHistory/>}
                                            onClick={handleMenuItemClick}
                                        >
                                            Lịch sử giao dịch
                                        </Menu.Item>
                                        <SubMenu
                                            key="history"
                                            icon={<FiActivity/>}
                                            title="Hoạt động cá nhân"
                                            onTitleClick={handleSubMenuClick}
                                        >
                                            <Menu.Item
                                                key="history-comment"
                                                icon={<FaComment/>}
                                                onClick={handleMenuItemClick}
                                            >
                                                Bình luận
                                            </Menu.Item>
                                            <Menu.Item
                                                key="history-rating"
                                                icon={<GiRank3/>}
                                                onClick={handleMenuItemClick}
                                            >
                                                Đánh giá
                                            </Menu.Item>
                                        </SubMenu>
                                        <SubMenu
                                            key="user"
                                            icon={<FiSettings/>}
                                            title="Cài đặt tài khoản"
                                            onTitleClick={handleSubMenuClick}
                                        >
                                            <Menu.Item key="user-info"
                                                       icon={<BsPencilSquare/>}
                                                       onClick={handleMenuItemClick}
                                            >
                                                Thông tin tài khoản
                                            </Menu.Item>
                                            <Menu.Item key="user-password"
                                                       icon={<FaUserAlt/>}
                                                       onClick={handleMenuItemClick}
                                            >
                                                Đổi mật khẩu
                                            </Menu.Item>
                                        </SubMenu>
                                        <Menu.Item key="1"
                                                   icon={<AiOutlinePoweroff/>}
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
                                        <Profile/>
                                    </Route>
                                    <Route exact path='/profile/order'>
                                        <HistoryOrder/>
                                    </Route>
                                    <Route exact path='/profile/history-comment'>
                                        <HistoryComment/>
                                    </Route>
                                    <Route exact path='/profile/history-rating'>
                                        <HistoryRating/>
                                    </Route>
                                    <Route exact path='/profile/user-password'>
                                        <ChangePassword/>
                                    </Route>
                                    <Route render={() => {
                                        return (
                                            <Redirect to='/profile/order'/>
                                        )
                                    }}/>
                                </Switch>
                            </S.ProfileContent>
                        </Col>
                    </Row>
                </S.ProfileWrap>
            </ClientStyle.Container>
        </ClientStyle.Section>
    );
}
export default UserProfile;
