import { Carousel, Col, Row } from 'antd';
import NumberFormat from 'react-number-format';
import { FcNext, FcPrevious } from 'react-icons/all';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ROOT_PATH } from '../../../contants';
import * as Style from './style';

const NextArrow = ({ onClick, index, lastIndex }) => {
  return (
    <Style.NextArrowButtonWrap hide={index === lastIndex}>
      <Style.NextArrowButton onClick={onClick}>
        <FcNext />
      </Style.NextArrowButton>
    </Style.NextArrowButtonWrap>
  );
};

const PrevArrow = ({ onClick, index }) => {
  return (
    <Style.PrevArrowButtonWrap hide={index === 0}>
      <Style.PrevArrowButton onClick={onClick}>
        <FcPrevious />
      </Style.PrevArrowButton>
    </Style.PrevArrowButtonWrap>
  );
};

const FoodDetailCarousel = function ({ foodList, index, setIndex }) {
  const slider = useRef(null);

  useEffect(() => {
    setIndex(index);
    slider.current.goTo(index);
  }, [index]);

  const renderFoodCarouselItem = () => {
    return foodList.map((foodItem) => {
      return (
        <Style.CarouselItem key={foodItem.id}>
          <div>
            <img src={`${ROOT_PATH}${foodItem.foodAvatar}`} />
            <div className="info">
              <Row>
                <Col span={20}>
                  <div className="imgbox-food-name">{foodItem.foodName}</div>
                  <div className="imgbox-desc">{foodItem.foodDescription}</div>
                  <div className="imgbox-total">
                    Đã được đặt
                    <span className="txt-bold">
                      &nbsp;{foodItem.totalOrder}&nbsp;
                    </span>
                    lần
                  </div>
                </Col>
                <Col span={4} style={{ alignSelf: 'center' }}>
                  <div className="imgbox-current-price">
                    <NumberFormat
                      value={foodItem.discount?.value || foodItem.price}
                      displayType={'text'}
                      thousandSeparator
                      suffix={'đ'}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Style.CarouselItem>
      );
    });
  };
  return (
    <Carousel
      arrows
      nextArrow={<NextArrow index={index} lastIndex={foodList.length - 1} />}
      prevArrow={<PrevArrow index={index} />}
      dots={false}
      ref={slider}
      afterChange={(current) => {
        setIndex(current);
      }}
    >
      {renderFoodCarouselItem()}
    </Carousel>
  );
};
export default FoodDetailCarousel;

NextArrow.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number,
  lastIndex: PropTypes.number,
};
PrevArrow.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number,
};
FoodDetailCarousel.propTypes = {
  foodList: PropTypes.arrayOf,
  index: PropTypes.number,
  setIndex: PropTypes.func,
};
