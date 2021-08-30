import styled from "styled-components";
import {Carousel} from "antd";

export const CarouselItem = styled.div`
    position: relative;
    min-height: 500px;
    background: #D4D5DA!important;
    &>div{
        &>img{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            max-width: 100%;
            height: auto;
            width:100%;
            max-height: 500px;
            vertical-align: middle;
            border-style: none;
        }
        &>div.info{    
            position: absolute;
            color: #fff;
            top: auto;
            bottom: 0;
            left: 0;
            width: 100%;
            box-sizing: border-box;
            background-color: rgba(0,0,0,.8);
            padding: 10px;
            
            & div.imgbox-food-name{
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 3px;
            }
            
            & div.imgbox-desc{
                font-weight: 300;
            }
            & div.imgbox-total{
                font-size: 11px;
                color: #ccc;
                &>span.txt-bold{    
                    font-weight: 700!important;
                }
            }
            & div.imgbox-current-price{
                text-align: right;    
                font-size: 16px;
                font-weight: bold;
            }
        }
    }
    &>span.rate{
        display: flex;
        align-items: center;
        position: relative;
        top: 10px;
        left: 10px;
        color: #999;
        font-size: 200%;
        &>svg{
            color: #f09724;
        }
   }
`
export const NextArrowButtonWrap = styled.div`
    position: absolute;
    right: 0;
    top: 46%;
    left: auto;
    transform: translateY(-50%);
    
    width: 50px;
    height: 60px;
    
    overflow: hidden;
    display: ${({hide}) => hide ? 'none' : 'flex'};
    align-items: center;
    
    z-index: 100;
`
export const NextArrowButton = styled.button`
    transform: translateX(50%);
    cursor: pointer;
    flex-basis: 100%;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    outline: none;
    border: 1px solid #444;
    border-right: 0;
    border-top: 0;
    border-bottom: 0;
    background: rgba (204, 204, 204, .8);
    box-shadow: 0 0 10px 1px #898989;
    &>svg{
        margin-left: 8px;
    }
`
export const PrevArrowButtonWrap = styled.div`
    position: absolute;
    right: auto;
    top: 46%;
    left: 0;
    transform: translateY(-50%);
    
    width: 50px;
    height: 60px;
    
    overflow: hidden;
    display: ${({hide}) => hide ? 'none' : 'flex'};
    align-items: center;
    
    z-index: 100;
`
export const PrevArrowButton = styled.button`
    cursor: pointer;
    flex-basis: 100%;
    height: 50px;
    border-radius: 50%;

    transform: translateX(-50%);
    
    display: flex;
    align-items: center;

    outline: none;
    
    border: 1px solid #444;
    border-left: 0;
    border-top: 0;
    border-bottom: 0;
    background: rgba(204, 204, 204, .8);
    box-shadow: 0 0 10px 1px #898989;
    &>svg{
        margin-left: 26px;
        margin-right: 8px;
    }
`
