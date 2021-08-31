import {AiFillSkype, FaFacebookF, FaHistory, FiActivity, GrGooglePlus, RiMapPin2Fill} from "react-icons/all";
import {useState} from "react";
import {
    LogoutOutlined,
    MailOutlined,
    PhoneOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Affix, Badge, Dropdown, Form, Input, Menu, Space} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

import * as HeaderStyle from './styles';

import history from "../../../utils/history";
import {logoutAction} from "../../../redux/actions";

function Header({setShowModalLogin}) {
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.userReducer);
    const {total} = useSelector(state => state.cartReducer);

    const [showProfileMenu, setShowProfileMenu] = useState(false);

    window.addEventListener('scroll', () => {
        if (showProfileMenu) {
            setShowProfileMenu(false);
        }
    });
    window.addEventListener('click', () => {
        if (showProfileMenu) {
            setShowProfileMenu(false);
        }
    });
    const handleLogout = () => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        dispatch(logoutAction({
            data: userInfo.access_token
        }))
    }


    const userMenu = (
        <Menu style={{top: '18px', width: '250px'}}>
            {
                userInfo.data.id ? (
                    <>
                        <Menu.Item
                            key="1"
                            style={{padding: "1rem 2rem"}}
                            onClick={() => {
                                history.push('/profile/user-info');
                                setShowProfileMenu(false);
                            }}
                        >
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
                        <Menu.Item
                            key="2"
                            style={{padding: "1rem 2rem"}}
                            icon={<FaHistory/>}
                            onClick={() => {
                                history.push('/profile/order');
                                setShowProfileMenu(false);
                            }}
                        >
                            Lịch sử giao dịch
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item
                            key="3"
                            style={{padding: "1rem 2rem"}}
                            icon={<FiActivity/>}
                            onClick={() => {
                                history.push('/profile/history-comment');
                                setShowProfileMenu(false);
                            }}
                        >
                            Hoạt động cá nhân
                        </Menu.Item>
                        <Menu.Divider/>
                        <Menu.Item
                            key="4"
                            style={{padding: "1rem 2rem"}}
                            icon={<LogoutOutlined/>}
                            onClick={handleLogout}
                        >
                            Đăng xuất
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item key="0" style={{padding: "1rem 2rem"}}>
                            <Link to='/login'>Đăng nhập</Link>
                        </Menu.Item>
                        <Menu.Item key="1" style={{padding: "1rem 2rem"}}>
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
                            {/*<HeaderStyle.Search/>*/}
                            <Form>
                                <Form.Item style={{marginBottom: 0}}>
                                    <Input placeholder='Món ăn, cửa hàng' style={{background: "unset"}}/>
                                </Form.Item>
                            </Form>
                        </HeaderStyle.SearchWrap>
                        <Space>
                            <Badge count={total} style={{right: '5px'}}>
                                <HeaderStyle.Btn
                                    onClick={() => {
                                        if (userInfo.data.id) {
                                            history.push('/cart')
                                        } else {
                                            setShowModalLogin(true);
                                        }
                                    }}
                                    disabled={history.location.pathname === '/cart'}
                                >
                                    <ShoppingCartOutlined/>Giỏ hàng
                                </HeaderStyle.Btn>
                            </Badge>
                            <Dropdown
                                overlay={userMenu}
                                trigger={['click']}
                                placement="bottomRight"
                                visible={showProfileMenu}
                                className={'test'}
                            >
                                <a
                                    className="ant-dropdown-link"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowProfileMenu(!showProfileMenu);
                                    }}
                                >
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
