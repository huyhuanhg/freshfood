import styled from "styled-components";
import {Button} from "antd";

export const CartTitle = styled.div`      
    display: flex;
    justify-content: space-between;
    &>a{
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #288ad6;
        line-height: 16px;
        padding: 10px;
    }
    &>span{
        padding: 9px 10px;
        font-size: 18px;
        font-weight: 600;
        color: #464646;
    }
`
export const CartWrap = styled.div`
    min-height: calc(100vh - 499.078px);
`
export const CartEmpty = styled.div`
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    
    &>div{
        align-self: center;
        padding: 10px;
        font-size: 16px;
        &>svg{
            color: red;
            font-size: 400%;
        }
    }
    &>button{
        background: unset;
        outline: none;
        border: 1px solid #288ad6;
        color: #288ad6;
        cursor: pointer;
        font-weight: 600;
        width: 60%;
        margin: 0 20%;
        padding: .5rem;
        font-size: 16px;
        border-radius: 4px;
        margin-top: 1.5rem;
    }
`
export const CartContent = styled.div`
    background: #fff;
    box-shadow: 0 0 18px rgb(0 0 0 / 12%);
    border-radius: 2px;
`
export const CartList = styled.ul`
    display: flex;
    flex-flow: column wrap;
    list-style: none;
    &>li:first-child{
        border-top: none;
    }
    &>li{
        display: block;
        padding: 10px 30px;
        width: 100%;
        box-sizing: border-box;
        border-top: 1px solid #e1e1e1;
        
        &>div.img{
            float: left;
            width: 16%;
            &>a{
                display: block;
                overflow: hidden;
                
                &>img{
                    width: 75px;
                    margin: auto;
                    display: block;
                    overflow: hidden;
                }
            }
            &>button{
                display: block;
                overflow: hidden;
                margin: 15px auto 0;
                border: 0;
                background: #fff;
                color: #999;
                font-size: 12px;
                cursor: pointer;
                outline: none;
                &>span{
                    float: left;
                    background: #ccc;
                    border-radius: 50%;
                    width: 12px;
                    height: 12px;
                    position: relative;
                    margin: 2px 3px 0 0;
                    
                    &:before, &:after{
                        content: "";
                        width: 2px;
                        height: 8px;
                        background: #fff;
                        position: absolute;
                        transform: rotate(45deg);
                        top: 2px;
                        left: 5px;
                    }
                    
                    &:after{
                        transform: rotate(-45deg);
                    }
                }
            }
        }
    }
`
export const CartInfo = styled.div`
    display: flex;
    
    &>div.food-info {
        flex-basis: 80%;
        overflow: hidden;
        margin-top: .5rem;
        &>div.food-name{
            width: 100%;
            font-size: 18px;
            font-weight: 700;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            &>a{
                color: #333;
            }
        }
        
        &>div.store-name{
            width: 100%;
            font-size: 14px;
            font-weight: 400;
            &>a{
                color: #aaa;
            }
        }
        & a{
            display: block;
            padding: .25rem 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    &>div.price-info {
        flex-basis: 20%;
        text-align: right;
        margin-top: .5rem;
        &>span{
            color: #f30c28;
            font-size: 14px;
            text-align: right;
            margin-bottom: 2px;
            &>strike{
                display: block;
                min-height: 22px;
                font-weight: 300;
                overflow: hidden;
                color: #666;
            }
        }
        &>div.choose-quantity{
            overflow: hidden;
            position: relative;
            float: right;
            width: 100px;
            border: 1px solid #dfdfdf;
            background: #fff;
            margin-top: 1rem;
            border-radius: 3px;
            line-height: 30px;
            font-size: 14px;
            color: #333;
            &>div{
                background: #fff;
                text-align: center;    
                display: flex;
                align-items: center;
                justify-content: center;
            }
            &>div.minus{
                float: left;
                border-right: 1px solid #dfdfdf;
                width: 32%;
                height: 30px;
                position: relative;
                cursor: pointer;
                font-size: 20px;
                &>svg{
                    color: #ccc;
                }
            }
            &>div.quantity{
                font-size: 14px;
                color: #333;
                float: left;
                width: 33%;
                height: 30px;
                text-align: center;
            }
            &>div.plus{
                float: right;
                border-left: 1px solid #dfdfdf;
                width: 32%;
                height: 30px;
                position: relative;
                cursor: pointer;
                font-size: 20px;
                &>svg{
                    color: #ccc;
                }
            }
        }
    }
`
export const TotalProvisional = styled.div`
    display: block;
    overflow: hidden;
    padding: 10px 30px;
    &>span{
        font-size: 14px;
        line-height: 18px;
        color: #333;
    }
    &>span:first-child{
        float: left;
    }
    &>span:last-child{
        float: right;
    }
`
export const CartOrder = styled.div`
    background: #fff;
    box-shadow: 0 0 18px rgb(0 0 0 / 12%);
    border-radius: 2px;
    padding: 10px 30px;
    &>h4{
        font-size: 14px;
        text-transform: uppercase;
        color: #333;
        margin-bottom: 1rem;
    }
`
export const OrderTotal = styled.div`
    overflow: hidden;
    background: #f6f6f6;
    padding: 10px 10px;
    border: 1px solid #e1e1e1;
    
    &>span{
        font-size: 14px;
        line-height: 18px;
        color: #333;
    }
    &>span:first-child{
        float: left;
        &>b{
            color: blue;
        }
    }
    &>span:last-child{
        float: right;
        color: #f30c28;
        font-weight: bold;
    }
`
export const OrderButton = styled(Button)`
    width: 50%;
    background: #f30c28;
    color: #fff;
    border: 1px solid #f30c28;
    
    &:hover{
        background: #d0051d;
        color: #fff;
        border: 1px solid #d0051d;
    }
`
export const DeleteAllBtn = styled(Button)`
    width: 100%;
    border-left: 0;
    border-bottom: 0;
    border-right: 0;
    border-color: rgba(143, 12, 40, .2);
    color: #f30c28;
    font-size: 14px;
    border-radius: 0;
    background: rgba(143, 12, 40, .2);
    &:hover{
        background: rgba(143, 12, 40, .1);
        border-color: rgba(143, 12, 40, .1);
        color: #f30c28;
    }
`