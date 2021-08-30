import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LockOutlined, MailOutlined} from "@ant-design/icons";

import * as AuthStyle from '../style';

import {TITLE} from "../../../contants";

import {loginAction} from "../../../redux/actions";

function LoginPage() {
    document.title = TITLE.LOGIN;

    const dispatch = useDispatch();
    const {responseAction} = useSelector(state => state.userReducer);

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
    useEffect(() => {
        if (responseAction.login.error) {
            setValid({
                ...valid,
                message: {
                    ...valid.message,
                    password: responseAction.login.error
                }
            });
        }
    }, [responseAction.login.error]);

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
            dispatch(loginAction({
                data: field,
            }))
        }
    }
    return (
        <form style={{width: 360}} onSubmit={handleSubmit}>
            <AuthStyle.FormTitle>Đăng Nhập</AuthStyle.FormTitle>
            <AuthStyle.FormGroup focus={fieldFocus.email} error={!!valid.message.email}>
                <AuthStyle.IconWrap focus={fieldFocus.email} error={!!valid.message.email}>
                    <MailOutlined/>
                </AuthStyle.IconWrap>
                <AuthStyle.FormControlWrap>
                    <AuthStyle.TitleFormControl htmlFor="email" focus={fieldFocus.email}>
                        Email
                    </AuthStyle.TitleFormControl>
                    <AuthStyle.FormControl id="email" type="text" name="email" value={field.email}
                                           autoComplete="off"
                                           onFocus={handleFocus}
                                           onBlur={handleBlur}
                                           onChange={handleChangeField}
                    />
                </AuthStyle.FormControlWrap>
                <AuthStyle.InvalidMsg children={valid.message.email}/>
            </AuthStyle.FormGroup>
            <AuthStyle.FormGroup focus={fieldFocus.password} error={!!valid.message.password}>
                <AuthStyle.IconWrap focus={fieldFocus.password} error={!!valid.message.password}>
                    <LockOutlined/>
                </AuthStyle.IconWrap>
                <AuthStyle.FormControlWrap>
                    <AuthStyle.TitleFormControl htmlFor="password"
                                                focus={fieldFocus.password}
                    >
                        Mật khẩu
                    </AuthStyle.TitleFormControl>
                    <AuthStyle.FormControl id="password" type="password" name="password"
                                           value={field.password}
                                           onFocus={handleFocus}
                                           onBlur={handleBlur}
                                           onChange={handleChangeField}
                    />
                </AuthStyle.FormControlWrap>
                <AuthStyle.InvalidMsg children={valid.message.password}/>
            </AuthStyle.FormGroup>
            <AuthStyle.BtnSubmit htmlType="submit" disabled={responseAction.login.load}>
                Đăng nhập
                <AuthStyle.SubmitLoading size="middle" show={responseAction.login.load}/>
            </AuthStyle.BtnSubmit>
            <div style={{
                fontSize: '15px',
            }}>
                <p>
                    Chưa có tài khoản?
                    <Link to={'/register'}> Đăng ký</Link>
                </p>
                <Link to={'/forgot'}>Quên mật khẩu</Link>
            </div>
        </form>
    );
}

export default LoginPage;
