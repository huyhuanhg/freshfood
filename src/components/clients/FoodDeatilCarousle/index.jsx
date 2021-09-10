import { Carousel, Col, Row } from 'antd';
import NumberFormat from 'react-number-format';
import { FcNext, FcPrevious } from 'react-icons/all';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ROOT_PATH } from '../../../contants';
import * as Style from './style';

const NextArrow = ({ onClick, index, lastIndex, setFoodId, foodId }) => {
  return (
    <Style.NextArrowButtonWrap hide={index === lastIndex}>
      <Style.NextArrowButton onClick={() => {
        onClick();
        setFoodId(foodId);
      }}>
        <FcNext />
      </Style.NextArrowButton>
    </Style.NextArrowButtonWrap>
  );
};

const PrevArrow = ({ onClick, index, setFoodId, foodId }) => {
  return (
    <Style.PrevArrowButtonWrap hide={index === 0}>
      <Style.PrevArrowButton onClick={() => {
        onClick();
        setFoodId(foodId);
      }}>
        <FcPrevious />
      </Style.PrevArrowButton>
    </Style.PrevArrowButtonWrap>
  );
};

const FoodDetailCarousel = function({ foodList, index, setIndex, setFoodId }) {
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
            <img src={`${ROOT_PATH}${foodItem.foodAvatar}`} alt={foodItem.foodName} />
            <div className='info'>
              <Row>
                <Col span={20}>
                  <div className='imgbox-food-name'>{foodItem.foodName}</div>
                  <div className='imgbox-desc'>{foodItem.foodDescription}</div>
                  <div className='imgbox-total'>
                    Đã được đặt
                    <span className='txt-bold'>
                      &nbsp;{foodItem.foodConsume}&nbsp;
                    </span>
                    lần
                  </div>
                </Col>
                <Col span={4} style={{ alignSelf: 'center' }}>
                  <div className='imgbox-current-price'>
                    <NumberFormat
                      value={foodItem.discount}
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
      nextArrow={
        <NextArrow
          index={index}
          lastIndex={foodList.length - 1}
          setFoodId={setFoodId}
          foodId={foodList[index]['id']}
        />
      }
      prevArrow={
        <PrevArrow
          index={index}
          setFoodId={setFoodId}
          foodId={foodList[index]['id']}
        />
      }
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
  foodId: PropTypes.number,
  onClick: PropTypes.func,
  index: PropTypes.number,
  lastIndex: PropTypes.number,
  setFoodId: PropTypes.func,
};
PrevArrow.propTypes = {
  foodId: PropTypes.number,
  onClick: PropTypes.func,
  index: PropTypes.number,
  setFoodId: PropTypes.func,
};
FoodDetailCarousel.propTypes = {
  foodList: PropTypes.arrayOf,
  index: PropTypes.number,
  setIndex: PropTypes.func,
  setFoodId: PropTypes.func,
};
