import {Link} from "react-router-dom";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {Card, Skeleton, Space} from "antd";
import NumberFormat from "react-number-format";

import * as S from './style';

import storeLoading from "../../../assets/images/loadStore.png";
import {AiFillStar, AiOutlineStar, BsImage, HiShoppingCart} from "react-icons/all";
import {SkeletonCustom} from "./style";

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
export const FoodStore = ({
                              avatar,
                              name,
                              description,
                              price,
                              priceAfter,
                              loading,
                              rate,
                              handleClick,
                              setIndex,
                              index
                          }) => {
    return (
        <S.FoodStore onClick={() => {
            handleClick(true);
            setIndex(index);
        }}>
            <S.FoodStoreAvatar>
                {loading ? <BsImage/> : <img src={avatar}/>}
            </S.FoodStoreAvatar>
            <S.FoodStoreItemRight>
                <S.SkeletonCustom loading={loading} active>
                    <S.FoodStoreTitle>{name}</S.FoodStoreTitle>
                    <S.FoodStoreDescription>{description}</S.FoodStoreDescription>
                    <p>
                        <S.FoodStoreRate>{rate}<AiFillStar/></S.FoodStoreRate>
                        <S.TotalOrder>Lượt đặt: 140</S.TotalOrder>
                    </p>
                    <S.FoodStorePrice>
                        <div className='price-discount'>
                            <NumberFormat value={price} displayType={'text'} thousandSeparator suffix={'đ'}/>
                        </div>
                        <span className='price'>
                        <NumberFormat value={priceAfter} displayType={'text'} thousandSeparator suffix={'đ'}/>
                    </span>
                        <span className="btn-adding" onClick={(e)=>{
                            e.stopPropagation();
                        }}><HiShoppingCart/></span>
                    </S.FoodStorePrice>
                </S.SkeletonCustom>
            </S.FoodStoreItemRight>
        </S.FoodStore>
    );
}
