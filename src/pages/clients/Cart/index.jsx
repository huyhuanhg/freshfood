import {TITLE} from "../../../contants";
import * as ClientStyle from '../styles/';
import * as S from './style';
import {useSelector} from "react-redux";
import {FcPrevious, HiMinus, HiPlusSm, MdRemoveShoppingCart} from "react-icons/all";
import {Affix, Button, Col, Form, Input, Row} from "antd";
import {Link} from "react-router-dom";
import NumberFormat from "react-number-format";
import {CartOrder} from "./style";
import {useEffect} from "react";

const CartPage = () => {
    document.title = TITLE.CART;
    const {cartList} = useSelector(state => state.cartReducer);
    const {total} = useSelector(state => state.cartReducer);
    const {totalPrice} = useSelector(state => state.cartReducer);
    const {userInfo} = useSelector(state => state.userReducer);
    const [form] = Form.useForm();
    useEffect(() => {
        if (userInfo.data.id) {
            form.setFieldsValue({
                'fullname': `${userInfo.data.first_name} ${userInfo.data.last_name}`,
                'phone': userInfo.data.phone,
                'address': userInfo.data.address,
            });
        }
    }, [userInfo.data])
    const renderCart = () => {
        return cartList.data.map((cartItem) => {
            return (
                <li>
                    <div className='img'>
                        <Link to={'/'}>
                            <img src={cartItem.avatar}/>
                        </Link>
                        <button><span></span> Xóa</button>
                    </div>
                    <S.CartInfo>
                        <div className='food-info'>
                            <div className='food-name'>
                                <Link to={'/'}>
                                    {cartItem.name}
                                </Link>
                            </div>
                            <div className='store-name'>
                                <Link to='/'>
                                    {cartItem.store}
                                </Link>
                            </div>
                        </div>
                        <div className='price-info'>
                                                        <span>
                                                            <NumberFormat value={cartItem.price}
                                                                          displayType={'text'}
                                                                          thousandSeparator suffix={'đ'}/>
                                                            <strike>
                                                            <NumberFormat value={cartItem.discount}
                                                                          displayType={'text'}
                                                                          thousandSeparator suffix={'đ'}/>
                                                            </strike>
                                                        </span>
                            <div className="choose-quantity">
                                <div className="minus"
                                     style={cartItem.quantity === 1 ? {pointerEvents: 'none'} : {}}>
                                    <HiMinus/>
                                </div>
                                <div className="quantity">{cartItem.quantity}</div>
                                <div className="plus">
                                    <HiPlusSm/>
                                </div>
                                <input type="hidden"/>
                            </div>
                        </div>
                    </S.CartInfo>
                </li>
            );
        });
    }
    return (
        <ClientStyle.Section>
            <ClientStyle.Container>
                <S.CartWrap>
                    {cartList.data.length === 0 ?
                        <S.CartEmpty>
                            <div><MdRemoveShoppingCart/></div>
                            <div>Không có sản phẩm nào trong giỏ hàng</div>
                            <button>Tiếp tục mua sắm</button>
                        </S.CartEmpty>
                        :
                        <>
                            <Row gutter={16}>
                                <Col span={15}>
                                    <S.CartTitle>
                                        <Link to='/stores'><FcPrevious/>Mua thêm sản phẩm khác</Link>
                                        <span>Giỏ hàng của bạn</span>
                                    </S.CartTitle>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={15}>
                                    <S.CartContent>
                                        <S.CartList>
                                            {renderCart()}
                                        </S.CartList>
                                        <S.TotalProvisional>
                                            <span>
                                                Tạm tính ({total} sản phẩm):
                                            </span>
                                            <span>
                                                            <NumberFormat value={totalPrice}
                                                                          displayType={'text'}
                                                                          thousandSeparator suffix={'đ'}/>
                                            </span>
                                        </S.TotalProvisional>
                                            <S.DeleteAllBtn>
                                                Xóa tất cả
                                            </S.DeleteAllBtn>
                                    </S.CartContent>
                                </Col>
                                <Col span={9}>
                                    <Affix offsetTop={75.2}>
                                        <S.CartOrder>
                                            <h4>Thông tin khách hàng</h4>
                                            <Form
                                                form={form}
                                                layout="vertical"
                                            >
                                                <Form.Item name='fullname'>
                                                    <Input placeholder="Họ và tên"/>
                                                </Form.Item>
                                                <Form.Item name='phone'>
                                                    <Input placeholder="Số diện thoại"/>
                                                </Form.Item>
                                                <Form.Item name='address'>
                                                    <Input placeholder="Địa chỉ"/>
                                                </Form.Item>
                                                <Form.Item name='note'>
                                                    <Input placeholder="Yêu cầu khác"/>
                                                </Form.Item>
                                                <S.OrderTotal>
                                                    <span>Tổng <b>{total}</b> sản phẩm:</span>
                                                    <span>
                                                            <NumberFormat value={totalPrice}
                                                                          displayType={'text'}
                                                                          thousandSeparator suffix={'đ'}/>
                                                    </span>
                                                </S.OrderTotal>
                                                <Form.Item
                                                    style={{
                                                        textAlign: 'center',
                                                        paddingTop: 20,
                                                        marginBottom: 10
                                                    }}>
                                                    <S.OrderButton htmlType="submit">Đặt hàng</S.OrderButton>
                                                </Form.Item>
                                            </Form>
                                        </S.CartOrder>
                                    </Affix>
                                </Col>
                            </Row>
                        </>
                    }
                </S.CartWrap>
            </ClientStyle.Container>
        </ClientStyle.Section>
    );
}
export default CartPage;