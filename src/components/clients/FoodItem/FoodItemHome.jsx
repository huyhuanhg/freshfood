import {ShoppingCartOutlined} from "@ant-design/icons";
import {Card, Skeleton, Space} from "antd";
import NumberFormat from "react-number-format";

import * as S from './style';

import storeLoading from "../../../assets/images/loadStore.png";
import {useDispatch, useSelector} from "react-redux";
import {ROOT_PATH} from '../../../contants'
import {getFoodDetailAction} from "../../../redux/actions";

const MetaTitle = ({name, store, slug}) => {
    return (
        <>
            <S.FoodTitle>{name}</S.FoodTitle>
            <S.FoodStoreWrap
                to={`/stores/${slug}`}
                onClick={(e) => e.stopPropagation()}
            >
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
export const FoodItemHome = (
    {
        id,
        food_avatar,
        food_name,
        store_id,
        store_name,
        store_not_mark,
        price,
        discount,
        loading,
        setShowDetail,
        setShowLogin
    }
) => {
    const {Meta} = Card;
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.userReducer);
    return (
        <S.CardItem
            hoverable
            cover={
                <S.CardImage avatar={loading ? storeLoading : `${ROOT_PATH}${food_avatar}`}/>
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
                    title={
                        <MetaTitle
                            name={food_name} store={store_name}
                            slug={`${store_not_mark}.${store_id}`}
                        />
                    }

                    description={
                        <MetaDescription
                            price={discount?.value && price}
                            priceAfter={discount?.value ? discount?.value : price}
                        />
                    }
                    avatar={
                        <S.AddCard onClick={(e) => {
                            e.stopPropagation();
                            if (!userInfo.data.id) {
                                setShowLogin(true);
                            }
                        }}>
                            <ShoppingCartOutlined/>
                        </S.AddCard>}
                />
            </Skeleton>
        </S.CardItem>
    );
}
