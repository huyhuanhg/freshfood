import styled, {css} from 'styled-components';
import {Anchor, Button, Card, Carousel} from "antd";
import {Link} from "react-router-dom";

import bgIntroduce from '../../../../assets/images/bg4.jpg';
import bgInvite from '../../../../assets/images/bg5.jpg';

const {Meta} = Card;

export const TilteDiv = styled.div`
    position: relative;
    width: 10%;
    margin: 0 45%;
`
export const TitleFirstSpan = styled.span`
    display: block;
    content: '';
    width: 30%;
    border-top: 1px dashed #ccc;
    position: absolute;
    right: 54%;
    &:after{
    right: -8%;
    display: block;
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ccc;
    position: absolute;
    top: -5px;
    }
`
export const TitleLastSpan = styled.span`
    display: block;
    content: '';
    width: 30%;
    border-top: 1px dashed #ccc;
    position: absolute;
    left: 54%;
    &:after{
        left: -8%;
        display: block;
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #ccc;
        position: absolute;
        top: -5px;
    }
`
export const TitleWrap = styled.div`
    text-align: center;
`
export const Title = styled.h2`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 5px;
`
// heading
export const Heading = styled.section`
    min-height: 500px;
    position: relative;
`
export const HeadingCarousel = styled(Carousel)`
    height: 600px;
    overflow: hidden;
`
export const CarouselItem = styled.img`
    max-width: 100%;
    height: auto;
`
export const Slogan = styled.div`
    text-align: left;
    max-width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-570px, -150px);
`

export const SloganTitle = styled.h1`
    font-weight: 700;
    font-size: 7rem;
    color: #0f9d58;
    text-align: left;
    margin-bottom: 0;
`
export const SloganDescription = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    color: gray;
`

export const SloganBtn = styled.button`
    padding: 1rem 5rem;
    border: none;
    outline: 0;
    background-color: unset;
    border: .125rem solid #0f9d58;
    border-radius: 2.5rem;
    color: #0f9d58;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 600;
    transition: .3s ease-in-out;
    &:hover{
        border-color: #6464ff;
        color: #6464ff;
    }
`
export const Section = styled.section`
    padding: 50px 0;
`
export const SectionContainer = styled.div`
    width: 100%;
    max-width: 1430px;
    margin: 2rem auto 1rem;
`
export const Introduce = styled.section`
    padding: 0;
    background-size: 1900px;
    background-position: center;
    background-repeat: no-repeat;
    background-image: linear-gradient(rgba(26, 38, 92, .6), rgba(26, 38, 92, .6)), url(${bgIntroduce});
    margin-bottom: 80px;
    &>div{
        position: relative;
        max-width: 1430px;
        margin: 0 auto;
        padding: 50px 0 80px;
        color: white;
        font-size: 16px;
        & h2{
            color: white;
            font-size: 200%;
            &>span{
                color: #29d197;
            }
        }
        & ul{
            list-style: none;
            &>li{
                padding: .5rem 0;
                
                &>svg{
                    color: #29d197;
                    margin-right: 5px;
                }
            }
        }
        &>div.list{
            position: absolute;
            left: 50%;
            min-width: 800px;
            bottom: 0;
            transform: translate(-50%, 50%);
        }
    }
`
export const IntroduceLink = styled(Link)`
    &>figure{
        position: relative;
        width: 100%;
        min-width: 200px;
        height: 100%;
        text-align: center;
        padding: 30px 10px 0px 10px;
        background-color: #fcfcfc;
        border-right: 1px solid #f1f1f1;
        border-left: 1px solid #f1f1f1;
        border-bottom: 5px solid ${({color}) => color};
        margin: 0;
        z-index: 4;
        &>figcaption{
            color: black;
            &>p:first-child{
                font-size: 200%;
                font-weight: bold;
                margin: 0;
                color: #29d197;
            }
        }
        &>svg{
            font-size: 250%;
            color: ${({color}) => color};
        }
        &+span{
            display: block;
            content: '';
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: ${({color}) => color};
            position: absolute;
            top: 90%;
            left: 43%;
            z-index: 3;
        }
    }
    &:hover{
        &>figure{
            transition: .4s;
            background-color: ${({color}) => color};
            transform: translateY(20px);
            border-right: 1px solid ${({color}) => color};
            border-left: 1px solid ${({color}) => color};
            &>svg{
                color: white;
            }
            &>figcaption{
                color: white;
            }
            &+span{
                transition: .4s;
                top: calc(90% + 20px);
            }
        }
    }
`
export const Invite = styled.section`
    padding: 0;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: linear-gradient(rgba(26, 38, 92, .6), rgba(26, 38, 92, .6)), url(${bgInvite});
    // background-attachment: fixed;
    &>div{
        max-width: 1430px;
        margin: 0 auto;
        padding: 50px 0 80px;
        text-align: center;
        color: white;
        & h2{
            color: white;
            font-size: 350%;
            text-transform: uppercase;
            &>b{
                color: #29d197;
            }
        }
        & p{
            font-size: 200%;
            margin-bottom: 0;
            &>b{
                color: #29d197;
            }
        }
        & p.invite{
            font-size: 150%;
            color: #ccc;
            margin-bottom: 1rem;
            &>b{
                text-transform: uppercase;
            }
        }
    }
`
export const BtnInvite = styled.button`
    padding: 1rem 5rem;
    border: none;
    outline: 0;
    background-color: unset;
    border: .125rem solid #29d197;
    border-radius: 2.5rem;
    color: #29d197;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 600;
    transition: .3s ease-in-out;
    &:hover{
        background-color: #29d197;
        color: white;
    }
`