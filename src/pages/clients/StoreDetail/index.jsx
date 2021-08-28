import {TITLE} from "../../../contants";

import * as ClientStyle from '../styles';
import * as StoreDetailStyle from './style';
import {MainInformation, MicroMainMenu, ResCommon, ResSummaryPoint} from "./style";
import {Affix, Button, Col, Menu, Rate, Row, Select} from "antd";
import {AiFillStar, AiFillTag, BiTime, MdDescription, MdNavigateNext, TiLocationArrow} from "react-icons/all";

const StoreDetail = (props) => {
    document.title = TITLE.STORE_DETAIL

    return (
        <ClientStyle.Section style={{backgroundColor: '#eee'}}>
            <ClientStyle.Container>
                <StoreDetailStyle.MicroHeader>
                    <Row>
                        <Col span={10}>
                            {/*main image*/}
                            <StoreDetailStyle.MainImg>
                                <StoreDetailStyle.ImageWrap>
                                    <StoreDetailStyle.StoreImg
                                        src="https://images.foody.vn/res/g100003/1000029128/prof/s576x330/foody-upload-api-foody-mobile-co-07703aa6-210828113829.jpeg"
                                        alt=""
                                    />
                                </StoreDetailStyle.ImageWrap>


                            </StoreDetailStyle.MainImg>
                        </Col>
                        <Col span={14}>
                            {/*main-information*/}
                            <StoreDetailStyle.MainInformation>
                                <StoreDetailStyle.ResCommon>
                                    <StoreDetailStyle.MainInfoTitle>
                                        <StoreDetailStyle.StoreName>
                                            Bánh Mỳ Cô Thảo - Lê Lợi
                                        </StoreDetailStyle.StoreName>
                                        <StoreDetailStyle.StoreCategory>
                                            <small>Ăn vặt/vỉa hè</small>
                                        </StoreDetailStyle.StoreCategory>
                                    </StoreDetailStyle.MainInfoTitle>
                                    <StoreDetailStyle.ResSummaryPoint>
                                        <StoreDetailStyle.MicroPoints>
                                            <StoreDetailStyle.MicroReviewCount>
                                                4.5 <AiFillStar/>
                                            </StoreDetailStyle.MicroReviewCount>
                                            <StoreDetailStyle.MicroReviewText>
                                                Trung bình
                                            </StoreDetailStyle.MicroReviewText>
                                        </StoreDetailStyle.MicroPoints>
                                        <StoreDetailStyle.MicroPoints>
                                            <StoreDetailStyle.MicroReviewCount>
                                                10
                                            </StoreDetailStyle.MicroReviewCount>
                                            <StoreDetailStyle.MicroReviewText>
                                                Bình luận
                                            </StoreDetailStyle.MicroReviewText>
                                        </StoreDetailStyle.MicroPoints>
                                        <StoreDetailStyle.MicroPoints>
                                            <StoreDetailStyle.MicroReviewCount>
                                                10
                                            </StoreDetailStyle.MicroReviewCount>
                                            <StoreDetailStyle.MicroReviewText>
                                                Món ăn
                                            </StoreDetailStyle.MicroReviewText>
                                        </StoreDetailStyle.MicroPoints>
                                        <StoreDetailStyle.MicroPoints>
                                            <StoreDetailStyle.MicroReviewCount>
                                                100
                                            </StoreDetailStyle.MicroReviewCount>
                                            <StoreDetailStyle.MicroReviewText>
                                                Lượt đánh giá
                                            </StoreDetailStyle.MicroReviewText>
                                        </StoreDetailStyle.MicroPoints>
                                        <StoreDetailStyle.YourRate>
                                            <div>
                                                <Rate defaultValue={0}/>
                                            </div>
                                            <StoreDetailStyle.YourRateCount>
                                                5 <AiFillStar/>
                                            </StoreDetailStyle.YourRateCount>
                                            <StoreDetailStyle.YourRateText>
                                                Đánh giá của bạn
                                            </StoreDetailStyle.YourRateText>
                                        </StoreDetailStyle.YourRate>
                                    </StoreDetailStyle.ResSummaryPoint>
                                    <div>
                                        <StoreDetailStyle.StoreAddress>
                                            <TiLocationArrow/>
                                            <span>
                                                        106 Lê Lợi, P. Hải Châu I, Quận Hải Châu, Đà Nẵng
                                                </span>
                                        </StoreDetailStyle.StoreAddress>
                                        <StoreDetailStyle.StoreTime>
                                            <BiTime/>
                                            <span className="itsopen" title="">Đang mở cửa</span>
                                            <span>&nbsp;06:00 - 09:30 | 15:00 - 17:30</span>
                                        </StoreDetailStyle.StoreTime>

                                        <StoreDetailStyle.StoreTime>
                                            <MdDescription/>
                                            <span>Chúng tôi sẽ cố gắng để phục vụ quý khách chu đáo nhất</span>
                                        </StoreDetailStyle.StoreTime>
                                    </div>
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
                                        Ở đâu
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<MdNavigateNext/>}>
                                        Ăn gì
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<MdNavigateNext/>}>
                                        Khuyến mãi
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={<MdNavigateNext/>}>
                                        Đông khách
                                    </Menu.Item>
                                    <Menu.Item key="5" icon={<MdNavigateNext/>}>
                                        Yêu thích
                                    </Menu.Item>
                                </Menu>
                            </Affix>
                        </Col>
                        <Col span={20}>
                            {/*<Affix offsetTop={75}>*/}
                            {/*    <div style={{*/}
                            {/*        display: 'flex',*/}
                            {/*        justifyContent: 'space-between',*/}
                            {/*        backgroundColor: '#ddd'*/}
                            {/*    }}>*/}
                            {/*        <Menu mode="horizontal" defaultSelectedKeys={['mail']}*/}
                            {/*              style={{*/}
                            {/*                  flexBasis: '50%'*/}
                            {/*              }}*/}
                            {/*        >*/}
                            {/*            <Menu.Item key="mail">Mới nhất </Menu.Item>*/}
                            {/*            <Menu.Item key="app">Đã lưu</Menu.Item>*/}
                            {/*        </Menu>*/}
                            {/*        <ul style={{*/}
                            {/*            listStyle: 'none',*/}
                            {/*            display: 'flex',*/}
                            {/*            alignItems: 'center',*/}
                            {/*            paddingRight: '20px',*/}
                            {/*            margin: 0,*/}
                            {/*        }}>*/}
                            {/*            <li>*/}
                            {/*                <Select defaultValue={''} style={{width: 160, margin: '0 5px'}}>*/}
                            {/*                    <Option value="" selected hidden disabled>-Danh mục-</Option>*/}
                            {/*                    <Option value="0">Sang trọng</Option>*/}
                            {/*                    <Option value="1">Vỉa hè</Option>*/}
                            {/*                    <Option value="2">Buffet</Option>*/}
                            {/*                    <Option value="3">Nhà hàng</Option>*/}
                            {/*                    <Option value="4">Quán ăn</Option>*/}
                            {/*                    <Option value="5">Quán nhậu</Option>*/}
                            {/*                </Select>*/}
                            {/*            </li>*/}
                            {/*            <li>*/}
                            {/*                <Select defaultValue="" style={{width: 160}}>*/}
                            {/*                    <Option value="" selected hidden disabled>-Đánh giá-</Option>*/}
                            {/*                    <Option value="0">Đánh giá tăng dần</Option>*/}
                            {/*                    <Option value="1">Đánh giá giảm dần</Option>*/}
                            {/*                </Select>*/}
                            {/*            </li>*/}
                            {/*        </ul>*/}
                            {/*    </div>*/}
                            {/*</Affix>*/}
                            <div style={{paddingTop: 20}}>
                                {/*{renderStore(stores, 6)}*/}
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
                </StoreDetailStyle.MicroMainMenu>
            </ClientStyle.Container>
        </ClientStyle.Section>
    );
}
export default StoreDetail;