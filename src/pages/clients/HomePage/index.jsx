import * as HomeS from './styles';
import {TITLE} from "../../../contants";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    Affix,
    Anchor,
    Button,
    Col,
    Menu,
    Row,
    Select
} from "antd";
import {
    BiStore,
    FiPercent,
    GiCheckMark,
    GiSpellBook,
    IoFastFoodOutline,
    MdNavigateNext
} from "react-icons/all";

import history from "../../../utils/history";

import bg1 from "../../../assets/images/bg1.jpg";
import bg2 from "../../../assets/images/bg2.jpg";
import bg3 from "../../../assets/images/bg3.jpg";

import './styles/style.css';

import {FoodItemHome} from "../../../components/clients/FoodItem";
import StoreItem from "../../../components/clients/StoreItem";
import {useState} from "react";
import FoodDetailModal from "../../../components/clients/FoodDetailModal";

function HomePage(props) {
    document.title = TITLE.HOME;

    const {Option} = Select;

    const {foodList} = useSelector(state => state.foodReducer);
    const {foodPromotions} = useSelector(state => state.foodReducer);
    const {storeList} = useSelector(state => state.storeReducer);

    const {Link: AnchorLink} = Anchor;

    const [showFoodDetail, setShowFoodDetail] = useState(false);

    const renderStore = (span = 4) => {
        return (
            <Row gutter={[16, 16]}>
                {storeList.data.map((store) => {
                    return (
                        <Col span={span} key={store.id}>
                            <StoreItem {...store} />
                        </Col>
                    );
                })}
            </Row>
        );
    }
    const renderFood = (foodList, span = 4) => {
        return (
            <Row gutter={[16, 16]}>
                {foodList.map((food) => {
                    return (
                        <Col span={span} key={food.id}>
                            <FoodItemHome {...food}  setShowDetail={setShowFoodDetail} />
                        </Col>
                    );
                })}
            </Row>
        )
    }
    return (
        <>
            <FoodDetailModal show={showFoodDetail} setShow={setShowFoodDetail}/>
            <HomeS.Heading>
                <HomeS.HeadingCarousel autoplay dots={false} effect="fade">
                    <HomeS.CarouselItem src={bg1}/>
                    <HomeS.CarouselItem src={bg2}/>
                    <HomeS.CarouselItem src={bg3}/>
                </HomeS.HeadingCarousel>
                <HomeS.Slogan>
                    <HomeS.SloganTitle>FoodBooking</HomeS.SloganTitle>
                    <HomeS.SloganDescription>
                        Cửa hàng thực phẩm online,<br/>
                        Không ngại SARS-CoV-2
                    </HomeS.SloganDescription>
                    <HomeS.SloganBtn onClick={() => history.push('/stores')}>Mua sắm ngay</HomeS.SloganBtn>
                </HomeS.Slogan>
            </HomeS.Heading>

            <HomeS.Section>
                <HomeS.SectionTitle>Khuyến mãi</HomeS.SectionTitle>
                <HomeS.SectionContainer>
                    {renderFood(foodPromotions.data)}
                    <div style={{
                        display: 'flex',
                        alignItem: 'center',
                        justifyContent: 'center',
                        marginTop: '3rem'
                    }}>
                        <Anchor affix={false}>
                            <AnchorLink href='#test' title={(<Button>Xem tất cả</Button>)}/>
                        </Anchor>
                    </div>
                </HomeS.SectionContainer>
            </HomeS.Section>
            <HomeS.Introduce>
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
                                <HomeS.IntroduceLink to={'/'} color={'#d44ca1'}>
                                    <figure>
                                        <BiStore/>
                                        <figcaption>
                                            <p>100</p>
                                            <p>Cửa hàng</p>
                                        </figcaption>
                                    </figure>
                                    <span></span>
                                </HomeS.IntroduceLink>
                            </Col>
                            <Col span={6}>
                                <HomeS.IntroduceLink to={'/'} color={'#e4b42e'}>
                                    <figure>
                                        <IoFastFoodOutline/>
                                        <figcaption>
                                            <p>1000</p>
                                            <p>Món ăn</p>
                                        </figcaption>
                                    </figure>
                                    <span></span>
                                </HomeS.IntroduceLink>
                            </Col>
                            <Col span={6}>
                                <HomeS.IntroduceLink to={'/'} color={'#1a265c'}>
                                    <figure>
                                        <FiPercent/>
                                        <figcaption>
                                            <p>500</p>
                                            <p>Khuyến mãi</p>
                                        </figcaption>
                                    </figure>
                                    <span></span>
                                </HomeS.IntroduceLink>
                            </Col>
                            <Col span={6}>
                                <HomeS.IntroduceLink to={'/'} color={'#08bcca'}>
                                    <figure>
                                        <GiSpellBook/>
                                        <figcaption>
                                            <p>10</p>
                                            <p>Danh mục</p>
                                        </figcaption>
                                    </figure>
                                    <span></span>
                                </HomeS.IntroduceLink>
                            </Col>
                        </Row>
                    </div>
                </div>
            </HomeS.Introduce>

            <HomeS.Section>
                <HomeS.SectionTitle>Cửa hàng</HomeS.SectionTitle>
                <HomeS.SectionContainer>
                    {renderStore()}
                    <div style={{
                        display: 'flex',
                        alignItem: 'center',
                        justifyContent: 'center',
                        marginTop: '3rem'
                    }}>
                        <Link to='/stores'>
                            <Button>Xem tất cả</Button>
                        </Link>
                    </div>
                </HomeS.SectionContainer>
            </HomeS.Section>

            <HomeS.Invite>
                <div>
                    <Row justify='center'>
                        <Col span={12}>
                            <h2><b>Bạn</b> là người <b>kinh doanh</b>?</h2>
                            <p><b>Chỉ thị 16</b> kéo dài, cửa hàng <b>vắng khách</b>?</p>
                            <p className="invite">Đừng ngần ngại <b>FoodBooking</b> sẽ cùng bạn vượt qua khó khăn</p>
                            <Link to='/'>
                                <HomeS.BtnInvite>Đăng ký bán hàng</HomeS.BtnInvite>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </HomeS.Invite>

            <HomeS.Section id='test' style={{backgroundColor: '#eee'}}>
                <HomeS.SectionContainer style={{marginTop: 0}}>
                    <Row gutter={20}>
                        <Col span={4}>
                            <Affix offsetTop={52.7}>
                                <Menu
                                    theme="light"
                                    style={{
                                        background: '#fff',
                                        height: 'auto'
                                    }}
                                    defaultSelectedKeys={['1']}
                                    mode="inline"
                                >
                                    <Menu.Item key="1" icon={<MdNavigateNext className='custom-icon-position'/>}>
                                        Tất cả
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<MdNavigateNext className='custom-icon-position'/>}>
                                        Ăn vặt
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<MdNavigateNext className='custom-icon-position'/>}>
                                        Thực phẩm
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={<MdNavigateNext className='custom-icon-position'/>}>
                                        Thức ăn nhanh
                                    </Menu.Item>
                                    <Menu.Item key="5" icon={<MdNavigateNext className='custom-icon-position'/>}>
                                        Đồ uống
                                    </Menu.Item>
                                    <Menu.Item key="6" icon={<MdNavigateNext className='custom-icon-position'/>}>
                                        Tươi sạch
                                    </Menu.Item>
                                </Menu>
                            </Affix>
                        </Col>
                        <Col span={20}>
                            <Affix offsetTop={52.7}>
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
                                {renderFood(foodList.data, 6)}
                                <div style={{
                                    display: 'flex',
                                    alignItem: 'center',
                                    justifyContent: 'center',
                                    marginTop: '3rem'
                                }}>
                                    <Button>Xem thêm</Button>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </HomeS.SectionContainer>
            </HomeS.Section>
        </>
    )
}

export default HomePage;
