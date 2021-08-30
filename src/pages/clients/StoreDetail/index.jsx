import {TITLE} from "../../../contants";

import * as ClientStyle from '../styles';
import * as StoreDetailStyle from './style';
import {Affix, Button, Col, Menu, Modal, Rate, Row, Select, Skeleton, Spin} from "antd";
import {
    AiFillStar,
    BiTime, BsFillBookmarkFill,
    FaCommentDots, FaPhoneAlt, FaShareAlt,
    MdDescription,
    MdNavigateNext,
    TiLocationArrow
} from "react-icons/all";

import loadAvatarStore from "../../../assets/images/loadStore.png";

import {FoodStore} from "../../../components/clients/FoodItem";
import {useEffect, useRef, useState} from "react";
import FoodDetailCarousel from "../../../components/clients/FoodDeatilCarousle";
import {useSelector} from "react-redux";
import moment from "moment";

const StoreDetail = (props) => {
    document.title = TITLE.STORE_DETAIL;
    const {foodList} = useSelector(state => state.foodReducer);
    const {storeDetail} = useSelector(state => state.storeReducer);

    const [foodIndex, setFoodIndex] = useState(0);

    const [isOpen, setIsOpen] = useState(null);
    useEffect(() => {
        let open = null;
        if (storeDetail.open_time && storeDetail.close_time) {
            let openTime = moment(storeDetail.open_time, 'H:m');
            let closeTime = moment(storeDetail.close_time, 'H:m');
            let now = moment(moment().format('H:m'), 'H:m');
            if (now > openTime && now < closeTime) {
                open = true;
            } else {
                open = false;
            }
            setIsOpen(open);
        }
    }, []);

    const [showFoodDetail, setShowFoodDetail] = useState(false);
    const renderFoodList = (foodList, span = 6) => {

        return foodList.map((food, index) => {
            return (
                <Col span={span} key={food.id}>
                    <FoodStore {...food} handleClick={setShowFoodDetail} index={index} setIndex={setFoodIndex}/>
                </Col>
            );
        })
    }

    return (
        <ClientStyle.Section style={{backgroundColor: '#eee'}}>
            <ClientStyle.Container>
                <StoreDetailStyle.MicroHeader>
                    <Row>
                        <Col span={10} style={{overflow: 'hidden'}}>
                            {/*main image*/}
                            <StoreDetailStyle.MainImg>
                                <StoreDetailStyle.ImageWrap>
                                    <StoreDetailStyle.StoreImg
                                        src={storeDetail.load ? loadAvatarStore : storeDetail.data.avatar}
                                        alt=""
                                    />
                                </StoreDetailStyle.ImageWrap>


                            </StoreDetailStyle.MainImg>
                        </Col>
                        <Col span={14}>
                            {/*main-information*/}
                            <StoreDetailStyle.MainInformation>

                                <StoreDetailStyle.ResCommon>
                                    {storeDetail.load && <Skeleton loading={storeDetail.load} active/>}
                                    <Skeleton loading={storeDetail.load} title={false} active>
                                        <StoreDetailStyle.MainInfoTitle>
                                            <StoreDetailStyle.StoreName>
                                                {storeDetail.data.store_name}
                                            </StoreDetailStyle.StoreName>
                                            <StoreDetailStyle.StoreCategory>
                                                <small>{storeDetail.data.store_category}</small>
                                            </StoreDetailStyle.StoreCategory>
                                        </StoreDetailStyle.MainInfoTitle>

                                        <StoreDetailStyle.ResSummaryPoint>
                                            <StoreDetailStyle.MicroPoints>
                                                <StoreDetailStyle.MicroReviewCount>
                                                    {storeDetail.data.rate} <AiFillStar/>
                                                </StoreDetailStyle.MicroReviewCount>
                                                <StoreDetailStyle.MicroReviewText>
                                                    Trung bình
                                                </StoreDetailStyle.MicroReviewText>
                                            </StoreDetailStyle.MicroPoints>
                                            <StoreDetailStyle.MicroPoints>
                                                <StoreDetailStyle.MicroReviewCount>
                                                    {storeDetail.data.total_comment}
                                                </StoreDetailStyle.MicroReviewCount>
                                                <StoreDetailStyle.MicroReviewText>
                                                    Bình luận
                                                </StoreDetailStyle.MicroReviewText>
                                            </StoreDetailStyle.MicroPoints>
                                            <StoreDetailStyle.MicroPoints>
                                                <StoreDetailStyle.MicroReviewCount>
                                                    {storeDetail.data.total_food}
                                                </StoreDetailStyle.MicroReviewCount>
                                                <StoreDetailStyle.MicroReviewText>
                                                    Món ăn
                                                </StoreDetailStyle.MicroReviewText>
                                            </StoreDetailStyle.MicroPoints>
                                            <StoreDetailStyle.MicroPoints>
                                                <StoreDetailStyle.MicroReviewCount>
                                                    {storeDetail.data.rate_count}
                                                </StoreDetailStyle.MicroReviewCount>
                                                <StoreDetailStyle.MicroReviewText>
                                                    Lượt đánh giá
                                                </StoreDetailStyle.MicroReviewText>
                                            </StoreDetailStyle.MicroPoints>
                                            <StoreDetailStyle.YourRate>
                                                <div>
                                                    <Rate disabled defaultValue={storeDetail.data.your_rate}/>
                                                </div>
                                                <StoreDetailStyle.YourRateCount>
                                                    {storeDetail.data.your_rate} <AiFillStar/>
                                                </StoreDetailStyle.YourRateCount>
                                                <StoreDetailStyle.YourRateText>
                                                    Đánh giá của bạn
                                                </StoreDetailStyle.YourRateText>
                                            </StoreDetailStyle.YourRate>
                                        </StoreDetailStyle.ResSummaryPoint>
                                        <div>
                                            <StoreDetailStyle.StoreAddress>
                                                <TiLocationArrow/>
                                                <span>{storeDetail.data.store_address}</span>
                                            </StoreDetailStyle.StoreAddress>
                                            <StoreDetailStyle.StoreTime>
                                                <BiTime/>


                                                {
                                                    isOpen === null ?
                                                        <span className="itsopen" title="">Luôn mở cửa</span> :
                                                        (
                                                            isOpen ?
                                                                <span className="itsopen" title="">Đang mở cửa</span> :
                                                                <span className="itsclosed" title="">Chưa mở cửa</span>
                                                        )
                                                }
                                                {isOpen !== null &&
                                                <span>&nbsp;{storeDetail.data.open_time} - {storeDetail.data.close_time}</span>}

                                            </StoreDetailStyle.StoreTime>

                                            <StoreDetailStyle.StoreTime>
                                                <MdDescription/>
                                                <span>{storeDetail.data.store_description}</span>
                                            </StoreDetailStyle.StoreTime>
                                        </div>
                                    </Skeleton>
                                </StoreDetailStyle.ResCommon>
                            </StoreDetailStyle.MainInformation>
                        </Col>
                    </Row>
                </StoreDetailStyle.MicroHeader>
                <StoreDetailStyle.MicroMainMenu>
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
                                        Món ăn
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<MdNavigateNext/>}>
                                        Bình luận
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<MdNavigateNext/>}>
                                        Khuyến mãi
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={<MdNavigateNext/>}>
                                        Hình ảnh
                                    </Menu.Item>
                                    {/*<Menu.Item key="5" icon={<MdNavigateNext/>}>*/}
                                    {/*    Yêu thích*/}
                                    {/*</Menu.Item>*/}
                                </Menu>
                            </Affix>
                        </Col>
                        <Col span={20}>
                            <Affix offsetTop={75}>
                                <StoreDetailStyle.StoreToolbar>
                                    <ul>
                                        <li>
                                            <FaPhoneAlt/> Gọi điện thoại
                                        </li>
                                        <li>
                                            <FaCommentDots/> Bình luận
                                        </li>
                                        <li>
                                            <BsFillBookmarkFill/> Lưu bộ sưu tập
                                        </li>
                                        <li>
                                            <FaShareAlt/> Chia sẻ
                                        </li>
                                    </ul>
                                </StoreDetailStyle.StoreToolbar>
                            </Affix>
                            <Affix offsetTop={125} style={{display: "none"}}>

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
                                        <Menu.Item key="app">Đã lưu</Menu.Item>
                                    </Menu>
                                    <ul style={{
                                        listStyle: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingRight: '20px',
                                        margin: 0,
                                    }}>
                                        <li>
                                            <Select defaultValue={''} style={{width: 160, margin: '0 5px'}}>
                                                <Select.Option value="" selected hidden disabled>-Danh
                                                    mục-</Select.Option>
                                                <Select.Option value="0">Sang trọng</Select.Option>
                                                <Select.Option value="1">Vỉa hè</Select.Option>
                                                <Select.Option value="2">Buffet</Select.Option>
                                                <Select.Option value="3">Nhà hàng</Select.Option>
                                                <Select.Option value="4">Quán ăn</Select.Option>
                                                <Select.Option value="5">Quán nhậu</Select.Option>
                                            </Select>
                                        </li>
                                        <li>
                                            <Select defaultValue="" style={{width: 160}}>
                                                <Select.Option value="" selected hidden disabled>-Đánh
                                                    giá-</Select.Option>
                                                <Select.Option value="0">Đánh giá tăng dần</Select.Option>
                                                <Select.Option value="1">Đánh giá giảm dần</Select.Option>
                                            </Select>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <StoreDetailStyle.StoreContent>
                                <StoreDetailStyle.StoreContentTitle>
                                    Đặt món
                                </StoreDetailStyle.StoreContentTitle>
                                <Row>
                                    {renderFoodList(foodList.data, 12, foodList.load)}
                                    {foodList.load && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%'
                                        }}>
                                            <Spin/>
                                        </div>
                                    )}
                                    <StoreDetailStyle.ModalCustom
                                        closable={false}
                                        footer={
                                            <button>
                                                <span>+&nbsp;</span>Thêm vào giỏ
                                            </button>
                                        }
                                        visible={showFoodDetail}
                                        onCancel={() => setShowFoodDetail(false)}>
                                        <FoodDetailCarousel foodList={foodList.data} index={foodIndex} setIndex={setFoodIndex}/>
                                    </StoreDetailStyle.ModalCustom>
                                </Row>
                                <StoreDetailStyle.ViewOther>
                                    Xem thêm
                                </StoreDetailStyle.ViewOther>
                            </StoreDetailStyle.StoreContent>

                        </Col>
                    </Row>
                </StoreDetailStyle.MicroMainMenu>
            </ClientStyle.Container>
        </ClientStyle.Section>
    );
}
export default StoreDetail;