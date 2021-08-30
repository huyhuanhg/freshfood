import {Carousel, Col, Row} from "antd";
import * as S from './style';
import NumberFormat from "react-number-format";
import {AiFillStar, FcNext, FcPrevious, GrNext, MdNavigateNext} from "react-icons/all";
import {useEffect, useRef, useState} from "react";

const NextArrow = ({onClick, index, lastIndex}) => {
    return (
        <S.NextArrowButtonWrap hide={index === lastIndex}>
            <S.NextArrowButton onClick={onClick}>
                <FcNext/>
            </S.NextArrowButton>
        </S.NextArrowButtonWrap>
    )
}

const PrevArrow = ({onClick, index}) => {
    return (
        <S.PrevArrowButtonWrap hide={index === 0}>
            <S.PrevArrowButton onClick={onClick}>
                <FcPrevious/>
            </S.PrevArrowButton>
        </S.PrevArrowButtonWrap>
    )
}


const FoodDetailCarousel = function ({foodList, index, setIndex}) {
    const slider = useRef(null);

    useEffect(() => {
        setIndex(index);
        slider.current.goTo(index);
    }, [index]);

    const renderFoodCarouselItem = () => {
        return foodList.map(foodItem => {
            return (
                <S.CarouselItem>
                    <div>
                        <img src={foodItem.avatar}/>
                        <div className="info">
                            <Row>
                                <Col span={20}>
                                    <div className="imgbox-food-name">{foodItem.name}</div>
                                    <div className="imgbox-desc">{foodItem.description}</div>
                                    <div className="imgbox-total">
                                        Đã được đặt<span
                                        className="txt-bold">&nbsp;{foodItem.total_order}&nbsp;</span>lần
                                    </div>
                                </Col>
                                <Col span={4} style={{alignSelf: 'center',}}>
                                    <div className="imgbox-current-price">
                                        <NumberFormat value={foodItem.priceAfter} displayType={'text'} thousandSeparator
                                                      suffix={'đ'}/>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <span className='rate'>{foodItem.rate}<AiFillStar/></span>
                </S.CarouselItem>
            )
        });
    }
    return (
        <Carousel
            arrows
            nextArrow={<NextArrow index={index} lastIndex={foodList.length - 1}/>}
            prevArrow={<PrevArrow index={index}/>}
            dots={false}
            ref={slider}
            afterChange={(current) => {
                setIndex(current);
            }}
        >
            {renderFoodCarouselItem()}
        </Carousel>
    )
        ;
}
export default FoodDetailCarousel;
