import { Col, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import {
  BiStore,
  FiPercent,
  GiCheckMark,
  GiSpellBook,
  IoFastFoodOutline,
} from 'react-icons/all';
import camelCaseKeys from 'camelcase-keys';

import { SERVER_CLIENT_API_URL } from '../../../../../contants';
import * as S from './style';

const SectionListed = () => {
  const [{ totalFoods, totalPromotions, totalStores, totalUsers }, setTotalList] = useState({
    totalUsers: '--',
    totalStores: '--',
    totalFoods: '--',
    totalPromotions: '--',
  });

  const section = useRef(0);
  const getDataTotal = async () => {
    await fetch(`${SERVER_CLIENT_API_URL}/listed`)
      .then((response) => response.text())
      .then((result) => {
        const totalData = camelCaseKeys(JSON.parse(result));
        setTotalList({
          ...totalData,
        });
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    getDataTotal();
  }, []);

  return (
    <S.Introduce ref={section}>
      <div>
        <Row justify='space-around'>
          <Col span={10}>
            <h2>
              <span>FreshFood</span> - Thực phẩm online
            </h2>
            <p>
              Trong diễn biến dịch bệnh SARS-CoV-2 đang ngày càng phức tạp,
              FreshFood đang phấn đấu từng ngày để chung sức đánh tan dịch bệnh, hỗ
              trợ và phục vụ khách hàng cùng vượt qua thời điểm khó khăn.
            </p>
          </Col>
          <Col span={10}>
            <ul>
              <li>
                <GiCheckMark /> Giao hàng tận nơi
              </li>
              <li>
                <GiCheckMark /> Cam kết chất lượng - uy tín
              </li>
              <li>
                <GiCheckMark /> Bình ổn giá
              </li>
              <li>
                <GiCheckMark /> Vui lòng khách đặt - vừa lòng khách mua
              </li>
            </ul>
          </Col>
        </Row>
        <div className='list'>
          <Row justify='center'>
            <Col span={6}>
              <S.IntroduceLink to={'/stores'} color={'#ff85c0'}>
                <figure>
                  <BiStore />
                  <figcaption>
                    <p>{totalStores}</p>
                    <p>Cửa hàng</p>
                  </figcaption>
                </figure>
                <span />
              </S.IntroduceLink>
            </Col>
            <Col span={6}>
              <S.IntroduceLink to={'/foods'} color={'#ffd666'}>
                <figure>
                  <IoFastFoodOutline />
                  <figcaption>
                    <p>{totalFoods}</p>
                    <p>Món ăn</p>
                  </figcaption>
                </figure>
                <span />
              </S.IntroduceLink>
            </Col>
            <Col span={6}>
              <S.IntroduceLink to={'/promotions'} color={'#85a5ff'}>
                <figure>
                  <FiPercent />
                  <figcaption>
                    <p>{totalPromotions}</p>
                    <p>Khuyến mãi</p>
                  </figcaption>
                </figure>
                <span />
              </S.IntroduceLink>
            </Col>
            <Col span={6}>
              <S.IntroduceLink to={'/crowded'} color={'#5cdbd3'}>
                <figure>
                  <GiSpellBook />
                  <figcaption>
                    <p>{totalUsers}</p>
                    <p>Người tiêu dùng</p>
                  </figcaption>
                </figure>
                <span />
              </S.IntroduceLink>
            </Col>
          </Row>
        </div>
      </div>
    </S.Introduce>
  );
};
export default SectionListed;
