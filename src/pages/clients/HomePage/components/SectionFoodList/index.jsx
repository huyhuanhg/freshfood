import {Affix,  Button, Col, Menu, Row, Select} from "antd";
import {MdNavigateNext} from "react-icons/all";
import * as HomeS from "../../styles";
import {useDispatch, useSelector} from "react-redux";

const SectionFoodList = ({render}) => {

    const {Option} = Select;
    const dispatch = useDispatch();
    const {foodList} = useSelector(state => state.foodReducer);
    const {tagList} = useSelector(state => state.tagReducer);


    const renderTagList = () => {
        return tagList.data.map(tag => {
            if (tag.tag_active === 1) {
                return (
                    <Menu.Item key={tag.id} icon={<MdNavigateNext className='custom-icon-position'/>}>
                        {tag.tag_name}
                    </Menu.Item>
                );
            }
        });
    }
    return (
        <Row gutter={20}>
            <Col span={4}>
                <Affix offsetTop={52.7}>
                    <Menu
                        theme="light"
                        style={{
                            background: '#fff',
                            height: 'auto'
                        }}
                        defaultSelectedKeys={['0']}
                        mode="inline"
                    >
                        <Menu.Item key="0" icon={<MdNavigateNext className='custom-icon-position'/>}>
                            Tất cả
                        </Menu.Item>
                        {renderTagList()}
                    </Menu>
                </Affix>
            </Col>
            <Col span={20}>
                <HomeS.AffixIndex offsetTop={52.7}>
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
                                <Select defaultValue={''}
                                        style={{width: 120, margin: '0 5px'}}
                                        getPopupContainer={(trigger) => trigger.parentNode}
                                >
                                    <Option value="" selected hidden disabled>Giá</Option>
                                    <Option value="0">Giá tăng dần</Option>
                                    <Option value="1">Giá giảm dần</Option>
                                </Select>
                            </li>
                            <li>
                                <Select
                                    defaultValue=""
                                    style={{width: 160}}
                                    getPopupContainer={(trigger) => {
                                        return trigger.parentNode
                                    }}
                                >
                                    <Option value="" selected hidden disabled>Đánh giá</Option>
                                    <Option value="0">Đánh giá tăng dần</Option>
                                    <Option value="1">Đánh giá giảm dần</Option>
                                </Select>
                            </li>
                        </ul>
                    </div>
                </HomeS.AffixIndex>
                <div style={{paddingTop: 20}}>
                    {render(foodList.data, 6)}
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
    );
}
export default SectionFoodList;
