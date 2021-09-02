import {Menu, Select} from "antd";
import * as S from "../../style";

const FoodFilter = (props) => {
    const {Option} = Select;
    return (
        <S.AffixIndex offsetTop={52.7}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#ddd',
                zIndex: 10,
            }}>
                <Menu mode="horizontal" defaultSelectedKeys={['mail']}
                      style={{
                          flexBasis: '50%'
                      }}
                >
                    <Menu.Item key="mail">Mới nhất </Menu.Item>
                    <Menu.Item key="abc">Bán chạy</Menu.Item>
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
                        <Select
                            defaultValue={''}
                            style={{width: 160, margin: '0 5px'}}
                            getPopupContainer={(trigger) => trigger.parentNode}
                        >
                            <Option value="">-Danh mục-</Option>
                            <Option value="0">Ăn vặt</Option>
                            <Option value="1">Thực phẩm</Option>
                            <Option value="2">Thức ăn nhanh</Option>
                            <Option value="3">Đồ uống</Option>
                            <Option value="4">Tươi sạch</Option>
                            <Option value="5">Món nhậu</Option>
                        </Select>
                    </li>
                    <li>
                        <Select
                            defaultValue={''}
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
                            getPopupContainer={(trigger) => trigger.parentNode}
                        >
                            <Option value="" selected hidden disabled>-Đánh giá-</Option>
                            <Option value="0">Đánh giá tăng dần</Option>
                            <Option value="1">Đánh giá giảm dần</Option>
                        </Select>
                    </li>
                </ul>
            </div>
        </S.AffixIndex>
    );
}
export default FoodFilter;
