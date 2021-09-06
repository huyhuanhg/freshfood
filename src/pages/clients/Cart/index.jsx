import { ROOT_PATH, TITLE } from '../../../contants';
import * as ClientStyle from '../styles/';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { FcPrevious, HiMinus, HiPlusSm, MdRemoveShoppingCart } from 'react-icons/all';
import { Affix, Col, Form, Input, Row, Spin } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { useEffect, useState } from 'react';
import { getCartsAction } from '../../../redux/actions';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartList, total, totalMoney } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);

  document.title = `${TITLE.CART} | ${userInfo.data.firstName} ${userInfo.data.lastName}`;

  const [redirect, setRedirect] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const userToken = localStorage.userInfo;
    if (!userToken || userInfo.error) {
      setRedirect(true);
    }
    if (userInfo.data.id) {
      form.setFieldsValue({
        fullname: `${userInfo.data.firstName} ${userInfo.data.lastName}`,
        phone: userInfo.data.phone,
        address: userInfo.data.address,
      });
      dispatch(
        getCartsAction({
          data: JSON.parse(userToken).accessToken,
        })
      );
    }
  }, [userInfo]);

  const renderCart = () => {
    return cartList.data.map((cartItem, cartIndex) => {
      return (
        <li key={cartIndex}>
          <div className="img">
            <Link to={'/'} style={{}}>
              <img src={`${ROOT_PATH}${cartItem.foodAvatar}`} alt="" />
            </Link>
            <button>
              <span /> Xóa
            </button>
          </div>
          <S.CartInfo>
            <div className="food-info">
              <div className="food-name">
                <Link to={'/'}>{cartItem.foodName}</Link>
              </div>
              <div className="store-name">
                <Link to={`/stores/${cartItem.storeNotMark}.${cartItem.storeId}`}>{cartItem.storeName}</Link>
              </div>
            </div>
            <div className="price-info">
              <div className="choose-quantity">
                <div className="minus" style={cartItem.pivot.quantity === 1 ? { pointerEvents: 'none' } : {}}>
                  <HiMinus />
                </div>
                <div className="quantity">{cartItem.pivot.quantity}</div>
                <div className="plus">
                  <HiPlusSm />
                </div>
                <input type="hidden" />
              </div>
              <span>
                <strike>
                  <NumberFormat
                    value={cartItem.discount?.value && cartItem.price * cartItem.pivot.quantity}
                    displayType={'text'}
                    thousandSeparator
                    suffix={'đ'}
                  />
                </strike>
                <NumberFormat
                  value={
                    (cartItem.discount?.value ? cartItem.discount?.value : cartItem.price) * cartItem.pivot.quantity
                  }
                  displayType={'text'}
                  thousandSeparator
                  suffix={'đ'}
                />
              </span>
            </div>
          </S.CartInfo>
        </li>
      );
    });
  };
  if (redirect) {
    return <Redirect to="/" />;
  } else {
    if (userInfo.load) {
      return (
        <Spin
          size={'large'}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      );
    } else {
      return (
        <ClientStyle.Section>
          <ClientStyle.Container>
            <S.CartWrap>
              {total === 0 ? (
                <S.CartEmpty>
                  <div>
                    <MdRemoveShoppingCart />
                  </div>
                  <div>Không có sản phẩm nào trong giỏ hàng</div>
                  <button>Tiếp tục mua sắm</button>
                </S.CartEmpty>
              ) : (
                <>
                  <Row gutter={16}>
                    <Col span={15}>
                      <S.CartTitle>
                        <Link to="/stores">
                          <FcPrevious />
                          Mua thêm sản phẩm khác
                        </Link>
                        <span>Giỏ hàng của bạn</span>
                      </S.CartTitle>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={15}>
                      <S.CartContent>
                        <S.CartList>{renderCart()}</S.CartList>
                        <S.TotalProvisional>
                          <span>Tạm tính ({total} sản phẩm):</span>
                          <span>
                            <NumberFormat value={totalMoney} displayType={'text'} thousandSeparator suffix={'đ'} />
                          </span>
                        </S.TotalProvisional>
                        <S.DeleteAllBtn>Xóa tất cả</S.DeleteAllBtn>
                      </S.CartContent>
                    </Col>
                    <Col span={9}>
                      <Affix offsetTop={75.2}>
                        <S.CartOrder>
                          <h4>Thông tin khách hàng</h4>
                          <Form form={form} layout="vertical">
                            <Form.Item name="fullname">
                              <Input placeholder="Họ và tên" />
                            </Form.Item>
                            <Form.Item name="phone">
                              <Input placeholder="Số diện thoại" />
                            </Form.Item>
                            <Form.Item name="address">
                              <Input placeholder="Địa chỉ" />
                            </Form.Item>
                            <Form.Item name="note">
                              <Input placeholder="Yêu cầu khác" />
                            </Form.Item>
                            <S.OrderTotal>
                              <span>
                                Tổng <b>{total}</b> sản phẩm:
                              </span>
                              <span>
                                <NumberFormat value={totalMoney} displayType={'text'} thousandSeparator suffix={'đ'} />
                              </span>
                            </S.OrderTotal>
                            <Form.Item
                              style={{
                                textAlign: 'center',
                                paddingTop: 20,
                                marginBottom: 10,
                              }}
                            >
                              <S.OrderButton htmlType="submit">Đặt hàng</S.OrderButton>
                            </Form.Item>
                          </Form>
                        </S.CartOrder>
                      </Affix>
                    </Col>
                  </Row>
                </>
              )}
            </S.CartWrap>
          </ClientStyle.Container>
        </ClientStyle.Section>
      );
    }
  }
};
export default CartPage;
