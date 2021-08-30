import {Link} from "react-router-dom";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {Card, Skeleton, Space} from "antd";
import NumberFormat from "react-number-format";

import * as S from './style';

import storeLoading from "../../../assets/images/loadStore.png";
import {FoodStore} from "./style";
import {useDispatch} from "react-redux";
import {getFoodDetailAction} from "../../../redux/actions";

const MetaTitle = ({name, store}) => {
    return (
        <>
            <S.FoodTitle>{name}</S.FoodTitle>
            <S.FoodStoreWrap to='/store/1'>
                <S.StoreName>{store}</S.StoreName>
            </S.FoodStoreWrap>
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
export const FoodItemHome = ({id, avatar, name, store, price, priceAfter, loading, setShowDetail}) => {
    const {Meta} = Card;
    const dispatch = useDispatch();
    return (
        <S.CardItem
            hoverable
            cover={
                <S.CardImage avatar={loading ? storeLoading : avatar}/>
            }
            onClick={() => {
                if (!loading) {
                    dispatch(getFoodDetailAction({
                        data: {
                            id,
                        }
                    }))
                    setShowDetail(true);
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
