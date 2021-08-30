import styled, {css} from 'styled-components';
import {Link} from "react-router-dom";
import {SearchOutlined} from "@ant-design/icons";
import {Avatar, Button} from "antd";

export const TopBar = styled.div`
    background-color: #1a265c;
    padding: 7px;
    font-size: 14px;
    
    &>div {
        display: flex;
        justify-content: space-between;
        max-width: 1140px;
        margin: 0 auto;
        
        &>ul{
            list-style: none;
            color: white;
            display: flex;
            align-items: center;
            margin: 0;
            
            &>li{
                margin-right: 30px;
                &:hover>svg, &:hover>span{
                    transition: .4s;
                    transform: scale(1.2);
                }
                &>svg, &>span{
                    color: #29d197;
                    margin-right: 5px;
                }
            }
        }
        
        &>div{
           display: flex;
            align-items: center;
            
            &>p {
                color: #29d197;
                margin: 0 15px 0 0;
                font-weight: bold;
            }
            
            &>div{
                width: 37px;
                height: 37px;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.2);
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 5px;
                color: white;
                cursor: pointer;
                
                &:hover>svg{
                    transition: .4s;
                    color: #29d197;
                    transform: scale(1.2);
                }
            }
        }
    }
`
export const Header = styled.header`
    width: 100%;
    z-index: 99;
    background-color: #f0f3f7;
    box-shadow: 0 2px 8px 0 rgb(99 99 99 / 20%);
`
export const MenuWrap = styled.div`
    max-width: 1140px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem 0;
`
export const Logo = styled(Link)`    
    text-transform: uppercase;
    font-size: 2rem;
    font-weight: 900;
    color: #0f9d58;
    &:hover{
        color: #0f9d58;
    }
`
export const SearchWrap = styled.div`
    flex-basis: 35%;
`
export const FormGroup = styled.div`
    position: relative;
`
export const InputSearch = styled.input`
    font-size: 150%;
    padding: 1rem;
    width: 100%;
    outline: none;
    border: none;
    background: white;
    border-radius: 5px;
    box-shadow: 0 0 10px 1px rgb(0 0 0 / 10%);
`
export const IconSearch = styled(SearchOutlined)`
    position: absolute;
    font-size: 1.5rem;
    top: 50%;
    right: .75rem;
    color: #ccc;
    transform: translateY(-50%);
`
export const Btn = styled(Button)`
    &:hover{
        border-color: #0f9d58;  
        color: #0f9d58;  
    }
`
export const UserAvatar = styled(Avatar)`
    background-color: rgba(15, 157, 88, 0.1);
    border-color: rgba(15, 157, 88, 0.1);
    box-shadow: 0 0 5px 0 rgb(15 157 88 / 30%);
    color: rgb(15, 157, 88);
`
