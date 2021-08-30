import {Col, Modal, Row} from "antd";
import * as S from './style';
import NumberFormat from "react-number-format";
import {AiFillStar} from "react-icons/all";
import {useSelector} from "react-redux";
import {ModalCustom} from "./style";


const FoodDetailModal = function ({show, setShow}) {

    const {foodDetail} = useSelector(state => state.foodReducer);

    return (
        <S.ModalCustom
            closable={false}
            footer={
                <button>
                    <span>+&nbsp;</span>Thêm vào giỏ
                </button>
            }
            visible={show}
            onCancel={() => {
                setShow(false);
            }}>
            <S.FoodItem>
                <div>
                    <img src={foodDetail.data.avatar}/>
                    <div className="info">
                        <Row>
                            <Col span={20}>
                                <div className="imgbox-food-name">{foodDetail.data.name}</div>
                                <div className="imgbox-desc">{foodDetail.data.description}</div>
                                <div className="imgbox-total">
                                    Đã được đặt<span
                                    className="txt-bold">&nbsp;{foodDetail.data.total_order}&nbsp;</span>lần
                                </div>
                            </Col>
                            <Col span={4} style={{alignSelf: 'center',}}>
                                <div className="imgbox-current-price">
                                    <NumberFormat value={foodDetail.data.priceAfter} displayType={'text'}
                                                  thousandSeparator
                                                  suffix={'đ'}/>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <span className='rate'>{foodDetail.data.rate}<AiFillStar/></span>
            </S.FoodItem>
        </S.ModalCustom>
    );
}
export default FoodDetailModal;
