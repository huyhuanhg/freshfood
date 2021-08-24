import bgLogin from '../../assets/images/bg-login.png';
import foodLogo from '../../assets/images/food_logo.png'

import * as LoginStyle from './style';
import {TITLE} from "../../contants";
import {LockOutlined, MailOutlined} from "@ant-design/icons";


import './style-custom.css';

import {useState} from "react";
import {Link} from "react-router-dom";

function LoginPage() {
    document.title = TITLE.LOGIN;

    const [valid, setValid] = useState({
        valid: {
            email: false,
            password: false,
        },
        message: {
            email: '',
            password: ''
        }
    });

    const [field, setField] = useState({
        email: '',
        password: '',
    });

    const [fieldFocus, setFieldFocus] = useState({
        email: false,
        password: false,
    });

    const validateRule = (name, value, erors) => {
        let msg = '';
        if (name === 'email') {
            let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regex.test(value)) {
                msg = 'Định dạng email không đúng!';
            }
            if (value === '') {
                msg = 'Vui lòng nhập email!';
            }
        } else if (name === 'password') {
            if (value === '') {
                msg = 'Vui lòng nhập mật khẩu!';
            } else if (value.length < 6) {
                msg = "Mật khẩu tối thiểu 6 kí tự!";
            }
        }
        return {
            valid: {
                ...erors.valid,
                [name]: !msg,
            },
            message: {
                ...erors.message,
                [name]: msg,
            }
        }
    }
    const handleValid = () => {
        let invalid = {...valid};
        for (let rule in field) {
            invalid = validateRule(rule, field[rule], invalid);
        }
        setValid(invalid);
    }
    const handleFocus = (e) => {
        setFieldFocus({
            ...fieldFocus,
            [e.target.name]: true,
        });
        setValid({
            ...valid,
            message: {
                ...valid.message,
                [e.target.name]: ''
            }
        })
    }
    const handleBlur = (e) => {
        setFieldFocus({
            ...fieldFocus,
            [e.target.name]: !field[e.target.name] ? false : true,
        });
        let invalid = validateRule(e.target.name, e.target.value, {...valid});
        setValid(invalid);
    }

    const handleChangeField = (e) => {
        setField({
            ...field,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleValid();
        if (valid.valid.email && valid.valid.password) {
            console.log(1)
        } else {
            console.log(2)
        }
    }
    return (
        <>
            <LoginStyle.BackGround src={bgLogin}/>
            <LoginStyle.Container>
                <LoginStyle.LogoWrap>
                    <LoginStyle.LogoImg src={foodLogo}/>
                </LoginStyle.LogoWrap>
                <LoginStyle.FormWrap>
                    <form style={{width: 360}} onSubmit={handleSubmit}>
                        <LoginStyle.FormTitle>Đăng Nhập</LoginStyle.FormTitle>
                        <LoginStyle.FormGroup className={`form-group ${fieldFocus.email && 'focus'}`}>
                            <LoginStyle.IconWrap>
                                <MailOutlined className="i" style={{transition: '0.3s', fontSize: 20}}/>
                            </LoginStyle.IconWrap>
                            <div style={{height: 45, position: "relative"}}>
                                <LoginStyle.TitleFormControl htmlFor="email">Email</LoginStyle.TitleFormControl>
                                <LoginStyle.FormControl id="email" type="text" name="email" value={field.email}
                                                        autoComplete="off"
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                        onChange={handleChangeField}
                                />
                            </div>
                        </LoginStyle.FormGroup>
                        <LoginStyle.InvalidMsg>{valid.message.email}</LoginStyle.InvalidMsg>
                        <LoginStyle.FormGroup className={`form-group ${fieldFocus.password && 'focus'}`}>
                            <LoginStyle.IconWrap>
                                <LockOutlined className="i" style={{transition: '0.3s', fontSize: 20}}/>
                            </LoginStyle.IconWrap>
                            <div style={{height: 45, position: "relative"}}>
                                <LoginStyle.TitleFormControl htmlFor="password">Mật khẩu</LoginStyle.TitleFormControl>
                                <LoginStyle.FormControl id="password" type="password" name="password"
                                                        value={field.password}
                                                        onFocus={handleFocus}
                                                        onBlur={handleBlur}
                                                        onChange={handleChangeField}
                                />
                            </div>
                        </LoginStyle.FormGroup>
                        <LoginStyle.InvalidMsg>{valid.message.password}</LoginStyle.InvalidMsg>
                        <LoginStyle.BtnSubmit htmlType="submit">Đăng nhập</LoginStyle.BtnSubmit>
                        <div>
                            <p>
                                Chưa có tài khoản?

                                <Link to={'/register'}> Đăng ký</Link>
                            </p>
                            <Link to={'/forgot'}>Quên mật khẩu</Link>
                        </div>
                    </form>
                </LoginStyle.FormWrap>
            </LoginStyle.Container>
        </>
    );
}

export default LoginPage;