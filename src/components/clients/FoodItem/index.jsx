import {Link} from "react-router-dom";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {Card, Skeleton, Space} from "antd";
import NumberFormat from "react-number-format";

import * as S from './style';

import storeLoading from "../../../assets/images/loadStore.png";

const MetaTitle = ({name, store}) => {
    return (
        <>
            <h3 style={{marginBottom: 0}}>{name}</h3>
            <Link to='/store/1'>
                <S.StoreName>{store}</S.StoreName>
            </Link>
        </>
    );
}
const MetaDescription = ({price, priceAfter}) => {
    return (
        <Space>
            <p>
                <S.AfterPrice>
                    <NumberFormat value={priceAfter} displayType={'text'}
                                  thousandSeparator suffix={'đ'}/>
                </S.AfterPrice>
                <sup>đ</sup>
            </p>
            <p style={{paddingLeft: 10}}>
                <S.Price>
                    <NumberFormat value={price} displayType={'text'}
                                  thousandSeparator suffix={'đ'}/>
                </S.Price>
            </p>
        </Space>
    );
}
const FoodItem = ({id, avatar, name, store, price, priceAfter, loading}) => {
    const {Meta} = Card;
    return (
        <S.CardItem
            hoverable
            cover={
                <S.CardImage avatar={loading ? storeLoading : avatar}/>
            }
            onClick={()=>{
                if (!loading){
                    // TODO
                }
            }}
        >
            <Skeleton loading={loading} active>
                <Meta
                    title={<MetaTitle name={name} store={store}/>}
                    description={<MetaDescription price={price} priceAfter={priceAfter}/>}
                    avatar={
                        <S.AddCard>
                            <ShoppingCartOutlined/>
                        </S.AddCard>}
                />
            </Skeleton>
        </S.CardItem>
    );
}
export default FoodItem;
