import {Menu, Select} from "antd";
import * as S from '../../style'
const StoreFilter = (props) => {
    const {Option} = Select;
    return (
        <S.AffixIndex offsetTop={52.7}>
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
                        <Select
                            defaultValue={''}
                            style={{width: 160, margin: '0 5px'}}
                            getPopupContainer={(trigger) => trigger.parentNode}
                        >
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
export default StoreFilter;
