import * as S from "./style";
import {Col, Row} from "antd";
import {BiStore, FiPercent, GiCheckMark, GiSpellBook, IoFastFoodOutline} from "react-icons/all";
import {useEffect, useRef, useState} from "react";
import {SERVER_CLIENT_API_URL} from '../../../../../contants'

const SectionListed = (props) => {
    const [totalList, setTotalList] = useState({
        totalUsers: '--',
        totalStores: '--',
        totalFoods: '--',
        totalPromotions: '--',
    });

    const section = useRef(0);
    const getDataTotal = async () => {
        await fetch(`${SERVER_CLIENT_API_URL}/listed`)
            .then(response => response.text())
            .then(result => {
                let totalData = JSON.parse(result);
                setTotalList({
                    ...totalList,
                    totalUsers: totalData.total_users,
                    totalStores: totalData.total_stores,
                    totalFoods: totalData.total_foods,
                    totalPromotions: totalData.total_promotions,
                })
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getDataTotal();
    }, []);

    return (
        <S.Introduce ref={section}>
            <div>
                <Row justify="space-around">
                    <Col span={10}>
                        <h2><span>FoodBooking</span>- Thực phẩm online</h2>
                        <p>
                            Trong diễn biến dịch bệnh SARS-CoV-2 đang ngày càng phức tạp,
                            FoodBooking đang phấn đấu từng ngày để chung sức đánh tan dịch bệnh,
                            hỗ trợ và phục vụ khách hàng cùng vượt qua thời điểm khó khăn.
                        </p>
                    </Col>
                    <Col span={10}>
                        <ul>
                            <li><GiCheckMark/> Giao hàng tận nơi</li>
                            <li><GiCheckMark/> Cam kết chất lượng - uy tín</li>
                            <li><GiCheckMark/> Bình ổn giá</li>
                            <li><GiCheckMark/> Vui lòng khách đặt - vừa lòng khách mua</li>
                        </ul>
                    </Col>
                </Row>
                <div className="list">
                    <Row justify="center">
                        <Col span={6}>
                            <S.IntroduceLink to={'/'} color={'#d44ca1'}>
                                <figure>
                                    <BiStore/>
                                    <figcaption>
                                        <p>{totalList.totalStores}</p>
                                        <p>Cửa hàng</p>
                                    </figcaption>
                                </figure>
                                <span></span>
                            </S.IntroduceLink>
                        </Col>
                        <Col span={6}>
                            <S.IntroduceLink to={'/'} color={'#e4b42e'}>
                                <figure>
                                    <IoFastFoodOutline/>
                                    <figcaption>
                                        <p>{totalList.totalFoods}</p>
                                        <p>Món ăn</p>
                                    </figcaption>
                                </figure>
                                <span></span>
                            </S.IntroduceLink>
                        </Col>
                        <Col span={6}>
                            <S.IntroduceLink to={'/'} color={'#1a265c'}>
                                <figure>
                                    <FiPercent/>
                                    <figcaption>
                                        <p>{totalList.totalPromotions}</p>
                                        <p>Khuyến mãi</p>
                                    </figcaption>
                                </figure>
                                <span></span>
                            </S.IntroduceLink>
                        </Col>
                        <Col span={6}>
                            <S.IntroduceLink to={'/'} color={'#08bcca'}>
                                <figure>
                                    <GiSpellBook/>
                                    <figcaption>
                                        <p>{totalList.totalUsers}</p>
                                        <p>Người tiêu dùng</p>
                                    </figcaption>
                                </figure>
                                <span></span>
                            </S.IntroduceLink>
                        </Col>
                    </Row>
                </div>
            </div>
        </S.Introduce>
    );
}
export default SectionListed;

