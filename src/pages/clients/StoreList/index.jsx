import {TITLE} from "../../../contants";
import {Affix, Button, Col, Menu, Row, Select} from "antd";
import {MdNavigateNext} from "react-icons/all";
import store1 from "../../../assets/images/store1.jpeg";
import StoreItem from "../../../components/clients/StoreItem";

import * as StoreListS from "../HomePage/styles";
import * as ClientStyle from '../styles';

function StoreList(props) {
    document.title = TITLE.STORE_LIST;
    const {Option} = Select;
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
                            <StoreItem {...store}/>
                        </Col>
                    );
                })}
            </Row>
        );
    }
    return (
            <ClientStyle.Section style={{backgroundColor: '#eee'}}>
                <ClientStyle.Container>
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
                                                <Option value="" selected hidden disabled>-Danh mục-</Option>
                                                <Option value="0">Sang trọng</Option>
                                                <Option value="1">Vỉa hè</Option>
                                                <Option value="2">Buffet</Option>
                                                <Option value="3">Nhà hàng</Option>
                                                <Option value="4">Quán ăn</Option>
                                                <Option value="5">Quán nhậu</Option>
                                            </Select>
                                        </li>
                                        <li>
                                            <Select defaultValue="" style={{width: 160}}>
                                                <Option value="" selected hidden disabled>-Đánh giá-</Option>
                                                <Option value="0">Đánh giá tăng dần</Option>
                                                <Option value="1">Đánh giá giảm dần</Option>
                                            </Select>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div style={{paddingTop: 20}}>
                                {renderStore(stores, 6)}
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
                </ClientStyle.Container>
            </ClientStyle.Section>
    );
}

export default StoreList;