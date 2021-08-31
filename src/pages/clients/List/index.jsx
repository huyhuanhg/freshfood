import * as ClientStyle from "../styles";
import {Affix, Col, Menu, Row} from "antd";
import {MdNavigateNext} from "react-icons/all";
import history from "../../../utils/history";
import {Route, Switch} from "react-router-dom";
import StoreList from "./StoreList";
import FoodList from "./FoodList";
import Promotions from "./Promotions";
import CrowdedList from "./CrowdedList";
import FavoritesList from "./FavoritesList";

const ClientList = (props) => {
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
                                defaultSelectedKeys={[history.location.pathname]}
                                mode="inline"
                            >
                                <Menu.Item
                                    key="/stores"
                                    icon={<MdNavigateNext/>}
                                    onClick={() => {
                                        history.push('/stores')
                                    }}
                                >
                                    Ở đâu
                                </Menu.Item>
                                <Menu.Item
                                    key="/foods"
                                    icon={<MdNavigateNext/>}
                                    onClick={() => {
                                        history.push('/foods')
                                    }}
                                >
                                    Ăn gì
                                </Menu.Item>
                                <Menu.Item
                                    key="/promotions"
                                    icon={<MdNavigateNext/>}
                                    onClick={() => {
                                        history.push('/promotions')
                                    }}
                                >
                                    Khuyến mãi
                                </Menu.Item>
                                <Menu.Item
                                    key="/crowded"
                                    icon={<MdNavigateNext/>}
                                    onClick={() => {
                                        history.push('/crowded')
                                    }}
                                >
                                    Đông khách
                                </Menu.Item>
                                <Menu.Item
                                    key="/favorite"
                                    icon={<MdNavigateNext/>}
                                    onClick={() => {
                                        history.push('/favorite')
                                    }}
                                >
                                    Yêu thích
                                </Menu.Item>
                            </Menu>
                        </Affix>
                    </Col>
                    <Col span={20}>
                        <Switch>
                            <Route exact path='/stores' component={StoreList}/>
                            <Route exact path='/foods' component={FoodList}/>
                            <Route exact path='/promotions' component={Promotions}/>
                            <Route exact path='/crowded' component={CrowdedList}/>
                            <Route exact path='/favorite' component={FavoritesList}/>
                        </Switch>
                    </Col>
                </Row>
            </ClientStyle.Container>
        </ClientStyle.Section>
    );
}
export default ClientList;