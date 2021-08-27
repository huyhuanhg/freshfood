import * as LandingStyle from './styles';
import {TITLE} from "../../../contants";

import bg1 from "../../../assets/images/bg1.jpg";
import bg2 from "../../../assets/images/bg2.jpg";
import bg3 from "../../../assets/images/bg3.jpg";
import food1 from '../../../assets/images/food1.jpg';
import food2 from '../../../assets/images/food2.jpg';
import food3 from '../../../assets/images/food3.jpg';
import food4 from '../../../assets/images/food4.jpg';
import store1 from '../../../assets/images/store1.jpeg';
import {Affix, Anchor, Button, Col, Menu, Row, Select, Space} from "antd";
import {IntroduceAnchor, IntroduceFigure, IntroduceLink, Item, StoreItem} from "./styles";
import './styles/style.css';
import {BiStore, FiPercent, GiCheckMark, GiSpellBook, IoFastFoodOutline, MdNavigateNext} from "react-icons/all";
import {Link} from "react-router-dom";
import {AppstoreOutlined, MailOutlined, PieChartOutlined, SettingOutlined} from "@ant-design/icons";

function LangdingPage(props) {
    document.title = TITLE.HOME;
    const {Link: AnchorLink} = Anchor;
    const {Option} = Select;
    const cardList = [
        {
            id: 1,
            avatar: food1,
            name: "Phở",
            store: "Quán phở bình dân",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 2,
            avatar: food2,
            name: "Đùi gà rán",
            store: "Quán gà rán",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 3,
            avatar: food3,
            name: "Bánh mì thịt",
            store: "Lò mì Thủy Tiên",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 4,
            avatar: food4,
            name: "Cua biển",
            store: "Hải sản phố",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 5,
            avatar: food4,
            name: "Cua biển",
            store: "Hải sản phố",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 6,
            avatar: food4,
            name: "Cua biển",
            store: "Hải sản phố",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 7,
            avatar: food1,
            name: "Phở",
            store: "Quán phở bình dân",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 8,
            avatar: food2,
            name: "Đùi gà rán",
            store: "Quán gà rán",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 9,
            avatar: food3,
            name: "Bánh mì thịt",
            store: "Lò mì Thủy Tiên",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 10,
            avatar: food4,
            name: "Cua biển",
            store: "Hải sản phố",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 11,
            avatar: food4,
            name: "Cua biển",
            store: "Hải sản phố",
            price: 30000,
            priceAfter: 28000
        },
        {
            id: 12,
            avatar: food4,
            name: "Cua biển",
            store: "Hải sản phố",
            price: 30000,
            priceAfter: 28000
        },
    ];
    const stores = [
        {
            id: 1,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá"
            }
        },
        {
            id: 6,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá"
            }
        },
        {
            id: 5,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá"
            }
        },
        {
            id: 4,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá"
            }
        },
        {
            id: 3,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá, sẽ tiếp tục ủng hộ lần sau! sẽ tiếp tục ủng hộ lần sau!"
            }
        },
        {
            id: 2,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá"
            }
        },
        {
            id: 12,
            avatar: store1,
            store_name: 'Tiệm bánh ngọt, bánh sinh nhật Bảo Trang',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá"
            }
        },
        {
            id: 11,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá"
            }
        },
        {
            id: 10,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá"
            }
        },
        {
            id: 9,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá Ăn ngon quá"
            }
        },
        {
            id: 8,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://images.foody.vn/usr/g867/8668321/avt/c100x100/0984557415-avatar-914-636495762013014344.jpg',
                comment: "Ăn ngon quá, sẽ tiếp tục ủng hộ lần sau! sẽ tiếp tục ủng hộ lần sau!"
            }
        },
        {
            id: 7,
            avatar: store1,
            store_name: 'Gà rán Bảo Trung',
            store_address: "21/10 Nguyễn Huệ - Ba Đình - Hà Nội",
            total_comment: 10,
            total_food: 100,
            rate: 4.5,
            last_comment: {
                user_name: "Huấn",
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comment: "Ăn ngon quá"
            }
        },
    ];
    const renderStore = (storeList, span = 4) => {
        return (
            <Row gutter={[16, 16]}>
                {storeList.map((store) => {
                    return (
                        <Col span={span} key={store.id}>
                            <StoreItem {...store}  />
                        </Col>
                    );
                })}
            </Row>
        );
    }
    const renderCard = (list, span = 4) => {
        return (
            <Row gutter={[16, 16]}>
                {list.map((card) => {
                    return (
                        <Col span={span} key={card.id}>
                            <Item {...card}  />
                        </Col>
                    );
                })}
            </Row>
        )
    }
    return (
        <>
            <LandingStyle.Heading>
                <LandingStyle.HeadingCarousel autoplay dots={false} effect="fade">
                    <LandingStyle.CarouselItem src={bg1}/>
                    <LandingStyle.CarouselItem src={bg2}/>
                    <LandingStyle.CarouselItem src={bg3}/>
                </LandingStyle.HeadingCarousel>
                <LandingStyle.Slogan>
                    <LandingStyle.SloganTitle>FoodBooking</LandingStyle.SloganTitle>
                    <LandingStyle.SloganDescription>
                        Cửa hàng thực phẩm online,<br/>
                        Không ngại SARS-CoV-2
                    </LandingStyle.SloganDescription>
                    <LandingStyle.SloganBtn>Mua sắm ngay</LandingStyle.SloganBtn>
                </LandingStyle.Slogan>
            </LandingStyle.Heading>

            <LandingStyle.Section>
                <LandingStyle.SectionTitle>Khuyến mãi</LandingStyle.SectionTitle>
                <LandingStyle.SectionContainer>
                    {renderCard(cardList)}
                    <div style={{
                        display: 'flex',
                        alignItem: 'center',
                        justifyContent: 'center',
                        marginTop: '4rem'
                    }}>
                        <Anchor affix={false}>
                            <AnchorLink href='#test' title={(<Button>Xem tất cả</Button>)}/>
                        </Anchor>
                    </div>
                </LandingStyle.SectionContainer>
            </LandingStyle.Section>
            <LandingStyle.Introduce>
                <div>
                    <Row justify="space-around">
                        <Col span={10}>
                            <h2><span>FoodBooking </span>- Thực phẩm online</h2>
                            <p>
                                Trong diễn biến dịch bệnh SARS-CoV-2 đang ngày càng phức tạp,
                                FoodBooking đang phấn đấu từng ngày để chung sức đánh tan dịch bệnh,
                                hỗ trợ và phục vụ khách hàng cùng vượt qua thời điểm khó khăn.
                            </p>
                        </Col>
                        <Col span={10}>
                            <ul>
                                <li><GiCheckMark/> Giao hàng tận nơi</li>
                                <li><GiCheckMark/> Cam kết chất lượng - uy tín</li>
                                <li><GiCheckMark/> Bình ổn giá</li>
                                <li><GiCheckMark/> Vui lòng khách đặt - vừa lòng khách mua</li>
                            </ul>
                        </Col>
                    </Row>
                    <div className="list">
                        <Row justify="center">
                            <Col span={6}>
                                <LandingStyle.IntroduceLink to={'/'} color={'#d44ca1'}>
                                    <figure>
                                        <BiStore/>
                                        <figcaption>
                                            <p>100</p>
                                            <p>Cửa hàng</p>
                                        </figcaption>
                                    </figure>
                                    <span></span>
                                </LandingStyle.IntroduceLink>
                            </Col>
                            <Col span={6}>
                                <LandingStyle.IntroduceLink to={'/'} color={'#e4b42e'}>
                                    <figure>
                                        <IoFastFoodOutline/>
                                        <figcaption>
                                            <p>1000</p>
                                            <p>Món ăn</p>
                                        </figcaption>
                                    </figure>
                                    <span></span>
                                </LandingStyle.IntroduceLink>
                            </Col>
                            <Col span={6}>
                                <LandingStyle.IntroduceLink to={'/'} color={'#1a265c'}>
                                    <figure>
                                        <FiPercent/>
                                        <figcaption>
                                            <p>500</p>
                                            <p>Khuyến mãi</p>
                                        </figcaption>
                                    </figure>
                                    <span></span>
                                </LandingStyle.IntroduceLink>
                            </Col>
                            <Col span={6}>
                                <LandingStyle.IntroduceLink to={'/'} color={'#08bcca'}>
                                    <figure>
                                        <GiSpellBook/>
                                        <figcaption>
                                            <p>10</p>
                                            <p>Danh mục</p>
                                        </figcaption>
                                    </figure>
                                    <span></span>
                                </LandingStyle.IntroduceLink>
                            </Col>
                        </Row>
                    </div>
                </div>
            </LandingStyle.Introduce>

            <LandingStyle.Section>
                <LandingStyle.SectionTitle>Cửa hàng</LandingStyle.SectionTitle>
                <LandingStyle.SectionContainer>
                    {renderStore(stores)}
                </LandingStyle.SectionContainer>
            </LandingStyle.Section>

            <LandingStyle.Invite>
                <div>
                    <Row justify='center'>
                        <Col span={12}>
                            <h2><b>Bạn</b> là người <b>kinh doanh</b>?</h2>
                            <p><b>Chỉ thị 16</b> kéo dài, cửa hàng <b>vắng khách</b>?</p>
                            <p className="invite">Đừng ngần ngại <b>FoodBooking</b> sẽ cùng bạn vượt qua khó khăn</p>
                            <Link to='/'>
                                <LandingStyle.BtnInvite>Đăng ký bán hàng</LandingStyle.BtnInvite>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </LandingStyle.Invite>

            <LandingStyle.Section id='test' style={{backgroundColor: '#eee'}}>
                <LandingStyle.SectionContainer style={{marginTop: 0}}>
                    <Row gutter={20}>
                        <Col span={4}>
                            <Affix offsetTop={75}>
                                <Menu
                                    theme="light"
                                    style={{
                                        background: '#fff',
                                        height: 'auto'
                                    }}
                                    defaultSelectedKeys={['1']}
                                    mode="inline"
                                >
                                    <Menu.Item key="1" icon={<MdNavigateNext/>}>
                                        Ăn vặt
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<MdNavigateNext/>}>
                                        Thực phẩm
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<MdNavigateNext/>}>
                                        Thức ăn nhanh
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={<MdNavigateNext/>}>
                                        Đồ uống
                                    </Menu.Item>
                                    <Menu.Item key="5" icon={<MdNavigateNext/>}>
                                        Tươi sạch
                                    </Menu.Item>
                                </Menu>
                            </Affix>
                        </Col>
                        <Col span={20}>
                            <Affix offsetTop={75}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#ddd'
                                }}>
                                    <Menu mode="horizontal" defaultSelectedKeys={['mail']}
                                          style={{
                                              flexBasis: '50%'
                                          }}
                                    >
                                        <Menu.Item key="mail">Mới nhất </Menu.Item>
                                        <Menu.Item key="app">Khuyến mãi</Menu.Item>
                                        <Menu.Item key="abc">Bán chạy</Menu.Item>
                                    </Menu>
                                    <ul style={{
                                        listStyle: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingRight: '20px',
                                        margin: 0,
                                    }}>
                                        <li>
                                            <Select defaultValue={''} style={{width: 120, margin: '0 5px'}}>
                                                <Option value="" selected hidden disabled>Giá</Option>
                                                <Option value="0">Giá tăng dần</Option>
                                                <Option value="1">Giá giảm dần</Option>
                                            </Select>
                                        </li>
                                        <li>
                                            <Select defaultValue="" style={{width: 160}}>
                                                <Option value="" selected hidden disabled>Đánh giá</Option>
                                                <Option value="0">Đánh giá tăng dần</Option>
                                                <Option value="1">Đánh giá giảm dần</Option>
                                            </Select>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div style={{paddingTop: 20}}>
                                {renderCard(cardList, 6)}
                            </div>

                        </Col>
                    </Row>
                </LandingStyle.SectionContainer>
            </LandingStyle.Section>
        </>
    )
}

export default LangdingPage;
