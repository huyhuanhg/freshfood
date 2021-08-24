import styled, {css} from 'styled-components';
import {Button, Form, Input} from "antd";

export const BackGround = styled.img`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100%;
    z-index: -1;
`
export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7rem;
    padding: 0 2rem;
`
export const LogoWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`
export const LogoImg = styled.img`
    width: 600px;
    height: 700px;
    transform: translateX(-150px);
`
export const FormWrap = styled.div`    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-align: center;
`
export const FormTitle = styled.h2`
    margin: 15px 0;
    color: #6c6c6c;
    text-transform: uppercase;
    font-size: 2.9rem;
    font-weight: bold;
`
export const FormGroup = styled.div`
    position: relative;
    margin: 25px 0;
    padding: 5px 0;
    border-bottom: 2px solid #d9d9d9;
    margin-bottom: 4px;
    display: grid;
    grid-template-columns: 7% 93%;
`
export const TitleFormControl = styled.label`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 20px;
    font-weight: bold;
    transition: 0.3s;
    z-index: 99;
`
export const FormControl = styled.input`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    padding: 0.5rem 0.7rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: #555;
    font-family: "Poppins", sans-serif;
`
export const BtnSubmit = styled.button`
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    outline: none;
    border: none;
    background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
    background-size: 200%;
    font-size: 1.2rem;
    color: #fff;
    font-family: "Poppins", sans-serif;
    text-transform: uppercase;
    margin: 1rem 0;
    cursor: pointer;
    transition: 0.5s;
    font-weight: bold;
    &:hover{
        background-position: right!important;
    }
`
export const IconWrap = styled.div`    
    color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 45px;
`
export const InvalidMsg = styled.h6`
    margin: 0px;
    font-size: 12px;
    color: red;
    font-weight: bold;
`