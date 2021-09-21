import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';

import { ROOT_PATH } from '../../../contants';

import { updateCartAction } from '../../../redux/actions';

import * as S from './style';

const FoodDetailModal = function({ show, setShow, setShowLogin }) {
  const dispatch = useDispatch();
  const {
    foodDetail: {
      data: {
        discount,
        foodConsume,
        foodDescription,
        foodImage,
        foodName,
        id: foodId,
      },
    },
  } = useSelector(({ foodReducer }) => foodReducer);
  const { userInfo: { data: userData } } = useSelector(({ userReducer }) => userReducer);

  return (
    <S.ModalCustom
      closable={false}
      footer={
        <button
          onClick={() => {
            if (!userData.id) {
              setShow(false);
              setShowLogin(true);
            } else {
              const userToken = localStorage.userInfo;
              dispatch(updateCartAction({
                data: {
                  accessToken: JSON.parse(userToken).accessToken,
                  food: foodId,
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
          <img src={`${ROOT_PATH}${foodImage}`} alt={foodName} />
          <div className='info'>
            <Row>
              <Col span={20}>
                <div className='imgbox-food-name'>{foodName}</div>
                <div className='imgbox-desc'>{foodDescription}</div>
                <div className='imgbox-total'>
                  Đã được đặt
                  <span className='txt-bold'>
                    &nbsp;{foodConsume}&nbsp;
                  </span>
                  lần
                </div>
              </Col>
              <Col span={4} style={{ alignSelf: 'center' }}>
                <div className='imgbox-current-price'>
                  <NumberFormat
                    value={discount}
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
