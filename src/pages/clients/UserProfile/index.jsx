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
import {useSelector} from "react-redux";

const UserProfile = (props) => {
    document.title = TITLE.USER_PROFILE;
    const {SubMenu} = Menu;
    const {userInfo} = useSelector(state => state.userReducer);
    return (
        <ClientStyle.Section>
            <ClientStyle.Container>
                <S.ProfileWrap>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Affix offsetTop={52.7}>
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
                                        defaultSelectedKeys={['1']}
                                        mode="inline"
                                    >
                                        <Menu.Item key="1" icon={<FaHistory/>}>
                                            Lịch sử giao dịch
                                        </Menu.Item>
                                        <SubMenu key="sub1" icon={<FiActivity/>} title="Hoạt động cá nhân">
                                            <Menu.Item key="2" icon={<FaComment/>}>Bình luận</Menu.Item>
                                            <Menu.Item key="3" icon={<GiRank3/>}>Đánh giá</Menu.Item>
                                        </SubMenu>
                                        <SubMenu key="sub2" icon={<FiSettings/>} title="Cài đặt tài khoản">
                                            <Menu.Item key="4" icon={<BsPencilSquare/>}>Thông tin cơ bản</Menu.Item>
                                            <Menu.Item key="5" icon={<FaUserAlt/>}>Đổi mật khẩu</Menu.Item>
                                        </SubMenu>
                                        <Menu.Item key="6" icon={<AiOutlinePoweroff/>}>
                                            Đăng xuất
                                        </Menu.Item>
                                    </Menu>
                                </S.ProfileSidebar>
                            </Affix>
                        </Col>
                        <Col span={18}>
                            <S.ProfileContent>
                                <S.ProfileEmpty>
                                    <div><MdRemoveShoppingCart/></div>
                                    <div>Lịch sử giao dịch trống</div>
                                </S.ProfileEmpty>
                            </S.ProfileContent>
                        </Col>
                    </Row>
                </S.ProfileWrap>
            </ClientStyle.Container>
        </ClientStyle.Section>
    );
}
export default UserProfile;
