import NumberFormat from "react-number-format";

import * as S from './style';

import { BsImage, HiShoppingCart} from "react-icons/all";
import {useSelector} from "react-redux";
import {ROOT_PATH} from "../../../contants";

export const FoodStore = ({
                              food_avatar,
                              food_name,
                              food_description,
                              total_order,
                              price,
                              discount,
                              loading,
                              handleClick,
                              setIndex,
                              index,
                              setShowLogin
                          }) => {
    const {userInfo} = useSelector(state => state.userReducer);
    return (
        <S.FoodStore onClick={() => {
            handleClick(true);
            setIndex(index);
        }}>
            <S.FoodStoreAvatar>
                {loading ? <BsImage/> : <img src={`${ROOT_PATH}${food_avatar}`}/>}
            </S.FoodStoreAvatar>
            <S.FoodStoreItemRight>
                <S.SkeletonCustom loading={loading} active>
                    <S.FoodStoreTitle>{food_name}</S.FoodStoreTitle>
                    <S.FoodStoreDescription>{food_description}</S.FoodStoreDescription>
                    <p>
                        <S.TotalOrder>Lượt đặt: {total_order}</S.TotalOrder>
                    </p>
                    <S.FoodStorePrice>
                        <div className='price-discount'>
                            <NumberFormat value={discount?.value ?? price} displayType={'text'} thousandSeparator
                                          suffix={'đ'}/>
                        </div>
                        <span className='price'>
                        <NumberFormat value={discount?.value ? discount?.value : price} displayType={'text'}
                                      thousandSeparator suffix={'đ'}/>
                    </span>
                        <span className="btn-adding" onClick={(e) => {
                            e.stopPropagation();
                            if (!userInfo.data.id) {
                                setShowLogin(true);
                            }
                        }}><HiShoppingCart/></span>
                    </S.FoodStorePrice>
                </S.SkeletonCustom>
            </S.FoodStoreItemRight>
        </S.FoodStore>
    );
}
