import styled, {css} from 'styled-components';
import {Spin} from "antd";

export const FormTitle = styled.h2`
    margin: 15px 0;
    color: #6c6c6c;
    text-transform: uppercase;
    font-size: 2.9rem;
    font-weight: bold;
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
    margin: 2rem 0 1rem;
    cursor: pointer;
    transition: 0.5s;
    font-weight: bold;
    position: relative;
    &:hover{
        background-position: right!important;
    }
`
export const InvalidMsg = styled.h6`
    position: absolute;
    width: 100%;
    left: 50%;
    bottom: ${({centerGrid, leftGrid}) => centerGrid || leftGrid ? '0' : '-25px'};
    transform: translateX(-50%);
    margin: 0px;
    font-size: 14px;
    color: #ff3e3e;
    font-weight: bold;
    ${({leftGrid}) => leftGrid && css`
    text-align: left;
    `}
`
export const FormGroup = styled.div`
    position: relative;
    margin: 12px 0 24px;
    padding: 5px 0;
    ${({grid}) => grid && css`
    padding-left: 5px;
    `}
    border-bottom: 2px solid #d9d9d9;
    display: grid;
    grid-template-columns: 7% 93%;
    &:before{
        right: 50%;
        width: ${({focus, error}) => focus || error ? '50%' : '0'};
        background-color: ${({error}) => error ? '#ff7878' : '#38d39f'};
    }
    &:after{
        left: 50%;
        width: ${({focus, error}) => focus || error ? '50%' : '0'};
        background-color: ${({error}) => error ? '#ff7878' : '#38d39f'};
    }
    &:before, &:after{
        content: "";
        position: absolute;
        bottom: -2px;
        height: 2px;
        transition: 0.4s;
    }
`
export const IconWrap = styled.div`
    color: ${({focus, error}) => error ? '#ff7878' : (focus ? '#38d39f' : '#d9d9d9')};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 45px;
    transition: 0.3s;
    font-size: 20px;
`
export const TitleFormControl = styled.label`
    position: absolute;
    left: 10px;
    ${({focus}) => focus ? css`
    top: -5px;
    font-size: 17px;
    ` : css`
    top: 50%;
    font-size: 20px;
    `}
    transform: translateY(-50%);
    color: #999;
    font-weight: bold;
    transition: 0.3s;
    z-index: 99;
`
export const FormControlWrap = styled.div`
    height: 45px; 
    position: relative;
`
export const SubmitLoading = styled(Spin)`
    display: ${({show}) => show ? 'block' : 'none'};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
