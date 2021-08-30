import {TITLE} from "../../../contants";
import {Affix, Button, Col, Menu, Row, Select} from "antd";
import {useSelector} from "react-redux";
import {MdNavigateNext} from "react-icons/all";
import store1 from "../../../assets/images/store1.jpeg";
import StoreItem from "../../../components/clients/StoreItem";

import * as StoreListS from "../HomePage/styles";
import * as ClientStyle from '../styles';

function StoreList(props) {
    document.title = TITLE.STORE_LIST;
    const {Option} = Select;
    const {storeList} = useSelector(state => state.storeReducer);
    const renderStore = (span = 4) => {
        return (
            <Row gutter={[16, 16]}>
                {storeList.data.map((store) => {
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
                            {renderStore(6)}
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
