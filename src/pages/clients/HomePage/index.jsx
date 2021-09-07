import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Anchor, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as HomeS from './styles';
import { TITLE } from '../../../contants';

import history from '../../../utils/history';

import bg1 from '../../../assets/images/bg1.jpg';
import bg2 from '../../../assets/images/bg2.jpg';
import bg3 from '../../../assets/images/bg3.jpg';

import './styles/style.css';

import { FoodItemHome } from '../../../components/clients/FoodItem';
import FoodDetailModal from '../../../components/clients/FoodDetailModal';
import SectionListed from './components/SectionListed';
import SectionFoodList from './components/SectionFoodList';

import { getFoodPromotionAction, getStoresAction } from '../../../redux/actions';
import SectionPromotion from './components/SectionPromotion';
import SectionStore from './components/SectionStore';

function HomePage({ setShowLogin }) {
  document.title = TITLE.HOME;

  const dispatch = useDispatch();

  const { Link: AnchorLink } = Anchor;

  const [showFoodDetail, setShowFoodDetail] = useState(false);

  useEffect(() => {
    dispatch(getFoodPromotionAction());
    dispatch(getStoresAction());
  }, []);

  const renderFood = (foodList, span = 4) => {
    return (
      <Row gutter={[16, 16]}>
        {foodList.map((food) => {
          return (
            <Col span={span} key={food.id}>
              <FoodItemHome
                {...food}
                setShowDetail={setShowFoodDetail}
                setShowLogin={setShowLogin}
              />
            </Col>
          );
        })}
      </Row>
    );
  };
  return (
    <>
      <FoodDetailModal
        show={showFoodDetail}
        setShow={setShowFoodDetail}
        setShowLogin={setShowLogin}
      />
      <HomeS.Heading>
        <HomeS.HeadingCarousel autoplay dots={false} effect='fade'>
          <HomeS.CarouselItem src={bg1} />
          <HomeS.CarouselItem src={bg2} />
          <HomeS.CarouselItem src={bg3} />
        </HomeS.HeadingCarousel>
        <HomeS.Slogan>
          <HomeS.SloganTitle>FoodBooking</HomeS.SloganTitle>
          <HomeS.SloganDescription>
            Cửa hàng thực phẩm online,
            <br />
            Không ngại SARS-CoV-2
          </HomeS.SloganDescription>
          <HomeS.SloganBtn onClick={() => history.push('/stores')}>
            Mua sắm ngay
          </HomeS.SloganBtn>
        </HomeS.Slogan>
      </HomeS.Heading>

      <SectionPromotion render={renderFood} anchor={AnchorLink} />

      <SectionListed />

      <SectionStore />

      <HomeS.Invite>
        <div>
          <Row justify='center'>
            <Col span={12}>
              <h2>
                <b>Bạn</b> là người <b>kinh doanh</b>?
              </h2>
              <p>
                <b>Chỉ thị 16</b> kéo dài, cửa hàng <b>vắng khách</b>?
              </p>
              <p className='invite'>
                Đừng ngần ngại <b>FoodBooking</b> sẽ cùng bạn vượt qua khó khăn
              </p>
              <Link to='/'>
                <HomeS.BtnInvite>Đăng ký bán hàng</HomeS.BtnInvite>
              </Link>
            </Col>
          </Row>
        </div>
      </HomeS.Invite>

      <HomeS.Section id='test' style={{ backgroundColor: '#eee' }}>
        <HomeS.SectionContainer style={{ marginTop: 0 }}>
          <SectionFoodList render={renderFood} />
        </HomeS.SectionContainer>
      </HomeS.Section>
    </>
  );
}

export default HomePage;

HomePage.propTypes = {
  setShowLogin: PropTypes.func,
};
