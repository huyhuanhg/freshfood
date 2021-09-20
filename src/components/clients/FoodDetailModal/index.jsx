import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { ROOT_PATH } from '../../../contants';

import { updateCartAction } from '../../../redux/actions';

import * as S from './style';

const FoodDetailModal = function({ show, setShow, setShowLogin }) {
  const dispatch = useDispatch();
  const { foodDetail } = useSelector(({ foodReducer }) => foodReducer);
  const { userInfo } = useSelector(({ userReducer }) => userReducer);

  return (
    <S.ModalCustom
      closable={false}
      footer={
        <button
          onClick={() => {
            if (!userInfo.data.id) {
              setShow(false);
              setShowLogin(true);
            } else {
              const userToken = localStorage.userInfo;
              dispatch(updateCartAction({
                data: {
                  accessToken: JSON.parse(userToken).accessToken,
                  food: foodDetail.data.id,
                  isDisplayMessage: true,
                },
              }));
              setShow(false);
            }
          }}
        >
          <span>+&nbsp;</span>Thêm vào giỏ
        </button>
      }
      visible={show}
      onCancel={() => {
        setShow(false);
      }}
    >
      <S.FoodItem>
        <div>
          <img src={`${ROOT_PATH}${foodDetail.data.foodImage}`}  alt={foodDetail.data.foodName}/>
          <div className='info'>
            <Row>
              <Col span={20}>
                <div className='imgbox-food-name'>{foodDetail.data.foodName}</div>
                <div className='imgbox-desc'>{foodDetail.data.foodDescription}</div>
                <div className='imgbox-total'>
                  Đã được đặt
                  <span className='txt-bold'>
                    &nbsp;{foodDetail.data.foodConsume}&nbsp;
                  </span>
                  lần
                </div>
              </Col>
              <Col span={4} style={{ alignSelf: 'center' }}>
                <div className='imgbox-current-price'>
                  <NumberFormat
                    value={foodDetail.data.discount}
                    displayType={'text'}
                    thousandSeparator
                    suffix={'đ'}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </S.FoodItem>
    </S.ModalCustom>
  );
};
export default FoodDetailModal;

FoodDetailModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  setShowLogin: PropTypes.func,
};
