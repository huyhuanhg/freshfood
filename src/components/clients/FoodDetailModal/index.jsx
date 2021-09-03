import {Col, Modal, Row} from "antd";
import * as S from './style';
import NumberFormat from "react-number-format";
import {AiFillStar} from "react-icons/all";
import {useSelector} from "react-redux";
import {ROOT_PATH} from "../../../contants";


const FoodDetailModal = function ({show, setShow, setShowLogin}) {

    const {foodDetail} = useSelector(state => state.foodReducer);
    const {userInfo} = useSelector(state => state.userReducer);

    return (
        <S.ModalCustom
            closable={false}
            footer={
                <button onClick={() => {
                    if (!userInfo.data.id) {
                        setShow(false);
                        setShowLogin(true);
                    }
                }
                }>
                    <span>+&nbsp;</span>Thêm vào giỏ
                </button>
            }
            visible={show}
            onCancel={() => {
                setShow(false);
            }}>
            <S.FoodItem>
                <div>
                    <img src={`${ROOT_PATH}${foodDetail.data.food_avatar}`}/>
                    <div className="info">
                        <Row>
                            <Col span={20}>
                                <div className="imgbox-food-name">{foodDetail.data.food_name}</div>
                                <div className="imgbox-desc">{foodDetail.data.food_description}</div>
                                <div className="imgbox-total">
                                    Đã được đặt<span
                                    className="txt-bold">&nbsp;{foodDetail.data.total_order}&nbsp;</span>lần
                                </div>
                            </Col>
                            <Col span={4} style={{alignSelf: 'center',}}>
                                <div className="imgbox-current-price">
                                    <NumberFormat value={foodDetail.data.discount?.value || foodDetail.data.price}
                                                  displayType={'text'}
                                                  thousandSeparator
                                                  suffix={'đ'}/>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </S.FoodItem>
        </S.ModalCustom>
    );
}
export default FoodDetailModal;
