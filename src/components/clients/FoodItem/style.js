import styled from "styled-components";
import {Button, Card, Skeleton} from "antd";
import {Link} from "react-router-dom";

export const CardImage = styled.div`
    height: 230px;
    background-image: url(${({avatar}) => avatar});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 4px 4px 0 0;
    transition: .3s ease;
`
export const AddCard = styled(Button)`
    position: absolute;
    right: 10px;
    top: 20%;
    &:hover{
        color: #0f9d58;
        border-color: #0f9d58;
        &>span{
            transition: .4s ease;
            transform: scale(1.2);
        }
    }
`
export const AfterPrice = styled.span`
    color: red;
    font-size: 1.5rem;
`
export const CardItem = styled(Card)`
    border-radius: 4px;
    max-height: 347px;
    overflow: hidden;
`
export const FoodTitle = styled.h3`
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 80%;
    overflow: hidden;
    margin-bottom: 0;
`
export const FoodStoreWrap = styled(Link)`
    display: block;
    max-width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #aaa;
`
export const Price = styled.span`
    color: #888;
    text-decoration: line-through;
    font-size: 1.2rem;
`
export const StoreName = styled.small`
    color: #aaa;
    transition: .4s;
    &:hover{
        color: #1890ff;
    }
`
export const FoodStore = styled.div`   
    position: relative;
    margin: 0 10px 10px 15px;
    height: 70px;
    box-sizing: border-box;
    overflow: hidden;
    border-bottom: #f5f5f5 1px solid;
    padding-bottom: 10px;
    height: 70px;
    box-sizing: border-box;
    cursor: pointer;
`
export const FoodStoreAvatar = styled.div`
    float: left;
    width: 60px;
    &>img, &>svg{   
        border-radius: 2px;
        border: 0;
        height: 60px;
        aspect-ratio: auto 60 / 60;
        width: 60px;
        display: block;
        position: relative;
    }
    &>svg{
        color: #bfbfbf;
    }
`
export const FoodStoreItemRight = styled.div`
    float: left;
    max-width: 80%;
    width:80%;
    margin-left: 16px;
    line-height: 2em;
`
export const FoodStoreTitle = styled.div`
    color: #464646;
    font-weight: 700;
    font-size: 16px;
    max-width: 75%;
    max-height: 40px;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
export const FoodStoreDescription = styled.div`
    width: 75%;
    line-height: 2em;
    font-size: 12px;
    margin: 0;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
export const FoodStoreRate = styled.span`
    color: #206b9b;
    &>svg{
        color: #fadb14;
        margin-right: 5px;
    }
`
export const TotalOrder = styled.span`
    font-size: 12px;
    color: #a1a1a1;
    margin: 0;
`
export const FoodStorePrice = styled.div`
    position: absolute;
    bottom: 20px;
    right: 0;
    z-index: 4;
    &>.price-discount{
        color: #8b8b8b;
        font-size: 14px;
        height: 20px;
        text-decoration: line-through;
    }
    &>.price{    
        color: #206b9b;
        font-size: 16px;
        font-weight: 700;
    }
    &>.btn-adding{
        padding-top: 3px;
        width: 1.75rem;
        height: 1.75rem;
        text-align: center;
        line-height: 1.75rem;
        font-size: 1rem;
        color: #fff;
        font-weight: 700;
        border-radius: 4px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        background-color: #EE4D2D;
        display: inline-block;
        margin-left: 10px;
        cursor: pointer !important;
        outline: 0;
    }
`
export const SkeletonCustom = styled(Skeleton)`
    & h3{
        margin-top: 0!important;
    }
    & ul{
        margin-top: 0!important;
        &>li:nth-child(2){
            margin-top: 10px!important;
        }
    }
`