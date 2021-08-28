import styled from "styled-components";
import {Button, Card} from "antd";

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
