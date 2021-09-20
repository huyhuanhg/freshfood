import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { FcPrevious, HiMinus, HiPlusSm, MdRemoveShoppingCart } from 'react-icons/all';
import { Affix, Col, Form, Input, Row, Select, Spin } from 'antd';
import NumberFormat from 'react-number-format';

import * as S from './style';
import * as ClientStyle from '../styles';

import {
  createOrderAction,
  destroyCartsAction,
  getAddressAction,
  getCartsAction,
  getDistrictsAction, getWardsAction,
  updateCartAction,
} from '../../../redux/actions';

import history from '../../../utils/history';
import { ROOT_PATH, TITLE } from '../../../contants';
import { shortAddress } from '../../../utils/address';

const CartPage = () => {
  const { Option } = Select;
  const [orderForm] = Form.useForm();
  const dispatch = useDispatch();

  const { cartList, total, totalMoney } = useSelector(({ cartReducer }) => cartReducer);
  const { userInfo } = useSelector(({ userReducer }) => userReducer);
  const { provinces, districts, wards } = useSelector(({ addressReducer }) => addressReducer);

  document.title = `${TITLE.CART} | ${userInfo.data.firstName} ${userInfo.data.lastName}`;

  const [redirect, setRedirect] = useState(false);
  const userToken = localStorage.userInfo;

  useEffect(() => {
    if (!userToken || userInfo.error) {
      setRedirect(true);
    }
    if (userInfo.data.id) {
      const { provinceCode, districtCode, wardCode } = userInfo.data;

      orderForm.setFieldsValue({
        fullName: `${userInfo.data.firstName} ${userInfo.data.lastName}`,
        phone: userInfo.data.phone,
        address: {
          province: provinceCode,
          district: districtCode,
          ward: wardCode,
        },
      });
      dispatch(
        getCartsAction({
          data: {
            accessToken: JSON.parse(userToken).accessToken,
          },
        }),
      );
      dispatch(getAddressAction({
        provinceCode,
        districtCode,
      }));
    }
  }, [userInfo]);

  const handleOrder = (value) => {
    dispatch(createOrderAction({
      accessToken: JSON.parse(userToken).accessToken,
      data: {
        ...value,
        address: shortAddress(value.address, provinces.data, districts.data, wards.data),
      },
    }));
  };

  const renderAddressInfo = (typeList) => {
    return typeList.map((typeListItem) => {
      return (
        <Option key={typeListItem.code} value={typeListItem.code}>{typeListItem.name}</Option>
      );
    });
  };
  const renderCart = () => {
    return cartList.data.map((cartItem) => {
      return (
        <li key={cartItem.id} style={{ position: 'relative' }}>
          {
            cartItem.load &&
            <div className='p-absolute' style={{ top: '50%', left: '50%' }}>
              <Spin />
            </div>
          }
          <div className='img'>
            <Link to={`/stores/${cartItem.storeNotMark}.${cartItem.storeId}`} style={{}}>
              <img src={`${ROOT_PATH}${cartItem.foodImage}`} alt='' />
            </Link>
            <button onClick={() => {
              dispatch(destroyCartsAction({
                data: {
                  accessToken: JSON.parse(userToken).accessToken,
                  food: cartItem.id,
                },
              }));
            }}>
              <span /> Xóa
            </button>
          </div>
          <S.CartInfo>
            <div className='food-info'>
              <div className='food-name'>
                <Link to={`/stores/${cartItem.storeNotMark}.${cartItem.storeId}`}>{cartItem.foodName}</Link>
              </div>
              <div className='store-name'>
                <Link to={`/stores/${cartItem.storeNotMark}.${cartItem.storeId}`}>
                  {cartItem.storeName}
                </Link>
              </div>
            </div>
            <div className='price-info'>
              <div className='choose-quantity'>
                <div
                  className='minus'
                  style={
                    cartItem.pivot.quantity === 1 ? { pointerEvents: 'none' } : {}
                  }
                  onClick={() => {
                    dispatch(updateCartAction({
                      data: {
                        accessToken: JSON.parse(userToken).accessToken,
                        food: cartItem.id,
                        action: -1,
                      },
                    }));
                  }}
                >
                  <HiMinus />
                </div>
                <div className='quantity'>{cartItem.pivot.quantity}</div>
                <div
                  className='plus'
                  onClick={() => {
                    dispatch(updateCartAction({
                      data: {
                        accessToken: JSON.parse(userToken).accessToken,
                        food: cartItem.id,
                      },
                    }));
                  }}
                >
                  <HiPlusSm />
                </div>
                <input type='hidden' />
              </div>
              <span>
                <strike>
                  <NumberFormat
                    value={
                      cartItem.discount < cartItem.price &&
                      cartItem.price * cartItem.pivot.quantity
                    }
                    displayType={'text'}
                    thousandSeparator
                    suffix={'đ'}
                  />
                </strike>
                <NumberFormat
                  value={cartItem.discount * cartItem.pivot.quantity}
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
    return <Redirect to='/' />;
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
          <S.CartHeader>
            <ClientStyle.Container>
              <div className='header-cart'>
                Giỏ hàng
                <span className='back' onClick={() => history.goBack()}>
                  <FcPrevious /> Quay lại
                </span>
              </div>
            </ClientStyle.Container>
          </S.CartHeader>
          <ClientStyle.Container>
            <S.CartWrap>
              {
                cartList.load ?
                  <div
                    className='d-flex horizontal-center vertical-center'
                    style={{
                      minHeight: '500px',
                      alignItems: 'center',
                    }}
                  >
                    <Spin />
                  </div>
                  :
                  <div>

                    {total === 0 ?
                      (
                        <S.CartEmpty>
                          <div>
                            <MdRemoveShoppingCart />
                          </div>
                          <div>Không có sản phẩm nào trong giỏ hàng</div>
                          <button onClick={() => history.push('/foods')}>Tiếp tục mua sắm</button>
                        </S.CartEmpty>
                      )
                      :
                      <Row gutter={16}>
                        <Col span={15}>
                          <S.CartContent>
                            <S.CartList>{renderCart()}</S.CartList>
                            <S.TotalProvisional>
                              <span>Tạm tính ({total} sản phẩm):</span>
                              <span>
                                <NumberFormat
                                  value={totalMoney}
                                  displayType={'text'}
                                  thousandSeparator
                                  suffix={'đ'}
                                />
                              </span>
                            </S.TotalProvisional>
                            <S.DeleteAllBtn
                              onClick={() => {
                                dispatch(destroyCartsAction({
                                  data: {
                                    accessToken: JSON.parse(userToken).accessToken,
                                  },
                                }));
                              }}
                            >
                              Xóa tất cả
                            </S.DeleteAllBtn>
                          </S.CartContent>
                        </Col>
                        <Col span={9}>
                          <Affix offsetTop={75.2}>
                            <S.CartOrder>
                              <h4>Thông tin khách hàng</h4>
                              <Form
                                form={orderForm}
                                layout='vertical'
                                onFinish={handleOrder}
                              >
                                <Form.Item name='fullName'>
                                  <Input placeholder='Họ và tên' />
                                </Form.Item>
                                <Form.Item name='phone'>
                                  <Input placeholder='Số diện thoại' />
                                </Form.Item>

                                <Form.Item style={{ marginBottom: 0 }}>
                                  <Input.Group>
                                    <Row gutter={3}>
                                      <Col span={12}>
                                        <Form.Item
                                          name={['address', 'province']}
                                          // rules={[{ required: true, message: 'Province is required' }]}
                                        >
                                          <Select
                                            placeholder='--Tỉnh--'
                                            style={{ width: '100%' }}
                                            onChange={(value) => {
                                              dispatch(getDistrictsAction({
                                                provinceCode: value,
                                              }));
                                              orderForm.setFieldsValue({
                                                address: {
                                                  district: null,
                                                  ward: null,
                                                },
                                              });
                                            }}
                                          >
                                            {renderAddressInfo(provinces.data)}
                                          </Select>
                                        </Form.Item>
                                      </Col>

                                      <Col span={12}>
                                        <Form.Item
                                          name={['address', 'district']}
                                          // rules={[{ required: true, message: 'Province is required' }]}
                                        >
                                          <Select
                                            placeholder='--Quận/Huyện--'
                                            style={{ width: '100%' }}
                                            disabled={districts.load}
                                            onChange={(value) => {
                                              dispatch(getWardsAction({
                                                districtCode: value,
                                              }));
                                              orderForm.setFieldsValue({
                                                address: {
                                                  ward: null,
                                                },
                                              });
                                            }}
                                          >
                                            {renderAddressInfo(districts.data)}
                                          </Select>
                                        </Form.Item>
                                      </Col>
                                    </Row>

                                    <Row gutter={3}>
                                      <Col span={12}>
                                        <Form.Item
                                          name={['address', 'ward']}
                                          // rules={[{ required: true, message: 'Province is required' }]}
                                        >
                                          <Select
                                            placeholder='--Phường/Xã--'
                                            style={{ width: '100%' }}
                                            disabled={wards.data.length === 0}
                                          >
                                            {renderAddressInfo(wards.data)}
                                          </Select>
                                        </Form.Item>
                                      </Col>

                                      <Col span={12}>
                                        <Form.Item
                                          name={['address', 'street']}
                                          rules={[{ required: true, message: 'Street is required' }]}
                                        >
                                          <Input placeholder='Đường / Thôn xóm' />
                                        </Form.Item>
                                      </Col>
                                    </Row>
                                  </Input.Group>
                                </Form.Item>

                                <Form.Item name='note'>
                                  <Input placeholder='Yêu cầu khác' />
                                </Form.Item>

                                <S.OrderTotal>
                                  <span>Tổng <b>{total}</b> sản phẩm:</span>
                                  <span>
                                    <NumberFormat
                                      value={totalMoney}
                                      displayType={'text'}
                                      thousandSeparator
                                      suffix={'đ'}
                                    />
                                  </span>
                                </S.OrderTotal>
                                <Form.Item
                                  style={{
                                    textAlign: 'center',
                                    paddingTop: 20,
                                    marginBottom: 10,
                                  }}
                                >
                                  <S.OrderButton htmlType='submit' disabled={total === 0}>
                                    Đặt hàng
                                  </S.OrderButton>
                                </Form.Item>
                              </Form>
                            </S.CartOrder>
                          </Affix>
                        </Col>
                      </Row>
                    }
                  </div>
              }
            </S.CartWrap>
          </ClientStyle.Container>
        </ClientStyle.Section>
      );
    }
  }
};
export default CartPage;
