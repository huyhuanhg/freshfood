import {
    FacebookOutlined,
    GooglePlusOutlined,
    LogoutOutlined, MailOutlined, PhoneOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    SkypeOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Affix, Avatar, Badge, Button, Dropdown, Menu, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import * as HeaderStyle from './styles';

import history from "../../../utils/history";
import {logoutAction} from "../../../redux/actions";
import {AiFillSkype, FaFacebookF, GrGooglePlus, RiMapPin2Fill} from "react-icons/all";

function Header() {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.userReducer);
    const handleLogout = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        dispatch(logoutAction({
            data: userInfo.access_token
        }))
    }
    const userMenu = (
        <Menu style={{marginTop: '2.4rem', width: '250px'}}>
            {
                userInfo.data.id ? (
                    <>
                        <Menu.Item key="1" style={{padding: "1rem 2rem 1rem 2rem"}}>
                            <Space>
                                <HeaderStyle.UserAvatar
                                    size="large"
                                    src={userInfo.data.avatar && `"https://loaclhost:8000/${userInfo.data.avatar}"`}
                                >
                                    {!userInfo.data.avatar && (<span style={{fontSize: '2rem'}}>
                                        {userInfo.data.last_name[0].toUpperCase()}
                                    </span>)}
                                </HeaderStyle.UserAvatar>
                                <div style={{marginLeft: '1rem'}}>
                                    <div>{`${userInfo.data.first_name} ${userInfo.data.last_name}`}</div>
                                    <small style={{color: "#ccc"}}>{userInfo.data.phone}</small>
                                </div>
                            </Space>
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item key="2" style={{padding: "1rem 2rem 1rem 2rem"}}>
                            <Space onClick={handleLogout} style={{width: '100%'}}><LogoutOutlined/>Đăng xuất</Space>
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item key="0" style={{padding: "1rem 2rem 1rem 2rem"}}>
                            <Link to='/login'>Đăng nhập</Link>
                        </Menu.Item>
                        <Menu.Item key="1" style={{padding: "1rem 2rem 1rem 2rem"}}>
                            <Link to='/register'>Đăng ký</Link>
                        </Menu.Item>
                    </>
                )
            }
        </Menu>
    );

    return (
        <>
            <HeaderStyle.TopBar>
                <div>
                    <ul>
                        <li><RiMapPin2Fill/>K5/22 Nam Cao - Hoa Khanh Nam</li>
                        <li><PhoneOutlined/>+84 935 906 860</li>
                        <li><MailOutlined/>huyhuanhg@gmail.com</li>
                    </ul>
                    <div>
                        <p>Flow us:</p>
                        <div><FaFacebookF/></div>
                        <div><GrGooglePlus/></div>
                        <div><AiFillSkype/></div>
                    </div>
                </div>
            </HeaderStyle.TopBar>
            <Affix offsetTop={0}>
                <HeaderStyle.Header>
                    <HeaderStyle.MenuWrap>
                        <HeaderStyle.Logo to='/'>FoodBooking</HeaderStyle.Logo>
                        <HeaderStyle.SearchWrap>
                            <HeaderStyle.Search/>
                        </HeaderStyle.SearchWrap>
                        <Space>
                            <Badge count={1} style={{right: '5px'}}>
                                <HeaderStyle.Btn onClick={() => history.push('/cart')}
                                >
                                    <ShoppingCartOutlined/>Giỏ hàng
                                </HeaderStyle.Btn>
                            </Badge>
                            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    {userInfo.data.id ? (
                                            <HeaderStyle.UserAvatar
                                                size="large"
                                                src={userInfo.data.avatar && `"https://loaclhost:8000/${userInfo.data.avatar}"`}
                                            >
                                                {
                                                    !userInfo.data.avatar &&
                                                    (<span style={{fontSize: '2rem'}}>
                                                {userInfo.data.last_name[0].toUpperCase()}
                                            </span>)}
                                            </HeaderStyle.UserAvatar>
                                        ) :
                                        <HeaderStyle.UserAvatar size="large" icon={<UserOutlined/>}/>
                                    }
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
